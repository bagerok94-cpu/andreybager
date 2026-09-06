'use client';

import Link from 'next/link';
import { InteractiveCard } from './InteractiveCard';
import styles from './CardsCommon.module.css';

export function ContactCard() {
  const icon = (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );

  const preview = (
    <>
      <p className={styles.previewDesc}>
        Связаться со мной
        <br />
        удобнее всего в Telegram.
      </p>
      <span className={styles.badge}>Открыт к предложениям</span>
    </>
  );

  return (
    <InteractiveCard
      id="contact"
      title="КОНТАКТЫ"
      icon={icon}
      animationType="paper-plane"
      preview={preview}
    >
      <div className={styles.contactBlock}>
        <div className={styles.contactChannel}>
          <span className={styles.channelLabel}>TELEGRAM</span>
          <span className={styles.channelValue}>@andrey_bager_web</span>
          <a
            href="https://t.me/andrey_bager_web"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryCtaLink}
            onClick={(e) => e.stopPropagation()}
          >
            НАПИСАТЬ В TELEGRAM ↗
          </a>
        </div>

        <div className={styles.contactChannel}>
          <span className={styles.channelLabel}>EMAIL</span>
          <span className={styles.channelValue}>andrey.bager.web@gmail.com</span>
          <a
            href="mailto:andrey.bager.web@gmail.com"
            className={styles.secondaryCtaLink}
            onClick={(e) => e.stopPropagation()}
          >
            НАПИСАТЬ НА ПОЧТУ ↗
          </a>
        </div>
      </div>

      <p className={styles.openLead}>
        Есть задача или идея? Расскажите о ней — обсудим.
      </p>

      <div className={styles.openFooter}>
        <span className={styles.badge}>Прямой контакт</span>
        <Link
          href="/contact"
          className={styles.ctaLink}
          onClick={(e) => e.stopPropagation()}
        >
          ОБСУДИТЬ ПРОЕКТ ↗
        </Link>
      </div>
    </InteractiveCard>
  );
}
