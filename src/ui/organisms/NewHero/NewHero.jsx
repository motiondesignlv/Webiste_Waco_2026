"use client";

import styles from "./NewHero.module.scss";
import Button from "@/ui/atoms/Button/Button";
import ParticleBackground from "@/ui/atoms/ParticleBackground/ParticleBackground";
import { trackLinkClick } from "@/lib/analytics";

export default function NewHero({ dictionary }) {
  const hero = dictionary?.hero || {};

  // Split title into words for animation
  const titleWords = (hero.title || "Create Winning Proposals in Minutes, Not Hours").split(" ");
  const titleLine1 = titleWords.slice(0, 3);
  const titleLine2 = titleWords.slice(3);

  return (
    <section className={styles.hero}>
      <ParticleBackground />
      <div className={styles.overlay} />
      <div className="page-shell">
        <div className={styles.content}>
          {/* Eyebrow on top visually, but animates after title */}
          <p className={`${styles.eyebrow} ${styles.heroReveal}`} style={{ animationDelay: '0.7s' }}>
            {hero.eyebrow || "AI + Analytics for creative freelancers"}
          </p>

          {/* Title animates first, word by word */}
          <h1 className={styles.title}>
            <span className={styles.titleLine}>
              {titleLine1.map((word, i) => (
                <span
                  key={`l1-${i}`}
                  className={styles.word}
                  style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                >
                  {word}
                </span>
              ))}
            </span>
            <span className={styles.titleLine}>
              {titleLine2.map((word, i) => (
                <span
                  key={`l2-${i}`}
                  className={styles.word}
                  style={{ animationDelay: `${0.1 + (titleLine1.length + i) * 0.08}s` }}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          <p className={`${styles.description} ${styles.heroReveal}`} style={{ animationDelay: '0.85s' }}>
            {hero.subtitle || "Waco3 uses AI to write professional proposals, quotes, and invoices for creative freelancers. Then shows you exactly when clients view them, which sections they read, and the perfect moment to follow up."}
          </p>
          <div className={`${styles.cta} ${styles.heroReveal}`} style={{ animationDelay: '1s' }}>
            <div className={styles.primaryCta}>
              <Button
                href="#waitlist"
                as="a"
                variant="primary"
                className={styles.button}
                trackingCategory="hero_cta"
                icon={
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 11L11 1M11 1H1M11 1V11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                {hero.primaryCta || "Join the Waitlist"}
              </Button>
              <p className={styles.ctaSubtitle}>{hero.primaryCtaSubtitle || "Be first in line. Free early access for founding members."}</p>
            </div>
            <a
              href="#demo"
              className={styles.secondaryCta}
              onClick={() => trackLinkClick(hero.secondaryCta || 'Watch how it works (2 min)', '#demo', 'hero_secondary_cta')}
            >
              {hero.secondaryCta || "Watch how it works (2 min)"} →
            </a>
          </div>
          <div className={`${styles.badges} ${styles.heroReveal}`} style={{ animationDelay: '1.15s' }}>
            {(hero.badges || ["No credit card required", "Free plan available at launch", "Cancel anytime"]).map((badge, i) => (
              <span key={i} className={styles.badge}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
