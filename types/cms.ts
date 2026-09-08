import type {
  AboutContent,
  ContactContent,
  HeroContent,
  MusicContent,
  MusicTrack,
  NavItem,
  PortfolioContent,
  PortfolioProject,
  ProjectContent,
  ServicesContent,
  SiteSettings,
  ToolsContent,
} from './content';

export type ContentStatus = 'draft' | 'published';

export const CMS_SECTIONS = [
  'hero',
  'about',
  'portfolio',
  'services',
  'tools',
  'contacts',
  'music',
  'settings',
] as const;

export type CmsSection = (typeof CMS_SECTIONS)[number];

export type CmsDangerousAction = 'delete' | 'publish' | 'discard' | 'mass-change';

export interface ContentRevision {
  id: string;
  status: ContentStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContentEnvelope<T> {
  draft: T | null;
  published: T;
  revision: ContentRevision;
}

export interface CmsMediaAsset {
  id: string;
  source: 'telegram' | 'url';
  url: string;
  mimeType?: string;
  alt?: string;
}

export interface SiteContentSnapshot {
  settings: SiteSettings;
  hero: HeroContent;
  about: AboutContent;
  portfolio: PortfolioContent;
  projects: PortfolioProject[];
  services: ServicesContent;
  tools: ToolsContent;
  contact: ContactContent;
  music: MusicContent;
  tracks: MusicTrack[];
  project: ProjectContent;
  navigation: readonly NavItem[];
}

export interface CmsDraftState {
  revision: ContentRevision;
  changedSections: CmsSection[];
  hasChanges: boolean;
}

export interface CmsPublishResult {
  success: boolean;
  publishedAt: string | null;
  version: number;
  sections: CmsSection[];
  requiresConfirmation: boolean;
  error?: string;
}

export interface CmsDiscardResult {
  success: boolean;
  requiresConfirmation: boolean;
  restoredToPublished: boolean;
  error?: string;
}

export interface CmsConfirmation {
  action: CmsDangerousAction;
  confirmed: boolean;
}
