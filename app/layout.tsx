import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { AppShell } from '@/components/layout';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ANDREY BAGER — WEB DESIGNER / AI / AUTOMATION',
  description: 'Digital solutions, web design, AI and automation.',
};

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
