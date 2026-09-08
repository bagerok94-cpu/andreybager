import type { CmsSection, SiteContentSnapshot } from '@/types';
import { CMS_SECTIONS } from '@/types';
import { cloneSnapshot } from './snapshot';

export function isCmsSection(value: string): value is CmsSection {
  return (CMS_SECTIONS as readonly string[]).includes(value);
}

export function requireConfirmation(
  confirmed: boolean,
  action: 'publish' | 'discard',
): { ok: true } | { ok: false; error: string } {
  if (!confirmed) {
    return {
      ok: false,
      error: `${action === 'publish' ? 'Publish' : 'Discard'} requires explicit confirmation.`,
    };
  }
  return { ok: true };
}

export function hasDraftChanges(changedSections: readonly CmsSection[]): boolean {
  return changedSections.length > 0;
}

export function extractSectionPayload(
  snapshot: SiteContentSnapshot,
  section: CmsSection,
): unknown {
  switch (section) {
    case 'hero':
      return snapshot.hero;
    case 'about':
      return snapshot.about;
    case 'portfolio':
      return { section: snapshot.portfolio, projects: snapshot.projects };
    case 'services':
      return snapshot.services;
    case 'tools':
      return snapshot.tools;
    case 'contacts':
      return snapshot.contact;
    case 'music':
      return { section: snapshot.music, tracks: snapshot.tracks };
    case 'settings':
      return snapshot.settings;
    default:
      return null;
  }
}

export function applySectionPayload(
  snapshot: SiteContentSnapshot,
  section: CmsSection,
  payload: unknown,
): SiteContentSnapshot {
  const next = cloneSnapshot(snapshot);

  switch (section) {
    case 'hero':
      next.hero = payload as SiteContentSnapshot['hero'];
      break;
    case 'about':
      next.about = payload as SiteContentSnapshot['about'];
      break;
    case 'portfolio': {
      const value = payload as
        | {
            section?: SiteContentSnapshot['portfolio'];
            projects?: SiteContentSnapshot['projects'];
          }
        | SiteContentSnapshot['projects'];
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
      const value = payload as
        | {
            section?: SiteContentSnapshot['music'];
            tracks?: SiteContentSnapshot['tracks'];
          }
        | SiteContentSnapshot['tracks'];
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

  return next;
}

export function mergeSectionPayloads(
  base: SiteContentSnapshot,
  sections: Partial<Record<CmsSection, unknown>>,
): SiteContentSnapshot {
  let next = cloneSnapshot(base);

  for (const section of CMS_SECTIONS) {
    const payload = sections[section];
    if (payload !== undefined && payload !== null) {
      next = applySectionPayload(next, section, payload);
    }
  }

  return next;
}
