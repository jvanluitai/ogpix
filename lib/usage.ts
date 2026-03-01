import {
  getApiKey,
  getUsage,
  incrementUsage,
  getCurrentMonth,
  type ApiKey,
} from './db';

export const PLAN_LIMITS: Record<string, number> = {
  free: 50,
  starter: 1000,
  pro: 10000,
};

export interface UsageInfo {
  used: number;
  limit: number;
  plan: string;
}

export function getPlanLimit(plan: string): number {
  return PLAN_LIMITS[plan] ?? 50;
}

export function getUsageInfo(apiKey: ApiKey): UsageInfo {
  const month = getCurrentMonth();
  const usage = getUsage(apiKey.id, month);
  const limit = getPlanLimit(apiKey.plan);
  return {
    used: usage?.count ?? 0,
    limit,
    plan: apiKey.plan,
  };
}

export function checkAndIncrementUsage(bearerToken: string): {
  ok: boolean;
  error?: string;
  status?: number;
  apiKey?: ApiKey;
} {
  const apiKey = getApiKey(bearerToken);
  if (!apiKey) {
    return { ok: false, error: 'Invalid API key', status: 401 };
  }

  const month = getCurrentMonth();
  const usage = getUsage(apiKey.id, month);
  const limit = getPlanLimit(apiKey.plan);
  const used = usage?.count ?? 0;

  if (used >= limit) {
    return {
      ok: false,
      error: `Monthly limit reached (${used}/${limit}). Upgrade at https://ogpix.dev/pricing`,
      status: 429,
    };
  }

  incrementUsage(apiKey.id, month);
  return { ok: true, apiKey };
}

export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.slice(7).trim() || null;
}
