"use client";

import styles from "./FeatureHighlight.module.scss";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";

// Default icons for placeholders
const defaultIcons = [
  // Speedometer icon
  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
    <path d="M12 6v6l4 2"/>
  </svg>,
  // Brain icon
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54"/>
  </svg>,
  // Target icon
  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>,
  // Pulse/chart icon
  <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>,
];

export default function FeatureHighlight({ dictionary }) {
  const copy = dictionary?.featureHighlight || {
    headline: "Anyone. Anywhere. Proposals in Minutes.",
    cards: [
      { title: "No More Waiting", description: "Get actionable proposals in minutes — no templates, no delays." },
      { title: "Smarter Than Guesswork", description: "We analyze client engagement to predict what matters most — clearly and intelligently." },
      { title: "Tailored to You", description: "Every proposal adapts to your brand and client — not generic templates." },
      { title: "Always-On Awareness", description: "With each view, patterns emerge. You see what's changing — and why it matters." },
    ],
  };

  return (
    <section className="section" id="feature-highlight">
      <div className="page-shell">
        <ScrollReveal>
          <h2 className={styles.headline}>{copy.headline}</h2>
        </ScrollReveal>
        <ScrollReveal stagger className={styles.grid}>
          {copy.cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrap}>
                {card.icon || defaultIcons[index] || defaultIcons[0]}
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.description}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
