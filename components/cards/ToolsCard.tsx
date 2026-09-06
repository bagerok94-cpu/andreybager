'use client';

import Link from 'next/link';
import { InteractiveCard } from './InteractiveCard';
import styles from './CardsCommon.module.css';

const TOOLS_LIST = [
  { name: 'Figma', desc: 'Дизайн интерфейсов' },
  { name: 'Tilda', desc: 'Создание сайтов' },
  { name: 'VS Code', desc: 'Разработка' },
  { name: 'Photoshop', desc: 'Графика и обработка' },
  { name: 'Illustrator', desc: 'Векторная графика' },
  { name: 'AI Tools', desc: 'AI для задач и генерации' },
  { name: 'Telegram API', desc: 'Боты и интеграции' },
  { name: 'Python', desc: 'Автоматизация и скрипты' },
  { name: 'Automation', desc: 'Автоматизация процессов' },
];

export function ToolsCard() {
  const icon = (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );

  const preview = (
    <>
      <p className={styles.previewDesc}>
        Инструменты, которые я использую
        <br />
        в работе.
      </p>
      <span className={styles.badge}>Стек и софт</span>
    </>
  );

  return (
    <InteractiveCard
      id="tools"
      title="ИНСТРУМЕНТЫ"
      icon={icon}
      animationType="geometric-assemble"
      preview={preview}
    >
      <div className={styles.toolsGrid}>
        {TOOLS_LIST.map((tool) => (
          <div key={tool.name} className={styles.itemRow}>
            <span className={styles.itemTitle}>{tool.name}</span>
            <span className={styles.itemDesc}>{tool.desc}</span>
          </div>
        ))}
      </div>

      <div className={styles.openFooter}>
        <span className={styles.badge}>9 ключевых инструментов</span>
        <Link
          href="/tools"
          className={styles.ctaLink}
          onClick={(e) => e.stopPropagation()}
        >
          ВСЕ ИНСТРУМЕНТЫ ↗
        </Link>
      </div>
    </InteractiveCard>
  );
}
