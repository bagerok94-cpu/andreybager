import Link from 'next/link';
import styles from './DesktopNavigation.module.css';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'ОБО МНЕ', href: '/about' },
  { label: 'ПОРТФОЛИО', href: '/portfolio' },
  { label: 'КОНТАКТЫ', href: '/contact' },
  { label: 'ИНСТРУМЕНТЫ', href: '/tools' },
  { label: 'ЧТО Я ДЕЛАЮ', href: '/services' },
  { label: 'МОЯ МУЗЫКА', href: '/music' },
];

export function DesktopNavigation() {
  return (
    <nav className={styles.nav} aria-label="Основная навигация">
      <ul className={styles.list}>
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
