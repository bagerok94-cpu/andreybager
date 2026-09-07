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

/**
 * Content Layer Abstraction.
 * UI reads content only through this provider.
 * Static today; later this can fetch from API / PostgreSQL without changing components.
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
    return [];
  },
  async getProjectById(_id: string) {
    return null;
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
