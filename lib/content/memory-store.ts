import type {
  CmsDiscardResult,
  CmsDraftState,
  CmsPublishResult,
  CmsSection,
  ContentRevision,
  SiteContentSnapshot,
} from '@/types';
import { CMS_SECTIONS } from '@/types';
import { applySectionPayload, extractSectionPayload, hasDraftChanges, requireConfirmation } from './logic';
import { cloneSnapshot, createStaticPublishedSnapshot } from './snapshot';

function createRevision(
  status: ContentRevision['status'],
  version: number,
  createdAt = new Date().toISOString(),
): ContentRevision {
  const now = new Date().toISOString();
  return {
    id: `rev-${version}-${now}`,
    status,
    version,
    createdAt,
    updatedAt: now,
  };
}

export class MemoryCmsStore {
  private published = createStaticPublishedSnapshot();
  private draft: SiteContentSnapshot | null = null;
  private revision = createRevision('published', 1);
  private changedSections = new Set<CmsSection>();

  getPublishedContent(): SiteContentSnapshot {
    return cloneSnapshot(this.published);
  }

  getDraftContent(): SiteContentSnapshot {
    return cloneSnapshot(this.draft ?? this.published);
  }

  getDraftSection(section: CmsSection): unknown | null {
    if (!this.changedSections.has(section) || !this.draft) {
      return null;
    }

    return extractSectionPayload(this.draft, section);
  }

  getDraftState(): CmsDraftState {
    return {
      revision: { ...this.revision },
      changedSections: [...this.changedSections],
      hasChanges: hasDraftChanges([...this.changedSections]),
    };
  }

  hasDraftChanges(): boolean {
    return hasDraftChanges([...this.changedSections]);
  }

  saveDraftSection(section: CmsSection, payload: unknown): CmsDraftState {
    const base = cloneSnapshot(this.draft ?? this.published);
    this.draft = applySectionPayload(base, section, payload);
    this.changedSections.add(section);
    this.revision = {
      ...this.revision,
      status: 'draft',
      id: `rev-${this.revision.version}-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    return this.getDraftState();
  }

  publishAll(input: { confirmed: boolean }): CmsPublishResult {
    const confirmation = requireConfirmation(input.confirmed, 'publish');
    if (!confirmation.ok) {
      return {
        success: false,
        publishedAt: null,
        version: this.revision.version,
        sections: [...this.changedSections],
        requiresConfirmation: true,
        error: confirmation.error,
      };
    }

    if (!this.hasDraftChanges()) {
      return {
        success: false,
        publishedAt: null,
        version: this.revision.version,
        sections: [],
        requiresConfirmation: false,
        error: 'No draft changes to publish.',
      };
    }

    const sections = [...this.changedSections];
    const publishedAt = new Date().toISOString();
    this.published = cloneSnapshot(this.draft ?? this.published);
    this.draft = null;
    this.changedSections.clear();
    this.revision = createRevision(
      'published',
      this.revision.version + 1,
      this.revision.createdAt,
    );

    return {
      success: true,
      publishedAt,
      version: this.revision.version,
      sections,
      requiresConfirmation: false,
    };
  }

  discardDraft(input: { confirmed: boolean }): CmsDiscardResult {
    const confirmation = requireConfirmation(input.confirmed, 'discard');
    if (!confirmation.ok) {
      return {
        success: false,
        requiresConfirmation: true,
        restoredToPublished: false,
        error: confirmation.error,
      };
    }

    this.draft = null;
    this.changedSections.clear();
    this.revision = {
      ...this.revision,
      status: 'published',
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      requiresConfirmation: false,
      restoredToPublished: true,
    };
  }

  listSections(): readonly CmsSection[] {
    return CMS_SECTIONS;
  }
}

export const memoryCmsStore = new MemoryCmsStore();
