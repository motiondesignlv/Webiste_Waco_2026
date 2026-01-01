"use client";

import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./AIProposalSection.module.scss";

// Feature images mapped by id
const featureImages = {
  "ai-generation": "/howitworks/describe.webp",
  "smart-editing": "/howitworks/edit_with_ai.webp",
  "branding": "/howitworks/branding.webp",
};

// Icons for each feature
const icons = {
  "ai-generation": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  "smart-editing": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M5.636 5.636l12.728 12.728M3 12h18M5.636 18.364l12.728-12.728" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  "branding": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

export default function AIProposalSection({ dictionary }) {
  const content = dictionary?.aiProposalSection || {};

  return (
    <section className={styles.section} id="ai-proposals">
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
                poster="/howitworks/describe.webp"
              >
                <source src="/howitworks/howItWorks.webm" type="video/webm" />
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
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
