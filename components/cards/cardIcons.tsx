import styles from './CardsCommon.module.css';

export function CtaContent({ label }: { label: string }) {
  return (
    <>
      <span>{label.replace(/\s*↗\s*$/, '')}</span>
      <span className={styles.ctaArrow} aria-hidden="true">
        ↗
      </span>
    </>
  );
}

export function IconArrow() {
  return (
    <svg className={styles.rowArrow} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ChannelIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  if (key.includes('telegram')) {
    return (
      <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    );
  }
  if (key.includes('email') || key.includes('mail')) {
    return (
      <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3 7 12 13 21 7" />
      </svg>
    );
  }
  return (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

export function ServiceIcon({ id }: { id: string }) {
  switch (id) {
    case 'web-design':
      return (
        <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M8 21h8" />
        </svg>
      );
    case 'tilda':
      return (
        <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'ui-ux':
      return (
        <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s7-4.4 7-10a7 7 0 1 0-14 0c0 5.6 7 10 7 10z" />
          <circle cx="12" cy="11" r="2.5" />
        </svg>
      );
    case 'ai-automation':
      return (
        <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        </svg>
      );
    case 'telegram-bots':
      return (
        <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      );
    default:
      return (
        <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

export function StepIcon({ step }: { step: string }) {
  if (step.startsWith('01')) {
    return (
      <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
      </svg>
    );
  }
  if (step.startsWith('02')) {
    return (
      <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    );
  }
  return (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    </svg>
  );
}

export function ToolMark({ id }: { id: string }) {
  switch (id) {
    case 'figma':
      return (
        <svg className={styles.toolMark} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10" cy="6.5" r="3.2" fill="#F24E1E" />
          <circle cx="10" cy="12" r="3.2" fill="#A259FF" />
          <circle cx="10" cy="17.5" r="3.2" fill="#0ACF83" />
          <circle cx="14.8" cy="6.5" r="3.2" fill="#FF7262" />
          <circle cx="14.8" cy="12" r="3.2" fill="#1ABCFE" />
        </svg>
      );
    case 'tilda':
      return <span className={`${styles.toolLetter} ${styles.toolTilda}`}>T</span>;
    case 'vscode':
      return (
        <svg className={styles.toolMark} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 8l6-4 10 4v8l-10 4-6-4V8z"
            fill="none"
            stroke="#3B9EE8"
            strokeWidth="1.6"
          />
          <path d="M10 4v16" stroke="#3B9EE8" strokeWidth="1.6" />
        </svg>
      );
    case 'photoshop':
      return <span className={`${styles.toolLetter} ${styles.toolPs}`}>Ps</span>;
    case 'illustrator':
      return <span className={`${styles.toolLetter} ${styles.toolAi}`}>Ai</span>;
    case 'ai-tools':
      return (
        <svg className={styles.toolMark} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3l1.2 5.2L18 12l-4.8 3.8L12 21l-1.2-5.2L6 12l4.8-3.8L12 3z"
            fill="none"
            stroke="#E8E4D8"
            strokeWidth="1.4"
          />
        </svg>
      );
    case 'telegram-api':
      return (
        <svg className={styles.toolMark} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20.5 4.5L3.5 11.2l6.3 2.3 2.3 6.3 8.4-15.3z"
            fill="none"
            stroke="#2AABEE"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'python':
      return (
        <svg className={styles.toolMark} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 4c-4 0-5 2.2-5 5v2h5"
            fill="none"
            stroke="#3776AB"
            strokeWidth="1.6"
          />
          <path
            d="M12 20c4 0 5-2.2 5-5v-2h-5"
            fill="none"
            stroke="#FFD43B"
            strokeWidth="1.6"
          />
        </svg>
      );
    case 'automation':
      return (
        <svg className={styles.toolMark} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3.2" fill="none" stroke="#C8CDD8" strokeWidth="1.6" />
          <path
            d="M12 5v2M12 17v2M5 12h2M17 12h2M7.2 7.2l1.4 1.4M15.4 15.4l1.4 1.4M16.8 7.2l-1.4 1.4M8.6 15.4l-1.4 1.4"
            stroke="#C8CDD8"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return <span className={styles.toolLetter}>•</span>;
  }
}

export function EqualizerIcon() {
  return (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">
      <rect className="eqBar" x="5" y="9" width="3" height="8" rx="1" fill="currentColor" stroke="none" />
      <rect className="eqBar" x="10.5" y="5" width="3" height="12" rx="1" fill="currentColor" stroke="none" />
      <rect className="eqBar" x="16" y="7" width="3" height="10" rx="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function RocketHeroIcon() {
  return (
    <svg className={styles.rocketSvg} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 8c8 8 10 18 8 28l-8 4-8-4c-2-10 0-20 8-28z" />
      <circle cx="32" cy="24" r="4" />
      <path d="M24 36l-6 10M40 36l6 10M32 40v10" />
    </svg>
  );
}
