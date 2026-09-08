import type { SiteContentSnapshot } from '@/types';
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

export function cloneSnapshot(snapshot: SiteContentSnapshot): SiteContentSnapshot {
  return structuredClone(snapshot);
}

export function createStaticPublishedSnapshot(): SiteContentSnapshot {
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
