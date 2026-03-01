import Database from 'better-sqlite3';
import path from 'path';
import { randomBytes } from 'crypto';

const DB_PATH = process.env.NODE_ENV === 'production'
  ? '/tmp/ogpix.db'
  : path.join(process.cwd(), 'ogpix.db');

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initSchema();
  }
  return db;
}

function initSchema(): void {
  getDb().exec(`
    CREATE TABLE IF NOT EXISTS api_keys (
      id INTEGER PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      email TEXT NOT NULL,
      plan TEXT DEFAULT 'free',
      stripe_customer_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS usage (
      id INTEGER PRIMARY KEY,
      api_key_id INTEGER REFERENCES api_keys(id),
      month TEXT NOT NULL,
      count INTEGER DEFAULT 0,
      UNIQUE(api_key_id, month)
    );
  `);
}

export interface ApiKey {
  id: number;
  key: string;
  email: string;
  plan: string;
  stripe_customer_id: string | null;
  created_at: string;
}

export interface UsageRecord {
  id: number;
  api_key_id: number;
  month: string;
  count: number;
}

export function createApiKey(email: string): ApiKey {
  const key = 'ogp_' + randomBytes(32).toString('hex');
  const stmt = getDb().prepare(
    'INSERT INTO api_keys (key, email) VALUES (?, ?) RETURNING *'
  );
  return stmt.get(key, email) as ApiKey;
}

export function getApiKey(key: string): ApiKey | undefined {
  const stmt = getDb().prepare('SELECT * FROM api_keys WHERE key = ?');
  return stmt.get(key) as ApiKey | undefined;
}

export function getApiKeyByEmail(email: string): ApiKey | undefined {
  const stmt = getDb().prepare('SELECT * FROM api_keys WHERE email = ?');
  return stmt.get(email) as ApiKey | undefined;
}

export function updatePlan(keyId: number, plan: string, stripeCustomerId?: string): void {
  if (stripeCustomerId) {
    getDb().prepare('UPDATE api_keys SET plan = ?, stripe_customer_id = ? WHERE id = ?')
      .run(plan, stripeCustomerId, keyId);
  } else {
    getDb().prepare('UPDATE api_keys SET plan = ? WHERE id = ?')
      .run(plan, keyId);
  }
}

export function updatePlanByStripeCustomer(stripeCustomerId: string, plan: string): void {
  getDb().prepare('UPDATE api_keys SET plan = ? WHERE stripe_customer_id = ?')
    .run(plan, stripeCustomerId);
}

export function getUsage(apiKeyId: number, month: string): UsageRecord | undefined {
  const stmt = getDb().prepare(
    'SELECT * FROM usage WHERE api_key_id = ? AND month = ?'
  );
  return stmt.get(apiKeyId, month) as UsageRecord | undefined;
}

export function incrementUsage(apiKeyId: number, month: string): void {
  getDb().prepare(`
    INSERT INTO usage (api_key_id, month, count)
    VALUES (?, ?, 1)
    ON CONFLICT(api_key_id, month) DO UPDATE SET count = count + 1
  `).run(apiKeyId, month);
}

export function getCurrentMonth(): string {
  return new Date().toISOString().slice(0, 7); // 'YYYY-MM'
}
