import type { Metadata } from 'next';
import { PageShell } from '@/components/layout';
import pageStyles from '@/components/layout/PageShell.module.css';
import { getDraftState } from '@/lib/content/draft';

export const metadata: Metadata = {
  title: {
    absolute: 'Preview',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PreviewPage() {
  const state = await getDraftState();

  return (
    <PageShell
      kicker="CMS"
      title="PREVIEW"
      lead="Черновик сайта. Не является опубликованной версией."
    >
      <div className={pageStyles.empty}>
        <span className={pageStyles.emptyStatus}>
          {state.hasChanges ? 'DRAFT' : 'Нет изменений'}
        </span>
        {state.hasChanges ? (
          <p className={pageStyles.emptyText}>
            {state.changedSections.join(', ')}
          </p>
        ) : (
          <p className={pageStyles.emptyText}>
            Публичный сайт по-прежнему показывает только published-контент.
          </p>
        )}
      </div>
    </PageShell>
  );
}
