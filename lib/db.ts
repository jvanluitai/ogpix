import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export interface ApiKey {
  key: string;
  email: string;
  plan: string;
  stripe_customer_id: string | null;
  created_at: string;
}

function generateApiKey(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return 'ogp_' + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

export async function createApiKey(email: string): Promise<ApiKey> {
  const key = generateApiKey();
  const record: ApiKey = {
    key,
    email,
    plan: 'free',
    stripe_customer_id: null,
    created_at: new Date().toISOString(),
  };
  await redis.set(`ogpix:key:${key}`, record);
  await redis.set(`ogpix:email:${email}`, key);
  return record;
}

export async function getApiKey(key: string): Promise<ApiKey | null> {
  return redis.get<ApiKey>(`ogpix:key:${key}`);
}

export async function getApiKeyByEmail(email: string): Promise<ApiKey | null> {
  const key = await redis.get<string>(`ogpix:email:${email}`);
  if (!key) return null;
  return getApiKey(key);
}

export async function updatePlan(key: string, plan: string, stripeCustomerId?: string): Promise<void> {
  const record = await getApiKey(key);
  if (!record) return;
  record.plan = plan;
  if (stripeCustomerId) {
    record.stripe_customer_id = stripeCustomerId;
    await redis.set(`ogpix:customer:${stripeCustomerId}`, key);
  }
  await redis.set(`ogpix:key:${key}`, record);
}

export async function updatePlanByStripeCustomer(stripeCustomerId: string, plan: string): Promise<void> {
  const key = await redis.get<string>(`ogpix:customer:${stripeCustomerId}`);
  if (!key) return;
  await updatePlan(key, plan);
}

export async function getUsageCount(apiKey: string, month: string): Promise<number> {
  const count = await redis.get<number>(`ogpix:usage:${apiKey}:${month}`);
  return count ?? 0;
}

export async function incrementUsage(apiKey: string, month: string): Promise<void> {
  await redis.incr(`ogpix:usage:${apiKey}:${month}`);
}

export function getCurrentMonth(): string {
  return new Date().toISOString().slice(0, 7); // 'YYYY-MM'
}
