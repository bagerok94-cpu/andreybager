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
