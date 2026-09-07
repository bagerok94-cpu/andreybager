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
      <Header
        navItems={navItems}
        brandTitle={settings.author}
        brandSubtitle={about.role}
      />

      <main id="main-content" className={`${styles.main} container`}>
        {children}
      </main>

      <MobileNavigation items={navItems} />
    </div>
  );
}
