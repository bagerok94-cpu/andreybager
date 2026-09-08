import type { MetadataRoute } from 'next';
import { contentLayer } from '@/lib/content';

const STATIC_PATHS = [
  '',
  '/about',
  '/portfolio',
  '/contact',
  '/tools',
  '/services',
  '/project',
  '/music',
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, projects] = await Promise.all([
    contentLayer.getSiteSettings(),
    contentLayer.getPortfolioProjects(),
  ]);

  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${settings.siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const projectEntries = projects.map((project) => ({
    url: `${settings.siteUrl}/portfolio/${project.slug ?? project.id}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...projectEntries];
}
