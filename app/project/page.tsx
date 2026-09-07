import type { Metadata } from 'next';
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
      <div className={pageStyles.empty}>
        <p className={pageStyles.emptyText}>
          {project.previewDescLines.join(' ')}
        </p>
      </div>
    </PageShell>
  );
}
