import 'server-only';

import type { PoolClient } from 'pg';
import type {
  CmsDiscardResult,
  CmsDraftState,
  CmsPublishResult,
  CmsSection,
  ContentRevision,
  SiteContentSnapshot,
} from '@/types';
import { CMS_SECTIONS } from '@/types';
import {
  isDatabaseConfigured,
  query,
  withTransaction,
} from '@/lib/db';
import {
  extractSectionPayload,
  hasDraftChanges as hasChangedSections,
  isCmsSection,
  mergeSectionPayloads,
  requireConfirmation,
} from './logic';
import { createStaticPublishedSnapshot } from './snapshot';

interface ContentRevisionRow {
  id: string;
  section: string;
  status: 'draft' | 'published';
  version: number;
  payload: unknown;
  created_at: Date;
  updated_at: Date;
}

function toRevision(row: ContentRevisionRow | undefined, fallbackVersion = 1): ContentRevision {
  if (!row) {
    const now = new Date().toISOString();
    return {
      id: `rev-${fallbackVersion}`,
      status: 'published',
      version: fallbackVersion,
      createdAt: now,
      updatedAt: now,
    };
  }

  return {
    id: String(row.id),
    status: row.status,
    version: row.version,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

function rowsToSectionMap(
  rows: ContentRevisionRow[],
): Partial<Record<CmsSection, unknown>> {
  const map: Partial<Record<CmsSection, unknown>> = {};
  for (const row of rows) {
    if (isCmsSection(row.section)) {
      map[row.section] = row.payload;
    }
  }
  return map;
}

export async function getPublishedContent(): Promise<SiteContentSnapshot> {
  const base = createStaticPublishedSnapshot();
  if (!isDatabaseConfigured()) {
    return base;
  }

  const result = await query<ContentRevisionRow>(
    `SELECT id, section, status, version, payload, created_at, updated_at
     FROM content_revisions
     WHERE status = 'published'`,
  );

  return mergeSectionPayloads(base, rowsToSectionMap(result.rows));
}

export async function getDraftContent(): Promise<SiteContentSnapshot> {
  const published = await getPublishedContent();
  if (!isDatabaseConfigured()) {
    return published;
  }

  const result = await query<ContentRevisionRow>(
    `SELECT id, section, status, version, payload, created_at, updated_at
     FROM content_revisions
     WHERE status = 'draft'`,
  );

  if (result.rowCount === 0) {
    return published;
  }

  return mergeSectionPayloads(published, rowsToSectionMap(result.rows));
}

export async function getDraftSection(section: CmsSection): Promise<unknown | null> {
  if (!isDatabaseConfigured()) {
    return null;
  }

  const result = await query<ContentRevisionRow>(
    `SELECT id, section, status, version, payload, created_at, updated_at
     FROM content_revisions
     WHERE section = $1 AND status = 'draft'
     LIMIT 1`,
    [section],
  );

  return result.rows[0]?.payload ?? null;
}

export async function getPublishedSection(section: CmsSection): Promise<unknown | null> {
  if (!isDatabaseConfigured()) {
    return extractSectionPayload(createStaticPublishedSnapshot(), section);
  }

  const result = await query<ContentRevisionRow>(
    `SELECT id, section, status, version, payload, created_at, updated_at
     FROM content_revisions
     WHERE section = $1 AND status = 'published'
     LIMIT 1`,
    [section],
  );

  return result.rows[0]?.payload ?? null;
}

export async function hasDraftChanges(): Promise<boolean> {
  if (!isDatabaseConfigured()) {
    return false;
  }

  const result = await query<{ count: string }>(
    `SELECT COUNT(*)::text AS count FROM content_revisions WHERE status = 'draft'`,
  );

  return Number(result.rows[0]?.count ?? 0) > 0;
}

export async function getDraftState(): Promise<CmsDraftState> {
  if (!isDatabaseConfigured()) {
    return {
      revision: toRevision(undefined),
      changedSections: [],
      hasChanges: false,
    };
  }

  const result = await query<ContentRevisionRow>(
    `SELECT id, section, status, version, payload, created_at, updated_at
     FROM content_revisions
     ORDER BY updated_at DESC`,
  );

  const draftRows = result.rows.filter((row) => row.status === 'draft');
  const latest = result.rows[0];
  const changedSections = draftRows
    .map((row) => row.section)
    .filter(isCmsSection);

  return {
    revision: toRevision(latest ?? draftRows[0]),
    changedSections,
    hasChanges: hasChangedSections(changedSections),
  };
}

export async function saveDraftSection(
  section: CmsSection,
  payload: unknown,
): Promise<CmsDraftState> {
  await query(
    `INSERT INTO content_revisions (section, status, version, payload)
     VALUES ($1, 'draft', 1, $2::jsonb)
     ON CONFLICT (section, status)
     DO UPDATE SET
       payload = EXCLUDED.payload,
       version = content_revisions.version + 1,
       updated_at = NOW()`,
    [section, JSON.stringify(payload)],
  );

  return getDraftState();
}

export async function publishAll(input: {
  confirmed: boolean;
}): Promise<CmsPublishResult> {
  const confirmation = requireConfirmation(input.confirmed, 'publish');
  if (!confirmation.ok) {
    return {
      success: false,
      publishedAt: null,
      version: 0,
      sections: [],
      requiresConfirmation: true,
      error: confirmation.error,
    };
  }

  return withTransaction(async (client: PoolClient) => {
    const drafts = await client.query<ContentRevisionRow>(
      `SELECT id, section, status, version, payload, created_at, updated_at
       FROM content_revisions
       WHERE status = 'draft'
       FOR UPDATE`,
    );

    if (drafts.rowCount === 0) {
      return {
        success: false,
        publishedAt: null,
        version: 0,
        sections: [],
        requiresConfirmation: false,
        error: 'No draft changes to publish.',
      };
    }

    const sections: CmsSection[] = [];
    let version = 1;

    for (const row of drafts.rows) {
      if (!isCmsSection(row.section)) continue;
      sections.push(row.section);

      const published = await client.query<ContentRevisionRow>(
        `INSERT INTO content_revisions (section, status, version, payload)
         VALUES ($1, 'published', $2, $3::jsonb)
         ON CONFLICT (section, status)
         DO UPDATE SET
           payload = EXCLUDED.payload,
           version = content_revisions.version + 1,
           updated_at = NOW()
         RETURNING version`,
        [row.section, row.version, JSON.stringify(row.payload)],
      );

      version = Math.max(version, published.rows[0]?.version ?? row.version);
    }

    await client.query(`DELETE FROM content_revisions WHERE status = 'draft'`);

    return {
      success: true,
      publishedAt: new Date().toISOString(),
      version,
      sections,
      requiresConfirmation: false,
    };
  });
}

export async function discardDraft(input: {
  confirmed: boolean;
}): Promise<CmsDiscardResult> {
  const confirmation = requireConfirmation(input.confirmed, 'discard');
  if (!confirmation.ok) {
    return {
      success: false,
      requiresConfirmation: true,
      restoredToPublished: false,
      error: confirmation.error,
    };
  }

  await withTransaction(async (client: PoolClient) => {
    await client.query(`DELETE FROM content_revisions WHERE status = 'draft'`);
  });

  return {
    success: true,
    requiresConfirmation: false,
    restoredToPublished: true,
  };
}

export function listCmsSections(): readonly CmsSection[] {
  return CMS_SECTIONS;
}
