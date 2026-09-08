import { Header } from './Header';
import { MobileNavigation } from '@/components/navigation';
import { contentLayer } from '@/lib/content';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: React.ReactNode;
}

export async function AppShell({ children }: AppShellProps) {
  const [navItems, settings, about] = await Promise.all([
    contentLayer.getNavigation(),
    contentLayer.getSiteSettings(),
    contentLayer.getAbout(),
  ]);

  return (
    <div className={styles.shell}>
      <a href="#main-content" className={styles.skipLink}>
        Перейти к содержимому
      </a>

      <Header
        navItems={navItems}
        brandTitle={settings.author}
        brandSubtitle={about.role}
      />

      <main id="main-content" className={`${styles.main} container`} tabIndex={-1}>
        {children}
      </main>

      <MobileNavigation items={navItems} />
    </div>
  );
}
