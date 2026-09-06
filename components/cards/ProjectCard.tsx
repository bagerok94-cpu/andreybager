'use client';

import Link from 'next/link';
import { InteractiveCard } from './InteractiveCard';
import styles from './CardsCommon.module.css';

const STEPS = [
  { step: '01', title: 'Обсудим задачу' },
  { step: '02', title: 'Определим решение' },
  { step: '03', title: 'Запустим проект' },
];

export function ProjectCard() {
  // Minimalist monochrome rocket icon
  const icon = (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5" />
      <path d="M12 15v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5" />
    </svg>
  );

  const preview = (
    <>
      <p className={styles.previewDesc}>
        Есть идея?
        <br />
        Давайте обсудим.
      </p>
      <span className={styles.badge}>Сотрудничество</span>
    </>
  );

  return (
    <InteractiveCard
      id="project"
      title="ГОТОВ К ПРОЕКТУ?"
      icon={icon}
      animationType="rocket-launch"
      preview={preview}
    >
      <p className={styles.openLead}>
        Расскажите, что хотите создать. Вместе определим задачу и найдём решение.
      </p>

      <div className={styles.itemsList}>
        {STEPS.map((s) => (
          <div key={s.step} className={styles.itemRow}>
            <span className={styles.itemTitle}>{`${s.step} — ${s.title}`}</span>
          </div>
        ))}
      </div>

      <div className={styles.openFooter}>
        <span className={styles.badge}>Старт за 1-2 дня</span>
        <Link
          href="/contact"
          className={styles.ctaLink}
          onClick={(e) => e.stopPropagation()}
        >
          ОБСУДИТЬ ПРОЕКТ ↗
        </Link>
      </div>
    </InteractiveCard>
  );
}
