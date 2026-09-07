'use client';

import Link from 'next/link';
import type { PortfolioContent, PortfolioProject } from '@/types';
import { InteractiveCard } from './InteractiveCard';
import styles from './CardsCommon.module.css';

interface PortfolioCardProps {
  content: PortfolioContent;
  projects: PortfolioProject[];
}

export function PortfolioCard({ content, projects }: PortfolioCardProps) {
  const icon = (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
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
      id="portfolio"
      title={content.title}
      icon={icon}
      animationType="code-pixels"
      preview={preview}
    >
      <p className={styles.openLead}>{content.openLead}</p>

      {projects.length > 0 ? (
        <div className={styles.itemsList}>
          {projects.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemStatus}>{item.status}</span>
              </div>
              <p className={styles.itemDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.itemsList}>
          <div className={styles.itemRow}>
            <span className={styles.itemStatus}>{content.status}</span>
          </div>
        </div>
      )}

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
