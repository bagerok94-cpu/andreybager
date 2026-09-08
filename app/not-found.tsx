import type { Metadata } from 'next';
import { PageShell } from '@/components/layout';

export const metadata: Metadata = {
  title: {
    absolute: 'Страница не найдена',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <PageShell title="Страница не найдена" lead="Такой страницы нет." />
  );
}
