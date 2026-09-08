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

/**
 * Public Content Layer.
 * UI reads published content only through this provider.
 * Draft / preview live in lib/content/draft.ts and must not be imported by public pages.
 * Static today; later this can fetch published rows from PostgreSQL without changing components.
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

export const contentLayer: ContentProvider = {
  async getSiteSettings() {
    return siteSettings;
  },
  async getNavigation() {
    return navigation;
  },
  async getHero() {
    return heroContent;
  },
  async getAbout() {
    return aboutContent;
  },
  async getPortfolio() {
    return portfolioContent;
  },
  async getPortfolioProjects() {
    return sortProjects(portfolioProjects.filter(isPublished));
  },
  async getProjectById(id: string) {
    return (
      sortProjects(portfolioProjects.filter(isPublished)).find((project) =>
        matchesProjectId(project, id),
      ) ?? null
    );
  },
  async getServices() {
    return servicesContent;
  },
  async getTools() {
    return toolsContent;
  },
  async getContact() {
    return contactContent;
  },
  async getProject() {
    return projectContent;
  },
  async getMusic() {
    return musicContent;
  },
  async getMusicTracks() {
    return [];
  },
  async getHome() {
    return {
      hero: heroContent,
      about: aboutContent,
      portfolio: portfolioContent,
      services: servicesContent,
      tools: toolsContent,
      contact: contactContent,
      project: projectContent,
      music: musicContent,
    };
  },
};
