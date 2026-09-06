/**
 * PostgreSQL Data Layer Abstraction.
 *
 * Architecture principle:
 * UI -> Content/Data Layer -> API/Service -> PostgreSQL
 * React components must NEVER interact directly with the database.
 */

export interface DatabaseConfig {
  connectionString?: string;
  maxConnections?: number;
  ssl?: boolean;
}

export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
}

export interface DatabaseClient {
  query<T = unknown>(sql: string, params?: unknown[]): Promise<QueryResult<T>>;
  healthCheck(): Promise<boolean>;
}

/**
 * Placeholder client for future PostgreSQL integration.
 * Will be backed by pg pool / ORM driver when real DB is connected.
 */
class PostgresDataLayer implements DatabaseClient {
  private isConfigured(): boolean {
    return Boolean(process.env.DATABASE_URL);
  }

  async query<T = unknown>(_sql: string, _params?: unknown[]): Promise<QueryResult<T>> {
    if (!this.isConfigured()) {
      throw new Error('[DB] Database is not configured yet. Set DATABASE_URL in .env');
    }
    // Future database driver query invocation
    return { rows: [], rowCount: 0 };
  }

  async healthCheck(): Promise<boolean> {
    return this.isConfigured();
  }
}

export const db: DatabaseClient = new PostgresDataLayer();
