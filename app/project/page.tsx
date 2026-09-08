import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/layout';
import pageStyles from '@/components/layout/PageShell.module.css';
import { contentLayer } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const project = await contentLayer.getProject();
  return {
    title: project.title,
    description: project.openLead,
  };
}

export default async function ProjectPage() {
  const project = await contentLayer.getProject();

  return (
    <PageShell
      kicker={project.previewBadge}
      title={project.title}
      lead={project.openLead}
    >
      <div className={pageStyles.list}>
        {project.steps.map((step) => (
          <div key={step.step} className={pageStyles.item}>
            <span className={pageStyles.itemLabel}>{step.step}</span>
            <span className={pageStyles.itemTitle}>{step.title}</span>
          </div>
        ))}
      </div>
      <Link href={project.ctaHref} className={pageStyles.cta}>
        <span>{project.ctaLabel.replace(/\s*↗\s*$/, '')}</span>
        <span aria-hidden="true">↗</span>
      </Link>
    </PageShell>
  );
}
