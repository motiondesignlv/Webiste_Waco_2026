"use client";

import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./ShareSection.module.scss";

// Feature images mapped by id
const featureImages = {
  links: "/delivery/tracl%20engagement.webp",
  pdf: "/delivery/profesional_Pdf.webp",
};

// Icons for features
const icons = {
  share: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  pdf: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  lock: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
};

export default function ShareSection({ dictionary }) {
  const content = dictionary?.shareSection || {};

  return (
    <section className={styles.section} id="share">
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
                poster="/delivery/profesional_Pdf.webp"
              >
                <source src="/delivery/delivery.webm" type="video/webm" />
              </video>
            </div>
          </ScrollReveal>
        </div>

        {/* Feature Cards Grid - 2 columns for delivery */}
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
                  {icons[feature.icon] || icons.share}
                </div>
                <div className={styles.cardImageContent}>
                  <span className={styles.cardLabel}>{feature.title}</span>
                  <h3 className={styles.cardTitle}>{feature.headline}</h3>
                </div>
              </div>
              <div className={styles.cardContent}>
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

        {/* Warning notice */}
        {content.warning && (
          <ScrollReveal className={styles.warning}>
            <div className={styles.warningIcon}>{icons.lock}</div>
            <div className={styles.warningContent}>
              <strong>{content.warning.title}:</strong> {content.warning.text}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
