'use client';

import Link from 'next/link';
import type { ContactContent } from '@/types';
import { InteractiveCard } from './InteractiveCard';
import styles from './CardsCommon.module.css';

interface ContactCardProps {
  content: ContactContent;
}

export function ContactCard({ content }: ContactCardProps) {
  const icon = (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
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
      id="contact"
      title={content.title}
      icon={icon}
      animationType="paper-plane"
      preview={preview}
    >
      <div className={styles.contactBlock}>
        {content.channels.map((channel) => (
          <div key={channel.label} className={styles.contactChannel}>
            <span className={styles.channelLabel}>{channel.label}</span>
            <span className={styles.channelValue}>{channel.value}</span>
            <a
              href={channel.href}
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={styles.secondaryCtaLink}
              onClick={(e) => e.stopPropagation()}
            >
              {channel.ctaLabel}
            </a>
          </div>
        ))}
      </div>

      <p className={styles.openLead}>{content.openLead}</p>

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
