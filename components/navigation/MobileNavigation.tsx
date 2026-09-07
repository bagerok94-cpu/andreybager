'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/types';
import styles from './MobileNavigation.module.css';

interface MobileNavigationProps {
  items: readonly NavItem[];
}

export function MobileNavigation({ items }: MobileNavigationProps) {
  const pathname = usePathname();
  const mobileItems = items.filter((item) => item.mobile);

  return (
    <div className={styles.wrapper}>
      <nav className={styles.bar} aria-label="Мобильная навигация">
        <ul className={styles.list}>
          {mobileItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive ? `${styles.link} ${styles.linkActive}` : styles.link}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.shortLabel ?? item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
