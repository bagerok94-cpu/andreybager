'use client';

import Link from 'next/link';
import type { AboutContent } from '@/types';
import { InteractiveCard } from './InteractiveCard';
import { CtaContent } from './cardIcons';
import styles from './AboutCard.module.css';
import common from './CardsCommon.module.css';

interface AboutCardProps {
  content: AboutContent;
}

export function AboutCard({ content }: AboutCardProps) {
  const visualIcon = (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
    </svg>
  );

  const previewContent = (
    <>
      <p className={styles.closedDesc}>
        {content.closedDescLines[0]}
        <br />
        {content.closedDescLines[1]}
      </p>
      <p className={styles.closedSub}>{content.closedSub}</p>
    </>
  );

  return (
    <InteractiveCard
      id="about"
      title={content.title}
      icon={visualIcon}
      animationType="ring"
      preview={previewContent}
    >
      <div className={styles.openHeader}>
        <h3 className={styles.openTitle}>{content.name}</h3>
        <span className={styles.openSubtitle}>{content.role}</span>
      </div>

      <p className={styles.openLead}>{content.openLead}</p>

      <div className={styles.pillarsList}>
        {content.pillars.map((pillar) => (
          <div key={pillar.number} className={common.actionRow}>
            <span className={common.actionBody}>
              <span className={common.itemTitle}>{pillar.number}</span>
              <span className={common.itemDesc}>{pillar.text}</span>
            </span>
          </div>
        ))}
      </div>

      <div className={common.openFooter}>
        <Link
          href={content.ctaHref}
          className={common.ctaLink}
          onClick={(e) => e.stopPropagation()}
        >
          <CtaContent label={content.ctaLabel} />
        </Link>
      </div>
    </InteractiveCard>
  );
}
