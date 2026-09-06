import styles from './Hero.module.css';

interface HeroProps {
  avatarSrc?: string;
}

export function Hero({ avatarSrc }: HeroProps) {
  return (
    <section className={styles.hero} aria-label="Главный экран">
      <div className={styles.background} aria-hidden="true" />

      <div className={styles.content}>
        {/* Centerpiece: Large Typography + Glass Stripe + Particles */}
        <div className={styles.centerpiece}>
          {/* Horizontal Glass Stripe */}
          <div className={styles.glassStripe} aria-hidden="true" />

          {/* Digital Pixel Particles around the Glass Stripe */}
          <div className={styles.particlesLayer} aria-hidden="true">
            {/* Top boundary particles */}
            <span className={`${styles.particle} ${styles.pSmallSharp} ${styles.p1}`} />
            <span className={`${styles.particle} ${styles.pMedium} ${styles.p2}`} />
            <span className={`${styles.particle} ${styles.pLargeSoft} ${styles.p3}`} />
            <span className={`${styles.particle} ${styles.pSmallSharp} ${styles.p4}`} />
            <span className={`${styles.particle} ${styles.pMedium} ${styles.p5}`} />
            <span className={`${styles.particle} ${styles.pExtraLarge} ${styles.p6}`} />

            {/* Bottom boundary particles */}
            <span className={`${styles.particle} ${styles.pSmallSharp} ${styles.p7}`} />
            <span className={`${styles.particle} ${styles.pMedium} ${styles.p8}`} />
            <span className={`${styles.particle} ${styles.pSmallSharp} ${styles.p9}`} />
            <span className={`${styles.particle} ${styles.pLargeSoft} ${styles.p10}`} />
            <span className={`${styles.particle} ${styles.pMedium} ${styles.p11}`} />
            <span className={`${styles.particle} ${styles.pExtraLarge} ${styles.p12}`} />
          </div>

          {/* Bold Name Typography */}
          <h1 className={styles.name}>
            <span className={styles.nameLine}>ANDREY</span>
            <span className={styles.nameLine}>BAGER</span>
          </h1>
        </div>

        {/* Dashboard Meta Bar: Tagline & Avatar */}
        <div className={styles.metaBar}>
          <p className={styles.tagline}>
            Создаю digital-решения,
            <br />
            которые приносят
            <br />
            <span className={styles.taglineAccent}>результат.</span>
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
                  <span className={styles.avatarMonogram}>AB</span>
                </div>
              )}
            </div>
            <div className={styles.avatarMeta}>
              <span className={styles.avatarStatus}>Status</span>
              <span className={styles.avatarRole}>Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
