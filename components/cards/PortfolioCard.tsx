'use client';

import Link from 'next/link';
import type { PortfolioContent, PortfolioProject } from '@/types';
import { InteractiveCard } from './InteractiveCard';
import { CtaContent, IconArrow } from './cardIcons';
import styles from './CardsCommon.module.css';

interface PortfolioCardProps {
  content: PortfolioContent;
  projects: PortfolioProject[];
}

function projectHref(project: PortfolioProject): string {
  return `/portfolio/${project.slug ?? project.id}`;
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
            <Link
              key={item.id}
              href={projectHref(item)}
              className={styles.actionRow}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={styles.actionBody}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemDesc}>{item.description}</span>
              </span>
              <span className={styles.itemStatus}>{item.status}</span>
              <IconArrow />
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.emptySlot}>
          <span className={styles.itemStatus}>{content.status}</span>
        </div>
      )}

      <div className={styles.openFooter}>
        <Link
          href={content.ctaHref}
          className={styles.ctaLink}
          onClick={(e) => e.stopPropagation()}
        >
          <CtaContent label={content.ctaLabel} />
        </Link>
      </div>
    </InteractiveCard>
  );
}
