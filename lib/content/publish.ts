import type { CmsPublishResult } from '@/types';
import { hasDraftChanges, publishDraft } from './draft';

/**
 * Global publish model B: Publish All.
 * Later this service writes published snapshots to PostgreSQL.
 * Public UI never calls this — only the CMS / Telegram layer will.
 */
export async function publishAll(input: {
  confirmed: boolean;
}): Promise<CmsPublishResult> {
  if (!input.confirmed) {
    return {
      success: false,
      publishedAt: null,
      version: 0,
      sections: [],
      requiresConfirmation: true,
      error: 'Publish All requires explicit confirmation.',
    };
  }

  if (!hasDraftChanges()) {
    return {
      success: false,
      publishedAt: null,
      version: 0,
      sections: [],
      requiresConfirmation: false,
      error: 'No draft changes to publish.',
    };
  }

  const result = publishDraft({ confirmed: true });

  return {
    success: result.success,
    publishedAt: result.publishedAt,
    version: result.version,
    sections: result.sections,
    requiresConfirmation: result.requiresConfirmation,
    error: result.error,
  };
}
