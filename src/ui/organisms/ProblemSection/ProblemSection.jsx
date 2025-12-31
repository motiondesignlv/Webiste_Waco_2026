"use client";

import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./ProblemSection.module.scss";

const defaultIcons = [
  <svg key="clock" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>,
  <svg key="inbox" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>,
  <svg key="dice" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    <circle cx="16" cy="8" r="1.5" fill="currentColor" />
    <circle cx="8" cy="16" r="1.5" fill="currentColor" />
    <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>,
];

const defaultCopy = {
  title: "Sound Familiar?",
  painPoints: [
    { title: "The Time Drain", stat: "4+ hours per proposal", body: "You're a developer, not a copywriter. But every new project means hours of writing, formatting, and designing proposals in Word or Canva. That's unpaid time you'll never get back." },
    { title: "The Black Hole", stat: "Send and... pray?", body: "You hit send on a proposal you spent hours perfecting. Then nothing. No reply. No rejection. Just silence. Did they even open it? You have no idea." },
    { title: "The Guessing Game", stat: "When should I follow up?", body: "Too early feels pushy. Too late and they've moved on. Without knowing if they've read your proposal—or what caught their attention—you're just guessing." },
  ],
  closingStatement: "The average freelancer spends 20+ hours per month on proposals. That's 2-3 billable projects worth of time—wasted on paperwork and wondering.",
  closingCta: "There's a better way.",
};

export default function ProblemSection({ dictionary }) {
  const dictCopy = dictionary?.problemAgitation;
  const copy = {
    title: dictCopy?.title || defaultCopy.title,
    painPoints: dictCopy?.painPoints || defaultCopy.painPoints,
    closingStatement: dictCopy?.closingStatement || defaultCopy.closingStatement,
    closingCta: dictCopy?.closingCta || defaultCopy.closingCta,
  };

  return (
    <section className={styles.section} id="problem">
      <div className="page-shell">
        <ScrollReveal>
          <h2 className={styles.title}>{copy.title}</h2>
        </ScrollReveal>

        <ScrollReveal stagger className={styles.grid}>
          {copy.painPoints.map((point, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>{defaultIcons[index] || defaultIcons[0]}</div>
              <h3 className={styles.cardTitle}>{point.title}</h3>
              <p className={styles.stat}>{point.stat}</p>
              <p className={styles.body}>{point.body}</p>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal className={styles.closing}>
          <p className={styles.closingText}>{copy.closingStatement}</p>
          <p className={styles.closingCta}>{copy.closingCta} ↓</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
