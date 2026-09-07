import type { HeroContent } from '@/types';
import styles from './Hero.module.css';

interface HeroProps {
  content: HeroContent;
  avatarSrc?: string;
}

export function Hero({ content, avatarSrc }: HeroProps) {
  return (
    <section className={styles.hero} aria-label="Главный экран">
      <div className={styles.background} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.centerpiece}>
          <div className={styles.glassStripe} aria-hidden="true" />

          <div className={styles.particlesLayer} aria-hidden="true">
            <span className={`${styles.particle} ${styles.pSmallSharp} ${styles.p1}`} />
            <span className={`${styles.particle} ${styles.pMedium} ${styles.p2}`} />
            <span className={`${styles.particle} ${styles.pLargeSoft} ${styles.p3}`} />
            <span className={`${styles.particle} ${styles.pSmallSharp} ${styles.p4}`} />
            <span className={`${styles.particle} ${styles.pMedium} ${styles.p5}`} />
            <span className={`${styles.particle} ${styles.pExtraLarge} ${styles.p6}`} />
            <span className={`${styles.particle} ${styles.pSmallSharp} ${styles.p7}`} />
            <span className={`${styles.particle} ${styles.pMedium} ${styles.p8}`} />
            <span className={`${styles.particle} ${styles.pSmallSharp} ${styles.p9}`} />
            <span className={`${styles.particle} ${styles.pLargeSoft} ${styles.p10}`} />
            <span className={`${styles.particle} ${styles.pMedium} ${styles.p11}`} />
            <span className={`${styles.particle} ${styles.pExtraLarge} ${styles.p12}`} />
          </div>

          <h1 className={styles.name}>
            {content.nameLines.map((line) => (
              <span key={line} className={styles.nameLine}>
                {line}
              </span>
            ))}
          </h1>
        </div>

        <div className={styles.metaBar}>
          <p className={styles.tagline}>
            {content.taglineLines[0]}
            <br />
            {content.taglineLines[1]}
            <br />
            <span className={styles.taglineAccent}>{content.taglineAccent}</span>
          </p>

          <div className={styles.avatarContainer}>
            <div className={styles.avatarFrame}>
              {avatarSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarSrc}
                  alt="Andrey Bager"
                  className={styles.avatarImage}
                  width={116}
                  height={116}
                />
              ) : (
                <div
                  className={styles.avatarPlaceholder}
                  role="img"
                  aria-label="Аватар Andrey Bager (placeholder)"
                >
                  <span className={styles.avatarMonogram}>{content.avatarMonogram}</span>
                </div>
              )}
            </div>
            <div className={styles.avatarMeta}>
              <span className={styles.avatarStatus}>{content.avatarStatus}</span>
              <span className={styles.avatarRole}>{content.avatarRole}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
