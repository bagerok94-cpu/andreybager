'use client';

import Link from 'next/link';
import type { ServicesContent } from '@/types';
import { InteractiveCard } from './InteractiveCard';
import styles from './CardsCommon.module.css';

interface ServicesCardProps {
  content: ServicesContent;
}

export function ServicesCard({ content }: ServicesCardProps) {
  const icon = (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
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
      id="services"
      title={content.title}
      icon={icon}
      animationType="layers-fold"
      preview={preview}
    >
      <div className={styles.itemsList}>
        {content.items.map((svc) => (
          <div key={svc.id} className={styles.itemRow}>
            <span className={styles.itemTitle}>{`${svc.number} — ${svc.title}`}</span>
            <p className={styles.itemDesc}>{svc.description}</p>
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
