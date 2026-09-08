'use client';

import Link from 'next/link';
import type { ContactContent } from '@/types';
import { InteractiveCard } from './InteractiveCard';
import { ChannelIcon, CtaContent, IconArrow } from './cardIcons';
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
          <a
            key={channel.label}
            href={channel.href}
            target={channel.href.startsWith('http') ? '_blank' : undefined}
            rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={styles.actionRow}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.actionIcon}>
              <ChannelIcon label={channel.label} />
            </span>
            <span className={styles.actionBody}>
              <span className={styles.channelLabel}>{channel.label}</span>
              <span className={styles.channelValue}>{channel.value}</span>
            </span>
            <IconArrow />
          </a>
        ))}
      </div>

      <p className={styles.openLead}>{content.openLead}</p>

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
