'use client';

import Link from 'next/link';
import type { MusicContent, MusicTrack } from '@/types';
import { InteractiveCard } from './InteractiveCard';
import styles from './CardsCommon.module.css';

interface MusicCardProps {
  content: MusicContent;
  tracks: MusicTrack[];
}

export function MusicCard({ content, tracks }: MusicCardProps) {
  const icon = (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );

  const preview = (
    <>
      <p className={styles.previewDesc}>{content.previewDesc}</p>
    </>
  );

  return (
    <InteractiveCard
      id="music"
      title={content.title}
      icon={icon}
      animationType="sound-waves"
      preview={preview}
    >
      <div className={styles.itemRow}>
        <span className={styles.itemTitle}>{content.title}</span>
        <p className={styles.itemDesc}>{content.previewDesc}</p>
      </div>

      {tracks.length === 0 ? null : (
        <div className={styles.itemsList}>
          {tracks.map((track) => (
            <div key={track.id} className={styles.itemRow}>
              <span className={styles.itemTitle}>{track.title}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.openFooter}>
        <span className={styles.badge}>{content.status}</span>
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
