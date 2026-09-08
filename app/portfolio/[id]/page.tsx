import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout';
import { PortfolioProjectView } from '@/components/portfolio/PortfolioProjectView';
import { contentLayer } from '@/lib/content';

interface PortfolioProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await contentLayer.getPortfolioProjects();

  return projects.map((project) => ({
    id: project.slug ?? project.id,
  }));
}

export async function generateMetadata({
  params,
}: PortfolioProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await contentLayer.getProjectById(id);

  if (!project) {
    return {
      title: 'Страница не найдена',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function PortfolioProjectPage({
  params,
}: PortfolioProjectPageProps) {
  const { id } = await params;
  const project = await contentLayer.getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <PageShell
      kicker={project.category ?? project.status}
      title={project.title}
      lead={project.description}
    >
      <PortfolioProjectView project={project} />
    </PageShell>
  );
}
