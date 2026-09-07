import type { Metadata } from 'next';
import { PageShell } from '@/components/layout';
import pageStyles from '@/components/layout/PageShell.module.css';
import { contentLayer } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const services = await contentLayer.getServices();
  return {
    title: services.title,
    description: services.previewDescLines.join(' '),
  };
}

export default async function ServicesPage() {
  const services = await contentLayer.getServices();

  return (
    <PageShell
      kicker={services.previewBadge}
      title={services.title}
      lead={services.previewDescLines.join(' ')}
    >
      <div className={pageStyles.list}>
        {services.items.map((svc) => (
          <div key={svc.id} className={pageStyles.item}>
            <span className={pageStyles.itemLabel}>{svc.number}</span>
            <span className={pageStyles.itemTitle}>{svc.title}</span>
            <p className={pageStyles.itemText}>{svc.description}</p>
          </div>
        ))}
      </div>
      <span className={pageStyles.badge}>{services.footerBadge}</span>
    </PageShell>
  );
}
