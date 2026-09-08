import 'server-only';

import { Pool, type PoolClient, type QueryResultRow } from 'pg';
import { serverEnv } from '@/lib/env';

export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
}

let pool: Pool | null = null;

export function isDatabaseConfigured(): boolean {
  return Boolean(serverEnv.DATABASE_URL);
}

export function getPool(): Pool {
  if (!serverEnv.DATABASE_URL) {
    throw new Error('[DB] DATABASE_URL is not set');
  }

  if (!pool) {
    pool = new Pool({
      connectionString: serverEnv.DATABASE_URL,
      max: 5,
      connectionTimeoutMillis: 2000,
      idleTimeoutMillis: 10000,
    });
  }

  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: unknown[] = [],
): Promise<QueryResult<T>> {
  const result = await getPool().query<T>(sql, params);
  return {
    rows: result.rows,
    rowCount: result.rowCount ?? 0,
  };
}

export async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await getPool().connect();

  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function healthCheck(): Promise<boolean> {
  if (!isDatabaseConfigured()) {
    return false;
  }

  try {
    await query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}
