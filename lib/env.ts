/**
 * Server-side environment variable access and validation.
 * Ensures critical environment variables are accessed strictly on the server.
 */

import 'server-only';

interface ServerEnv {
  DATABASE_URL?: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_OWNER_ID?: string;
  CMS_PREVIEW_SECRET?: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

function getEnvVar(key: string, defaultValue?: string): string | undefined {
  return process.env[key] ?? defaultValue;
}

export const serverEnv: ServerEnv = {
  DATABASE_URL: getEnvVar('DATABASE_URL'),
  TELEGRAM_BOT_TOKEN: getEnvVar('TELEGRAM_BOT_TOKEN'),
  TELEGRAM_OWNER_ID: getEnvVar('TELEGRAM_OWNER_ID'),
  CMS_PREVIEW_SECRET: getEnvVar('CMS_PREVIEW_SECRET'),
  NODE_ENV: (process.env.NODE_ENV as ServerEnv['NODE_ENV']) || 'development',
};

export function requireServerEnv(key: keyof Omit<ServerEnv, 'NODE_ENV'>): string {
  const value = serverEnv[key];
  if (!value) {
    throw new Error(`[Env] Missing required server environment variable: ${key}`);
  }
  return value;
}
