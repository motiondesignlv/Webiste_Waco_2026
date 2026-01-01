"use client";

import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./ProblemSection.module.scss";

export default function ProblemSection({ dictionary }) {
  const copy = dictionary?.problemAgitation || {};

  return (
    <section className={styles.section} id="problem">
      <div className="page-shell">
        <ScrollReveal>
          <h2 className={styles.title}>{copy.title}</h2>
        </ScrollReveal>

        <ScrollReveal stagger className={styles.grid}>
          {(copy.painPoints || []).map((point, index) => (
            <div
              key={index}
              className={styles.card}
              style={{
                backgroundImage: point.image ? `url(${point.image})` : undefined,
              }}
            >
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <div className={styles.statBlock}>
                  <span className={styles.statNumber}>{point.stat}</span>
                  {point.statUnit && (
                    <span className={styles.statUnit}>{point.statUnit}</span>
                  )}
                </div>
                <h3 className={styles.cardTitle}>{point.title}</h3>
                <p className={styles.statLabel}>{point.statLabel}</p>
                <p className={styles.body}>{point.body}</p>
              </div>
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
