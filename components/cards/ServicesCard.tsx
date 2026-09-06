'use client';

import Link from 'next/link';
import { InteractiveCard } from './InteractiveCard';
import styles from './CardsCommon.module.css';

const SERVICES_LIST = [
  { num: '01', title: 'ВЕБ-ДИЗАЙН И САЙТЫ', desc: 'Современные сайты и продающие страницы.' },
  { num: '02', title: 'TILDA РАЗРАБОТКА', desc: 'Верстка, Zero Block, адаптация и запуск.' },
  { num: '03', title: 'UI / UX ДИЗАЙН', desc: 'Проектирование удобных цифровых интерфейсов.' },
  { num: '04', title: 'AI И АВТОМАТИЗАЦИЯ', desc: 'AI-инструменты и автоматизация рутинных процессов.' },
  { num: '05', title: 'TELEGRAM-БОТЫ', desc: 'Разработка ботов и интеграций для бизнеса.' },
];

export function ServicesCard() {
  const icon = (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );

  const preview = (
    <>
      <p className={styles.previewDesc}>
        Дизайн, сайты, AI
        <br />
        и автоматизация бизнеса.
      </p>
      <span className={styles.badge}>Услуги под ключ</span>
    </>
  );

  return (
    <InteractiveCard
      id="services"
      title="ЧТО Я ДЕЛАЮ"
      icon={icon}
      animationType="layers-fold"
      preview={preview}
    >
      <div className={styles.itemsList}>
        {SERVICES_LIST.map((svc) => (
          <div key={svc.num} className={styles.itemRow}>
            <span className={styles.itemTitle}>{`${svc.num} — ${svc.title}`}</span>
            <p className={styles.itemDesc}>{svc.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.openFooter}>
        <span className={styles.badge}>5 направлений работы</span>
        <Link
          href="/services"
          className={styles.ctaLink}
          onClick={(e) => e.stopPropagation()}
        >
          ВСЕ УСЛУГИ ↗
        </Link>
      </div>
    </InteractiveCard>
  );
}
