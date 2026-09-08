export interface SiteSettings {
  title: string;
  description: string;
  author: string;
  defaultLocale: string;
  siteUrl: string;
}

export interface NavItem {
  label: string;
  shortLabel?: string;
  href: string;
  desktop: boolean;
  mobile: boolean;
}

export interface HeroContent {
  nameLines: [string, string];
  taglineLines: [string, string];
  taglineAccent: string;
  avatarMonogram: string;
  avatarStatus: string;
  avatarRole: string;
}

export interface AboutPillar {
  number: string;
  text: string;
}

export interface AboutContent {
  title: string;
  name: string;
  role: string;
  closedDescLines: [string, string];
  closedSub: string;
  badge: string;
  openLead: string;
  pillars: AboutPillar[];
  ctaLabel: string;
  ctaHref: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  status: string;
  slug?: string;
  category?: string;
  coverImage?: string;
  gallery?: string[];
  url?: string;
  technologies?: string[];
  year?: number;
  order?: number;
  published?: boolean;
  body?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PortfolioContent {
  title: string;
  previewDescLines: [string, string];
  previewBadge: string;
  openLead: string;
  status: string;
  footerBadge: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  order?: number;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServicesContent {
  title: string;
  previewDescLines: [string, string];
  previewBadge: string;
  items: Service[];
  footerBadge: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  order?: number;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ToolsContent {
  title: string;
  previewDescLines: [string, string];
  previewBadge: string;
  items: Tool[];
  footerBadge: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  ctaLabel: string;
  id?: string;
  order?: number;
}

export interface ContactContent {
  title: string;
  previewDescLines: [string, string];
  previewBadge: string;
  channels: ContactChannel[];
  openLead: string;
  footerBadge: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ProjectStep {
  step: string;
  title: string;
}

export interface ProjectContent {
  title: string;
  previewDescLines: [string, string];
  previewBadge: string;
  openLead: string;
  steps: ProjectStep[];
  footerBadge: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  audioUrl?: string;
  order?: number;
  published?: boolean;
  playable?: boolean;
  downloadable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MusicContent {
  title: string;
  previewDesc: string;
  status: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HomeContent {
  hero: HeroContent;
  about: AboutContent;
  portfolio: PortfolioContent;
  services: ServicesContent;
  tools: ToolsContent;
  contact: ContactContent;
  project: ProjectContent;
  music: MusicContent;
}
