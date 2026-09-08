'use client';

import Link from 'next/link';
import type { MusicContent, MusicTrack } from '@/types';
import { InteractiveCard } from './InteractiveCard';
import { CtaContent, EqualizerIcon } from './cardIcons';
import styles from './CardsCommon.module.css';

interface MusicCardProps {
  content: MusicContent;
  tracks: MusicTrack[];
}

export function MusicCard({ content, tracks }: MusicCardProps) {
  const preview = (
    <>
      <p className={styles.previewDesc}>{content.previewDesc}</p>
    </>
  );

  return (
    <InteractiveCard
      id="music"
      title={content.title}
      icon={<EqualizerIcon />}
      animationType="sound-waves"
      preview={preview}
    >
      {tracks.length > 0 ? (
        <div className={styles.itemsList}>
          {tracks.map((track) => (
            <div key={track.id} className={styles.actionRow}>
              <span className={styles.actionBody}>
                <span className={styles.itemTitle}>{track.title}</span>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptySlot}>
          <span className={styles.itemStatus}>{content.status}</span>
          <p className={styles.itemDesc}>{content.previewDesc}</p>
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
