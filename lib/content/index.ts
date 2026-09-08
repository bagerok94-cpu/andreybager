import 'server-only';

import type {
  AboutContent,
  ContactContent,
  HeroContent,
  HomeContent,
  MusicContent,
  MusicTrack,
  NavItem,
  PortfolioContent,
  PortfolioProject,
  ProjectContent,
  ServicesContent,
  SiteSettings,
  ToolsContent,
} from '@/types';
import { isDatabaseConfigured } from '@/lib/db';
import { getPublishedContent as getCmsPublishedContent } from './draft';
import { createStaticPublishedSnapshot } from './snapshot';

/**
 * Public Content Layer.
 * UI reads published content only through this provider.
 * Draft / preview live in lib/content/draft.ts and must not be imported by public pages.
 * PostgreSQL published rows are used when DATABASE_URL is set; otherwise static fallback.
 */

export interface ContentProvider {
  getSiteSettings(): Promise<SiteSettings>;
  getNavigation(): Promise<readonly NavItem[]>;
  getHero(): Promise<HeroContent>;
  getAbout(): Promise<AboutContent>;
  getPortfolio(): Promise<PortfolioContent>;
  getPortfolioProjects(): Promise<PortfolioProject[]>;
  getProjectById(id: string): Promise<PortfolioProject | null>;
  getServices(): Promise<ServicesContent>;
  getTools(): Promise<ToolsContent>;
  getContact(): Promise<ContactContent>;
  getProject(): Promise<ProjectContent>;
  getMusic(): Promise<MusicContent>;
  getMusicTracks(): Promise<MusicTrack[]>;
  getHome(): Promise<HomeContent>;
}

function isPublished(project: PortfolioProject): boolean {
  return project.published !== false;
}

function matchesProjectId(project: PortfolioProject, id: string): boolean {
  return project.id === id || project.slug === id;
}

function sortProjects(projects: PortfolioProject[]): PortfolioProject[] {
  return [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

async function getPublishedSnapshot() {
  if (!isDatabaseConfigured()) {
    return createStaticPublishedSnapshot();
  }

  try {
    return await getCmsPublishedContent();
  } catch {
    return createStaticPublishedSnapshot();
  }
}

export const contentLayer: ContentProvider = {
  async getSiteSettings() {
    return (await getPublishedSnapshot()).settings;
  },
  async getNavigation() {
    return (await getPublishedSnapshot()).navigation;
  },
  async getHero() {
    return (await getPublishedSnapshot()).hero;
  },
  async getAbout() {
    return (await getPublishedSnapshot()).about;
  },
  async getPortfolio() {
    return (await getPublishedSnapshot()).portfolio;
  },
  async getPortfolioProjects() {
    return sortProjects(
      (await getPublishedSnapshot()).projects.filter(isPublished),
    );
  },
  async getProjectById(id: string) {
    const projects = sortProjects(
      (await getPublishedSnapshot()).projects.filter(isPublished),
    );
    return projects.find((project) => matchesProjectId(project, id)) ?? null;
  },
  async getServices() {
    return (await getPublishedSnapshot()).services;
  },
  async getTools() {
    return (await getPublishedSnapshot()).tools;
  },
  async getContact() {
    return (await getPublishedSnapshot()).contact;
  },
  async getProject() {
    return (await getPublishedSnapshot()).project;
  },
  async getMusic() {
    return (await getPublishedSnapshot()).music;
  },
  async getMusicTracks() {
    return (await getPublishedSnapshot()).tracks.filter(
      (track) => track.published !== false,
    );
  },
  async getHome(): Promise<HomeContent> {
    const snapshot = await getPublishedSnapshot();
    return {
      hero: snapshot.hero,
      about: snapshot.about,
      portfolio: snapshot.portfolio,
      services: snapshot.services,
      tools: snapshot.tools,
      contact: snapshot.contact,
      project: snapshot.project,
      music: snapshot.music,
    };
  },
};
