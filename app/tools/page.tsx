import type { Metadata } from 'next';
import { PageShell } from '@/components/layout';
import pageStyles from '@/components/layout/PageShell.module.css';
import { contentLayer } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const tools = await contentLayer.getTools();
  return {
    title: tools.title,
    description: tools.previewDescLines.join(' '),
  };
}

export default async function ToolsPage() {
  const tools = await contentLayer.getTools();

  return (
    <PageShell
      kicker={tools.previewBadge}
      title={tools.title}
      lead={tools.previewDescLines.join(' ')}
    >
      <div className={pageStyles.grid}>
        {tools.items.map((tool) => (
          <div key={tool.id} className={pageStyles.item}>
            <span className={pageStyles.itemTitle}>{tool.name}</span>
            <p className={pageStyles.itemText}>{tool.description}</p>
          </div>
        ))}
      </div>
      <span className={pageStyles.badge}>{tools.footerBadge}</span>
    </PageShell>
  );
}
