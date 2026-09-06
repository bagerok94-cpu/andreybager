'use client';

import Link from 'next/link';
import { InteractiveCard } from './InteractiveCard';
import styles from './CardsCommon.module.css';

const WORK_ITEMS = [
  { title: 'WEB PROJECT', status: 'В разработке', desc: 'Сайт и цифровая платформа' },
  { title: 'DIGITAL PROJECT', status: 'В разработке', desc: 'Интерфейс и веб-сервис' },
  { title: 'AI / AUTOMATION', status: 'В разработке', desc: 'Автоматизация и интеграции' },
];

export function PortfolioCard() {
  const icon = (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );

  const preview = (
    <>
      <p className={styles.previewDesc}>
        Мои последние работы
        <br />
        и кейсы.
      </p>
      <span className={styles.badge}>Кейсы и проекты</span>
    </>
  );

  return (
    <InteractiveCard
      id="portfolio"
      title="ПОРТФОЛИО"
      icon={icon}
      animationType="code-pixels"
      preview={preview}
    >
      <p className={styles.openLead}>
        Здесь собраны проекты, над которыми я работал: сайты, интерфейсы и цифровые решения.
      </p>

      <div className={styles.itemsList}>
        {WORK_ITEMS.map((item) => (
          <div key={item.title} className={styles.itemRow}>
            <div className={styles.itemHeader}>
              <span className={styles.itemTitle}>{item.title}</span>
              <span className={styles.itemStatus}>{item.status}</span>
            </div>
            <p className={styles.itemDesc}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.openFooter}>
        <span className={styles.badge}>Разработка и релизы</span>
        <Link
          href="/portfolio"
          className={styles.ctaLink}
          onClick={(e) => e.stopPropagation()}
        >
          СМОТРЕТЬ ПОРТФОЛИО ↗
        </Link>
      </div>
    </InteractiveCard>
  );
}
