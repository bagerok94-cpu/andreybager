'use client';

import Link from 'next/link';
import type { ProjectContent } from '@/types';
import { InteractiveCard } from './InteractiveCard';
import styles from './CardsCommon.module.css';

interface ProjectCardProps {
  content: ProjectContent;
}

export function ProjectCard({ content }: ProjectCardProps) {
  const icon = (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5" />
      <path d="M12 15v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5" />
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
      id="project"
      title={content.title}
      icon={icon}
      animationType="rocket-launch"
      preview={preview}
    >
      <p className={styles.openLead}>{content.openLead}</p>

      <div className={styles.itemsList}>
        {content.steps.map((s) => (
          <div key={s.step} className={styles.itemRow}>
            <span className={styles.itemTitle}>{`${s.step} — ${s.title}`}</span>
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
