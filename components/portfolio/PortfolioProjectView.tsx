import type { PortfolioProject } from '@/types';
import pageStyles from '@/components/layout/PageShell.module.css';
import styles from './PortfolioProjectView.module.css';

interface PortfolioProjectViewProps {
  project: PortfolioProject;
}

export function PortfolioProjectView({ project }: PortfolioProjectViewProps) {
  const gallery = project.gallery ?? [];

  return (
    <>
      {project.coverImage ? (
        <div className={styles.cover}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.title}
            className={styles.coverImage}
          />
        </div>
      ) : null}

      {project.body ? <p className={styles.body}>{project.body}</p> : null}

      {gallery.length > 0 ? (
        <div className={styles.gallery}>
          {gallery.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              className={styles.galleryImage}
            />
          ))}
        </div>
      ) : null}

      {project.year || project.url ? (
        <div className={styles.meta}>
          {project.year ? (
            <span className={pageStyles.badge}>{String(project.year)}</span>
          ) : null}
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={pageStyles.secondaryCta}
            >
              {project.url}
            </a>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
