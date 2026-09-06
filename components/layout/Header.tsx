import Link from 'next/link';
import { DesktopNavigation } from '@/components/navigation';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="ANDREY BAGER - Главная страница">
          <span className={styles.title}>ANDREY BAGER</span>
          <span className={styles.subtitle}>WEB DESIGNER / AI / AUTOMATION</span>
        </Link>
        <DesktopNavigation />
      </div>
    </header>
  );
}
