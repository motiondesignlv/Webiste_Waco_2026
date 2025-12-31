"use client";
import styles from "./NeedSelector.module.scss";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";

export default function NeedSelector({ dictionary }) {
  const copy = dictionary?.needSelector || {
    titleLeft: ["One Platform.", "Every Document.", "Total Visibility."],
    chips: ["Proposals", "Quotes", "Invoices", "Analytics", "Templates", "AI Editing"],
    titleRight: ["From send", "to seen—", "you'll know."],
    subtitle: "Watch them open. See what they read. Know when to close.",
    cta: "Join the Waitlist",
  };

  return (
    <section className={styles.section}>
      <div className={styles.bgImage} />
      <div className="page-shell">
        <div className={styles.container}>
          <ScrollReveal className={styles.left}>
            <h2 className={styles.title}>
              {copy.titleLeft.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < copy.titleLeft.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <div className={styles.chips}>
              {copy.chips.map((chip, i) => (
                <div key={i} className={styles.chip}>{chip}</div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className={styles.right}>
            <h2 className={styles.title}>
              {copy.titleRight.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < copy.titleRight.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className={styles.subtitle}>
              {copy.subtitle}
            </p>
            <div className={styles.cta}>
              <a href="#waitlist" className={styles.waitlistBtn}>
                <span>{copy.cta}</span>
                <div className={styles.iconCircle}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
