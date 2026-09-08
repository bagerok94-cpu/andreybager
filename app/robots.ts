import type { MetadataRoute } from 'next';
import { contentLayer } from '@/lib/content';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await contentLayer.getSiteSettings();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${settings.siteUrl}/sitemap.xml`,
    host: settings.siteUrl,
  };
}
