'use client';

import Link from 'next/link';
import type { ToolsContent } from '@/types';
import { InteractiveCard } from './InteractiveCard';
import styles from './CardsCommon.module.css';

interface ToolsCardProps {
  content: ToolsContent;
}

export function ToolsCard({ content }: ToolsCardProps) {
  const icon = (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );

  const preview = (
    <>
      <p className={styles.previewDesc}>
        {content.previewDescLines[0]}
        <br />
        {content.previewDescLines[1]}
      </p>
      <span className={styles.badge}>{content.previewBadge}</span>
    </>
  );

  return (
    <InteractiveCard
      id="tools"
      title={content.title}
      icon={icon}
      animationType="geometric-assemble"
      preview={preview}
    >
      <div className={styles.toolsGrid}>
        {content.items.map((tool) => (
          <div key={tool.id} className={styles.itemRow}>
            <span className={styles.itemTitle}>{tool.name}</span>
            <span className={styles.itemDesc}>{tool.description}</span>
          </div>
        ))}
      </div>

      <div className={styles.openFooter}>
        <span className={styles.badge}>{content.footerBadge}</span>
        <Link
          href={content.ctaHref}
          className={styles.ctaLink}
          onClick={(e) => e.stopPropagation()}
        >
          {content.ctaLabel}
        </Link>
      </div>
    </InteractiveCard>
  );
}
