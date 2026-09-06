'use client';

import Link from 'next/link';
import { InteractiveCard } from './InteractiveCard';
import styles from './AboutCard.module.css';

export function AboutCard() {
  const visualIcon = (
    <svg
      className={styles.iconSvg}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
    </svg>
  );

  const previewContent = (
    <>
      <p className={styles.closedDesc}>
        Веб-дизайнер и специалист
        <br />
        по AI и автоматизации.
      </p>
      <p className={styles.closedSub}>
        Создаю современные цифровые решения.
      </p>
      <span className={styles.badge}>8+ лет в дизайне</span>
    </>
  );

  return (
    <InteractiveCard
      id="about"
      title="ОБО МНЕ"
      icon={visualIcon}
      animationType="ring"
      preview={previewContent}
    >
      <div className={styles.openHeader}>
        <h3 className={styles.openTitle}>ANDREY BAGER</h3>
        <span className={styles.openSubtitle}>WEB DESIGNER / AI / AUTOMATION</span>
      </div>

      <p className={styles.openLead}>
        Создаю сайты и цифровые решения, которые помогают бизнесу выглядеть профессионально и работать эффективнее.
      </p>

      <div className={styles.pillarsList}>
        <div className={styles.pillarItem}>
          <span className={styles.pillarNumber}>01 / ДИЗАЙН</span>
          <p className={styles.pillarText}>Веб-дизайн, интерфейсы и цифровые продукты.</p>
        </div>

        <div className={styles.pillarItem}>
          <span className={styles.pillarNumber}>02 / РАЗРАБОТКА</span>
          <p className={styles.pillarText}>Создание и запуск сайтов.</p>
        </div>

        <div className={styles.pillarItem}>
          <span className={styles.pillarNumber}>03 / AI & AUTOMATION</span>
          <p className={styles.pillarText}>AI-инструменты, Telegram-боты и автоматизация процессов.</p>
        </div>
      </div>

      <div className={styles.openFooter}>
        <span className={styles.badge}>8+ лет в дизайне</span>
        <Link
          href="/about"
          className={styles.ctaLink}
          onClick={(e) => e.stopPropagation()}
        >
          ПОДРОБНЕЕ ОБО МНЕ ↗
        </Link>
      </div>
    </InteractiveCard>
  );
}
