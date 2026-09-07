import type { Metadata } from 'next';
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
    title: settings.title,
    description: settings.description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
