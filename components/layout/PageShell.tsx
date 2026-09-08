import Link from 'next/link';
import styles from './PageShell.module.css';

interface PageShellProps {
  kicker?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}

export function PageShell({ kicker, title, lead, children }: PageShellProps) {
  return (
    <section className={styles.page}>
      <Link href="/" className={styles.backIcon} aria-label="На главную">
        <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
          <path
            d="M15 6L9 12l6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
      <h1 className={styles.title}>{title}</h1>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
      {children ? <div className={styles.body}>{children}</div> : null}
      <Link href="/" className={styles.back}>
        На главную
      </Link>
    </section>
  );
}
