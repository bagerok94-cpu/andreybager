import { Header } from './Header';
import { MobileNavigation } from '@/components/navigation';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.shell}>
      {/* Header with integrated Desktop Navigation */}
      <Header />

      {/* Main Content Area */}
      <main id="main-content" className={`${styles.main} container`}>
        {children}
      </main>

      {/* Mobile Floating Glass Navigation */}
      <MobileNavigation />
    </div>
  );
}
