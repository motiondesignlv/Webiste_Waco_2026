"use client";

import styles from "./FeatureHighlight.module.scss";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";

// Icons matching the reference design
const defaultIcons = [
  // Speedometer/gauge icon
  <svg key="1" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1-10c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
  </svg>,
  // Brain/neural icon
  <svg key="2" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>,
  // Sun/light icon
  <svg key="3" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
  </svg>,
  // Dots/circles pattern icon
  <svg key="4" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="6" cy="6" r="3"/>
    <circle cx="18" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="18" r="3"/>
  </svg>,
];

export default function FeatureHighlight({ dictionary }) {
  const copy = dictionary?.featureHighlight || {};
  const headlineLines = copy.headline?.split('\n') || [copy.headline];

  return (
    <section className={styles.section} id="feature-highlight">
      <div className="page-shell">
        <ScrollReveal>
          <h2 className={styles.headline}>
            {headlineLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headlineLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </ScrollReveal>
        <ScrollReveal stagger className={styles.grid}>
          {(copy.cards || []).map((card, index) => (
            <div key={index} className={styles.card}>
              {card.image && (
                <div className={styles.imageWrapper}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                  <div className={styles.imageOverlay} />
                </div>
              )}
              <div className={styles.cardContent}>
                <div className={styles.iconWrap}>
                  {card.icon || defaultIcons[index] || defaultIcons[0]}
                </div>
                <div className={styles.textBlock}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
