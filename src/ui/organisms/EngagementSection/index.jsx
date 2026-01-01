"use client";

import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./EngagementSection.module.scss";

// Feature images mapped by id
const featureImages = {
  analytics: "/analytics/track_ever_%20interaction.webp",
  recordings: "/analytics/watch_clients_read.webp",
  followup: "/analytics/know_when_and_how.webp",
};

// Icons for each feature
const icons = {
  analytics: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  recordings: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  ),
  followup: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

export default function EngagementSection({ dictionary }) {
  const content = dictionary?.engagementSection || {};

  return (
    <section className={styles.section} id="engagement">
      <div className="page-shell">
        {/* Hero Split: Text Left, Video Right */}
        <div className={styles.hero}>
          <ScrollReveal className={styles.heroText}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h2 className={styles.title}>{content.title}</h2>
            <p className={styles.subtitle}>{content.subtitle}</p>
          </ScrollReveal>

          <ScrollReveal className={styles.heroVideo}>
            <div className={styles.videoWrapper}>
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/analytics/watch_clients_read.webp"
              >
                <source src="/analytics/analytics.webm" type="video/webm" />
              </video>
            </div>
          </ScrollReveal>
        </div>

        {/* Feature Cards Grid - 3 columns */}
        <ScrollReveal stagger className={styles.cardsGrid}>
          {(content.features || []).map((feature) => (
            <div key={feature.id} className={styles.card}>
              <div className={styles.cardImageWrapper}>
                <div
                  className={styles.cardImage}
                  style={{ backgroundImage: `url(${featureImages[feature.id]})` }}
                />
                <div className={styles.cardImageOverlay} />
                <div className={styles.cardIcon}>
                  {icons[feature.id]}
                </div>
                <div className={styles.cardImageContent}>
                  <span className={styles.cardLabel}>{feature.title}</span>
                  <h3 className={styles.cardTitle}>{feature.headline}</h3>
                </div>
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardBody}>{feature.body}</p>

                {feature.bullets && (
                  <ul className={styles.bullets}>
                    {feature.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {feature.insights && (
                  <div className={styles.insights}>
                    {feature.insights.map((insight, index) => (
                      <p key={index} className={styles.insight}>
                        {insight}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
