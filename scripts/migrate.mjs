import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.log('[migrate] DATABASE_URL is not set. Skipping.');
  process.exit(0);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const migrationPath = path.join(root, 'db/migrations/001_cms_content.sql');
const sql = await readFile(migrationPath, 'utf8');

const client = new pg.Client({
  connectionString: databaseUrl,
  connectionTimeoutMillis: 5000,
});

try {
  await client.connect();
  await client.query(sql);
  console.log('[migrate] Applied db/migrations/001_cms_content.sql');
} finally {
  await client.end();
}
