import type { Metadata } from 'next';
import { PageShell } from '@/components/layout';
import pageStyles from '@/components/layout/PageShell.module.css';
import { contentLayer } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const contact = await contentLayer.getContact();
  return {
    title: contact.title,
    description: contact.openLead,
  };
}

export default async function ContactPage() {
  const contact = await contentLayer.getContact();

  return (
    <PageShell
      kicker={contact.previewBadge}
      title={contact.title}
      lead={contact.openLead}
    >
      <div className={pageStyles.channels}>
        {contact.channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.href.startsWith('http') ? '_blank' : undefined}
            rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={pageStyles.secondaryCta}
          >
            <span>
              <span className={pageStyles.channelLabel}>{channel.label}</span>
              <span className={pageStyles.channelValue}>{channel.value}</span>
            </span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <span className={pageStyles.badge}>{contact.footerBadge}</span>
    </PageShell>
  );
}
