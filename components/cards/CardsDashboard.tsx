import type { HomeContent, MusicTrack, PortfolioProject } from '@/types';
import { AboutCard } from './AboutCard';
import { PortfolioCard } from './PortfolioCard';
import { ContactCard } from './ContactCard';
import { ToolsCard } from './ToolsCard';
import { ServicesCard } from './ServicesCard';
import { ProjectCard } from './ProjectCard';
import { MusicCard } from './MusicCard';
import styles from './CardsDashboard.module.css';

interface CardsDashboardProps {
  content: HomeContent;
  projects: PortfolioProject[];
  tracks: MusicTrack[];
}

export function CardsDashboard({ content, projects, tracks }: CardsDashboardProps) {
  return (
    <section className={styles.section} aria-label="Интерактивный дашборд">
      <div className={styles.grid}>
        <div className={styles.aboutSpan}>
          <AboutCard content={content.about} />
        </div>
        <div className={styles.portfolioSpan}>
          <PortfolioCard content={content.portfolio} projects={projects} />
        </div>
        <div className={styles.servicesSpan}>
          <ServicesCard content={content.services} />
        </div>
        <div className={styles.toolsSpan}>
          <ToolsCard content={content.tools} />
        </div>
        <div className={styles.projectSpan}>
          <ProjectCard content={content.project} />
        </div>
        <div className={styles.contactSpan}>
          <ContactCard content={content.contact} />
        </div>
        <div className={styles.musicSpan}>
          <MusicCard content={content.music} tracks={tracks} />
        </div>
      </div>
    </section>
  );
}
