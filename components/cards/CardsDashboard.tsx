import { AboutCard } from './AboutCard';
import { PortfolioCard } from './PortfolioCard';
import { ContactCard } from './ContactCard';
import { ToolsCard } from './ToolsCard';
import { ServicesCard } from './ServicesCard';
import { ProjectCard } from './ProjectCard';
import { MusicCard } from './MusicCard';
import styles from './CardsDashboard.module.css';

export function CardsDashboard() {
  return (
    <section className={styles.section} aria-label="Интерактивный дашборд">
      <div className={styles.grid}>
        <div className={styles.aboutSpan}>
          <AboutCard />
        </div>
        <div className={styles.portfolioSpan}>
          <PortfolioCard />
        </div>
        <div className={styles.servicesSpan}>
          <ServicesCard />
        </div>
        <div className={styles.toolsSpan}>
          <ToolsCard />
        </div>
        <div className={styles.projectSpan}>
          <ProjectCard />
        </div>
        <div className={styles.contactSpan}>
          <ContactCard />
        </div>
        <div className={styles.musicSpan}>
          <MusicCard />
        </div>
      </div>
    </section>
  );
}
