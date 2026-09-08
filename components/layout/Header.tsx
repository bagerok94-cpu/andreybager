'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DesktopNavigation } from '@/components/navigation';
import type { NavItem } from '@/types';
import styles from './Header.module.css';

interface HeaderProps {
  navItems: readonly NavItem[];
  brandTitle: string;
  brandSubtitle: string;
}

export function Header({ navItems, brandTitle, brandSubtitle }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link
          href="/"
          className={styles.brand}
          aria-label={`${brandTitle} - Главная страница`}
          aria-current={isHome ? 'page' : undefined}
        >
          <span className={styles.title}>{brandTitle}</span>
          <span className={styles.subtitle}>{brandSubtitle}</span>
        </Link>
        <DesktopNavigation items={navItems} />
      </div>
    </header>
  );
}
