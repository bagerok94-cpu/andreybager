'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/types';
import styles from './DesktopNavigation.module.css';

interface DesktopNavigationProps {
  items: readonly NavItem[];
}

export function DesktopNavigation({ items }: DesktopNavigationProps) {
  const pathname = usePathname();
  const desktopItems = items.filter((item) => item.desktop);

  return (
    <nav className={styles.nav} aria-label="Основная навигация">
      <ul className={styles.list}>
        {desktopItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={isActive ? `${styles.link} ${styles.linkActive}` : styles.link}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
