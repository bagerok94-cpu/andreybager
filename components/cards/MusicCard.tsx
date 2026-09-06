'use client';

import Link from 'next/link';
import { InteractiveCard } from './InteractiveCard';
import styles from './CardsCommon.module.css';

export function MusicCard() {
  const icon = (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );

  const preview = (
    <>
      <p className={styles.previewDesc}>
        Мои треки и музыка.
      </p>
      <span className={styles.badge}>10 TRACKS</span>
    </>
  );

  return (
    <InteractiveCard
      id="music"
      title="МОЯ МУЗЫКА"
      icon={icon}
      animationType="sound-waves"
      preview={preview}
    >
      <div className={styles.itemRow}>
        <span className={styles.itemTitle}>МОЯ МУЗЫКА</span>
        <p className={styles.itemDesc}>Мои треки и музыка.</p>
      </div>

      <div className={styles.openFooter}>
        <span className={styles.badge}>10 TRACKS</span>
        <Link
          href="/music"
          className={styles.ctaLink}
          onClick={(e) => e.stopPropagation()}
        >
          СЛУШАТЬ МУЗЫКУ ↗
        </Link>
      </div>
    </InteractiveCard>
  );
}
