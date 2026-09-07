import type { Metadata } from 'next';
import { PageShell } from '@/components/layout';
import pageStyles from '@/components/layout/PageShell.module.css';
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
      {projects.length > 0 ? (
        <div className={pageStyles.list}>
          {projects.map((item) => (
            <div key={item.id} className={pageStyles.item}>
              <span className={pageStyles.itemTitle}>{item.title}</span>
              <span className={pageStyles.itemLabel}>{item.status}</span>
              <p className={pageStyles.itemText}>{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={pageStyles.empty}>
          <span className={pageStyles.emptyStatus}>{portfolio.status}</span>
          <p className={pageStyles.emptyText}>{portfolio.openLead}</p>
        </div>
      )}
      <span className={pageStyles.badge}>{portfolio.footerBadge}</span>
    </PageShell>
  );
}
