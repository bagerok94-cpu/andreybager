import type {
  CmsConfirmation,
  CmsDiscardResult,
  CmsDraftState,
  CmsPublishResult,
  CmsSection,
  SiteContentSnapshot,
} from '@/types';
import type { ApiResponse } from './index';

/**
 * CMS API boundary for the future Telegram bot.
 * No HTTP/Telegram endpoints are wired yet.
 */
export interface CmsApi {
  getPublished(): Promise<ApiResponse<SiteContentSnapshot>>;
  getDraft(): Promise<ApiResponse<SiteContentSnapshot>>;
  getDraftState(): Promise<ApiResponse<CmsDraftState>>;
  saveDraft(
    section: CmsSection,
    payload: unknown,
  ): Promise<ApiResponse<CmsDraftState>>;
  getPreviewUrl(): Promise<ApiResponse<{ path: string }>>;
  publishAll(confirmation: CmsConfirmation): Promise<ApiResponse<CmsPublishResult>>;
  discardDraft(confirmation: CmsConfirmation): Promise<ApiResponse<CmsDiscardResult>>;
}

export const CMS_API_PATHS = {
  published: '/api/cms/published',
  draft: '/api/cms/draft',
  save: '/api/cms/draft',
  preview: '/preview',
  publish: '/api/cms/publish',
  discard: '/api/cms/discard',
} as const;

export function cmsNotImplementedError(operation: string): ApiResponse<never> {
  return {
    success: false,
    error: `[CMS] ${operation} is not connected yet. Telegram and PostgreSQL will be added in a later stage.`,
    timestamp: new Date().toISOString(),
  };
}
