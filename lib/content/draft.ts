import type {
  CmsDiscardResult,
  CmsDraftState,
  CmsSection,
  ContentRevision,
  SiteContentSnapshot,
} from '@/types';
import { CMS_SECTIONS } from '@/types';
import {
  aboutContent,
  contactContent,
  heroContent,
  musicContent,
  navigation,
  portfolioContent,
  projectContent,
  servicesContent,
  siteSettings,
  toolsContent,
} from './data';
import { portfolioProjects } from './projects';

function cloneSnapshot(snapshot: SiteContentSnapshot): SiteContentSnapshot {
  return structuredClone(snapshot);
}

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

function createPublishedSnapshot(): SiteContentSnapshot {
  return {
    settings: siteSettings,
    hero: heroContent,
    about: aboutContent,
    portfolio: portfolioContent,
    projects: [...portfolioProjects],
    services: servicesContent,
    tools: toolsContent,
    contact: contactContent,
    music: musicContent,
    tracks: [],
    project: projectContent,
    navigation,
  };
}

interface DraftStore {
  published: SiteContentSnapshot;
  draft: SiteContentSnapshot | null;
  revision: ContentRevision;
  changedSections: Set<CmsSection>;
}

const store: DraftStore = {
  published: createPublishedSnapshot(),
  draft: null,
  revision: createRevision('published', 1),
  changedSections: new Set(),
};

function getDraftStateFromStore(): CmsDraftState {
  return {
    revision: { ...store.revision },
    changedSections: [...store.changedSections],
    hasChanges: store.changedSections.size > 0,
  };
}

export function getPublishedContent(): SiteContentSnapshot {
  return cloneSnapshot(store.published);
}

export function getDraftContent(): SiteContentSnapshot {
  return cloneSnapshot(store.draft ?? store.published);
}

export function hasDraftChanges(): boolean {
  return store.changedSections.size > 0;
}

export function getDraftState(): CmsDraftState {
  return getDraftStateFromStore();
}

export function getContentEnvelope<T>(
  published: T,
  draft: T | null,
): { published: T; draft: T | null; revision: ContentRevision } {
  return {
    published: structuredClone(published),
    draft: draft === null ? null : structuredClone(draft),
    revision: { ...store.revision },
  };
}

export function createDraftRevision(): ContentRevision {
  if (!store.draft) {
    store.draft = cloneSnapshot(store.published);
  }

  store.revision = {
    ...store.revision,
    id: `rev-${store.revision.version}-${Date.now()}`,
    status: 'draft',
    updatedAt: new Date().toISOString(),
  };

  return { ...store.revision };
}

export function saveDraftSection(
  section: CmsSection,
  payload: unknown,
): CmsDraftState {
  createDraftRevision();
  const next = cloneSnapshot(store.draft ?? store.published);

  switch (section) {
    case 'hero':
      next.hero = payload as SiteContentSnapshot['hero'];
      break;
    case 'about':
      next.about = payload as SiteContentSnapshot['about'];
      break;
    case 'portfolio': {
      const value = payload as {
        section?: SiteContentSnapshot['portfolio'];
        projects?: SiteContentSnapshot['projects'];
      } | SiteContentSnapshot['projects'];
      if (Array.isArray(value)) {
        next.projects = value;
      } else {
        if (value.section) next.portfolio = value.section;
        if (value.projects) next.projects = value.projects;
      }
      break;
    }
    case 'services':
      next.services = payload as SiteContentSnapshot['services'];
      break;
    case 'tools':
      next.tools = payload as SiteContentSnapshot['tools'];
      break;
    case 'contacts':
      next.contact = payload as SiteContentSnapshot['contact'];
      break;
    case 'music': {
      const value = payload as {
        section?: SiteContentSnapshot['music'];
        tracks?: SiteContentSnapshot['tracks'];
      } | SiteContentSnapshot['tracks'];
      if (Array.isArray(value)) {
        next.tracks = value;
      } else {
        if (value.section) next.music = value.section;
        if (value.tracks) next.tracks = value.tracks;
      }
      break;
    }
    case 'settings':
      next.settings = payload as SiteContentSnapshot['settings'];
      break;
    default:
      break;
  }

  store.draft = next;
  store.changedSections.add(section);
  store.revision.updatedAt = new Date().toISOString();
  store.revision.status = 'draft';

  return getDraftStateFromStore();
}

export function publishDraft(input: { confirmed: boolean }): {
  success: boolean;
  requiresConfirmation: boolean;
  version: number;
  sections: CmsSection[];
  publishedAt: string | null;
  error?: string;
} {
  if (!input.confirmed) {
    return {
      success: false,
      requiresConfirmation: true,
      version: store.revision.version,
      sections: [...store.changedSections],
      publishedAt: null,
      error: 'Publish requires explicit confirmation.',
    };
  }

  const sections =
    store.changedSections.size > 0
      ? [...store.changedSections]
      : [...CMS_SECTIONS];
  const publishedAt = new Date().toISOString();

  store.published = cloneSnapshot(store.draft ?? store.published);
  store.draft = null;
  store.changedSections.clear();
  store.revision = createRevision(
    'published',
    store.revision.version + 1,
    store.revision.createdAt,
  );

  return {
    success: true,
    requiresConfirmation: false,
    version: store.revision.version,
    sections,
    publishedAt,
  };
}

export function discardDraft(input: { confirmed: boolean }): CmsDiscardResult {
  if (!input.confirmed) {
    return {
      success: false,
      requiresConfirmation: true,
      restoredToPublished: false,
      error: 'Discard requires explicit confirmation.',
    };
  }

  store.draft = null;
  store.changedSections.clear();
  store.revision = {
    ...store.revision,
    status: 'published',
    updatedAt: new Date().toISOString(),
  };

  return {
    success: true,
    requiresConfirmation: false,
    restoredToPublished: true,
  };
}

export function listCmsSections(): readonly CmsSection[] {
  return CMS_SECTIONS;
}
