import type {
  SiteSettings,
  About,
  PortfolioProject,
  Service,
  Tool,
  Contact,
  MusicTrack,
} from '@/types';

/**
 * Content Layer Abstraction.
 * Decouples content access from UI presentation.
 * In future phases, these functions will fetch from local static files, CMS, or DB.
 */

export interface ContentProvider {
  getSiteSettings(): Promise<SiteSettings | null>;
  getAbout(): Promise<About | null>;
  getPortfolioProjects(): Promise<PortfolioProject[]>;
  getProjectById(id: string): Promise<PortfolioProject | null>;
  getServices(): Promise<Service[]>;
  getTools(): Promise<Tool[]>;
  getContact(): Promise<Contact | null>;
  getMusicTracks(): Promise<MusicTrack[]>;
}

export const contentLayer: ContentProvider = {
  async getSiteSettings() {
    return null;
  },
  async getAbout() {
    return null;
  },
  async getPortfolioProjects() {
    return [];
  },
  async getProjectById(_id: string) {
    return null;
  },
  async getServices() {
    return [];
  },
  async getTools() {
    return [];
  },
  async getContact() {
    return null;
  },
  async getMusicTracks() {
    return [];
  },
};
