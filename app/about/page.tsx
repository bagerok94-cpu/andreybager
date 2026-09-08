import type { Metadata } from 'next';
import { PageShell } from '@/components/layout';
import pageStyles from '@/components/layout/PageShell.module.css';
import { contentLayer } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const about = await contentLayer.getAbout();
  return {
    title: about.title,
    description: about.openLead,
  };
}

export default async function AboutPage() {
  const about = await contentLayer.getAbout();

  return (
    <PageShell kicker={about.role} title={about.name} lead={about.openLead}>
      <p className={pageStyles.itemText}>
        {about.closedDescLines[0]} {about.closedDescLines[1]}
      </p>
      <p className={pageStyles.itemText}>{about.closedSub}</p>

      <div className={pageStyles.list}>
        {about.pillars.map((pillar) => (
          <div key={pillar.number} className={pageStyles.item}>
            <span className={pageStyles.itemLabel}>{pillar.number}</span>
            <p className={pageStyles.itemText}>{pillar.text}</p>
          </div>
        ))}
      </div>

      <span className={pageStyles.badge}>{about.badge}</span>
    </PageShell>
  );
}
