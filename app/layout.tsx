import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import { AppShell } from '@/components/layout';
import { contentLayer } from '@/lib/content';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await contentLayer.getSiteSettings();

  return {
    metadataBase: new URL(settings.siteUrl),
    title: {
      default: settings.title,
      template: `%s — ${settings.author}`,
    },
    description: settings.description,
    applicationName: settings.author,
    authors: [{ name: settings.author, url: settings.siteUrl }],
    creator: settings.author,
    publisher: settings.author,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: settings.siteUrl,
      siteName: settings.author,
      title: settings.title,
      description: settings.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.title,
      description: settings.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#090a0d',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, about, contact] = await Promise.all([
    contentLayer.getSiteSettings(),
    contentLayer.getAbout(),
    contentLayer.getContact(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.author,
    jobTitle: about.role,
    url: settings.siteUrl,
    email: contact.channels.find((channel) => channel.label === 'EMAIL')?.value,
    sameAs: contact.channels
      .map((channel) => channel.href)
      .filter((href) => href.startsWith('http')),
  };

  return (
    <html lang="ru" className={montserrat.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
