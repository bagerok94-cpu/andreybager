import 'server-only';

import type { CmsPublishResult } from '@/types';
import { isDatabaseConfigured } from '@/lib/db';
import { publishDraft } from './draft';
import { publishAll as publishAllFromRepository } from './repository';

/**
 * Global publish model B: Publish All.
 * Confirmed drafts are written to PostgreSQL in a single transaction.
 * Public UI never calls this — only the CMS / Telegram layer will.
 */
export async function publishAll(input: {
  confirmed: boolean;
}): Promise<CmsPublishResult> {
  if (isDatabaseConfigured()) {
    try {
      return await publishAllFromRepository(input);
    } catch (error) {
      return {
        success: false,
        publishedAt: null,
        version: 0,
        sections: [],
        requiresConfirmation: false,
        error: error instanceof Error ? error.message : 'Publish All failed.',
      };
    }
  }

  return publishDraft(input);
}
