import Link from 'next/link';
import styles from './MobileNavigation.module.css';

interface MobileNavItem {
  label: string;
  href: string;
}

const MOBILE_NAV_ITEMS: readonly MobileNavItem[] = [
  { label: 'Главная', href: '/' },
  { label: 'Обо мне', href: '/about' },
  { label: 'Портфолио', href: '/portfolio' },
  { label: 'Контакты', href: '/contact' },
  { label: 'Музыка', href: '/music' },
];

export function MobileNavigation() {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.bar} aria-label="Мобильная навигация">
        <ul className={styles.list}>
          {MOBILE_NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
