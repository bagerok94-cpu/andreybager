import type { Metadata } from 'next';
import { PageShell } from '@/components/layout';
import pageStyles from '@/components/layout/PageShell.module.css';
import { PortfolioList } from '@/components/portfolio/PortfolioList';
import { contentLayer } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await contentLayer.getPortfolio();
  return {
    title: portfolio.title,
    description: portfolio.openLead,
  };
}

export default async function PortfolioPage() {
  const [portfolio, projects] = await Promise.all([
    contentLayer.getPortfolio(),
    contentLayer.getPortfolioProjects(),
  ]);

  return (
    <PageShell
      kicker={portfolio.previewBadge}
      title={portfolio.title}
      lead={portfolio.openLead}
    >
      <PortfolioList
        projects={projects}
        emptyStatus={portfolio.status}
        emptyText={portfolio.openLead}
      />
      <span className={pageStyles.badge}>{portfolio.footerBadge}</span>
    </PageShell>
  );
}
