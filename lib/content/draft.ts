import 'server-only';

import type {
  CmsDiscardResult,
  CmsDraftState,
  CmsPublishResult,
  CmsSection,
  SiteContentSnapshot,
} from '@/types';
import { isDatabaseConfigured } from '@/lib/db';
import { memoryCmsStore } from './memory-store';
import * as postgres from './repository';
import { createStaticPublishedSnapshot } from './snapshot';

async function withDatabaseFallback<T>(
  dbOp: () => Promise<T>,
  fallback: () => T | Promise<T>,
): Promise<T> {
  if (!isDatabaseConfigured()) {
    return fallback();
  }

  try {
    return await dbOp();
  } catch {
    return fallback();
  }
}

export async function getPublishedContent(): Promise<SiteContentSnapshot> {
  return withDatabaseFallback(
    () => postgres.getPublishedContent(),
    () => memoryCmsStore.getPublishedContent(),
  );
}

export async function getDraftContent(): Promise<SiteContentSnapshot> {
  return withDatabaseFallback(
    () => postgres.getDraftContent(),
    () => memoryCmsStore.getDraftContent(),
  );
}

export async function getDraftSection(section: CmsSection): Promise<unknown | null> {
  return withDatabaseFallback(
    () => postgres.getDraftSection(section),
    () => memoryCmsStore.getDraftSection(section),
  );
}

export async function hasDraftChanges(): Promise<boolean> {
  return withDatabaseFallback(
    () => postgres.hasDraftChanges(),
    () => memoryCmsStore.hasDraftChanges(),
  );
}

export async function getDraftState(): Promise<CmsDraftState> {
  return withDatabaseFallback(
    () => postgres.getDraftState(),
    () => memoryCmsStore.getDraftState(),
  );
}

export async function saveDraftSection(
  section: CmsSection,
  payload: unknown,
): Promise<CmsDraftState> {
  if (!isDatabaseConfigured()) {
    return memoryCmsStore.saveDraftSection(section, payload);
  }
  return postgres.saveDraftSection(section, payload);
}

export async function createDraftRevision(): Promise<CmsDraftState> {
  return getDraftState();
}

export async function publishDraft(input: {
  confirmed: boolean;
}): Promise<CmsPublishResult> {
  if (!isDatabaseConfigured()) {
    return memoryCmsStore.publishAll(input);
  }
  return postgres.publishAll(input);
}

export async function discardDraft(input: {
  confirmed: boolean;
}): Promise<CmsDiscardResult> {
  if (!isDatabaseConfigured()) {
    return memoryCmsStore.discardDraft(input);
  }
  return postgres.discardDraft(input);
}

export function getStaticPublishedFallback(): SiteContentSnapshot {
  return createStaticPublishedSnapshot();
}

export { listCmsSections } from './repository';
