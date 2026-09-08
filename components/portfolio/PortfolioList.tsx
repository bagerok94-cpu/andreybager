import Link from 'next/link';
import type { PortfolioProject } from '@/types';
import pageStyles from '@/components/layout/PageShell.module.css';
import styles from './PortfolioList.module.css';

interface PortfolioListProps {
  projects: PortfolioProject[];
  emptyStatus: string;
  emptyText: string;
}

function projectHref(project: PortfolioProject): string {
  return `/portfolio/${project.slug ?? project.id}`;
}

export function PortfolioList({
  projects,
  emptyStatus,
  emptyText,
}: PortfolioListProps) {
  if (projects.length === 0) {
    return (
      <div className={pageStyles.empty}>
        <span className={pageStyles.emptyStatus}>{emptyStatus}</span>
        {emptyText ? <p className={pageStyles.emptyText}>{emptyText}</p> : null}
      </div>
    );
  }

  return (
    <div className={pageStyles.list}>
      {projects.map((project) => (
        <Link
          key={project.id}
          href={projectHref(project)}
          className={`${pageStyles.item} ${styles.itemLink}`}
        >
          <span className={`${pageStyles.itemTitle} ${styles.itemTitle}`}>
            {project.title}
          </span>
          <span className={pageStyles.itemLabel}>{project.status}</span>
          <p className={pageStyles.itemText}>{project.description}</p>
        </Link>
      ))}
    </div>
  );
}
