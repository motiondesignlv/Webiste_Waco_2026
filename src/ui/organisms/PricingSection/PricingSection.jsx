"use client";

import Button from "@/ui/atoms/Button/Button";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./PricingSection.module.scss";

export default function PricingSection({ dictionary }) {
  const copy = dictionary?.pricing || {};
  const plan = copy.plan || {};
  const valueComparison = copy.valueComparison || {};
  const headers = valueComparison.headers || [];
  const guarantee = copy.guarantee || {};

  return (
    <section className={styles.section} id="pricing">
      <div className="page-shell">
        <ScrollReveal className={styles.header}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </ScrollReveal>

        <ScrollReveal className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.planName}>{plan.name}</span>
            <div className={styles.priceRow}>
              <h3 className={styles.price}>
                {plan.price}<span className={styles.period}>/{plan.period}</span>
              </h3>
              <span className={styles.annual}>{copy.annualPrefix} {plan.annual} ({plan.annualSaving})</span>
            </div>
          </div>

          <div className={styles.everything}>{copy.everythingIncluded}</div>

          <div className={styles.features}>
            {(plan.features || []).map((item) => (
              <div key={item} className={styles.feature}>
                <span className={styles.check} aria-hidden="true">✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className={styles.cta}>
            <Button as="a" href="#waitlist" variant="primary" size="lg">
              {plan.ctaLabel}
            </Button>
            <p className={styles.founding}>
              {plan.foundingNote}
            </p>
          </div>
        </ScrollReveal>

        {/* <ScrollReveal className={styles.valueSection}>
          <h4 className={styles.valueTitle}>{valueComparison.title}</h4>
          <div className={styles.valueTable}>
            <div className={styles.valueHeader}>
              <span>{headers[0]}</span>
              <span>{headers[1]}</span>
              <span>{headers[2]}</span>
            </div>
            {valueComparison.rows.map((row, index) => (
              <div key={index} className={styles.valueRow}>
                <span>{row.rate}</span>
                <span>{row.savings}</span>
                <span className={styles.valueHighlight}>{row.value}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className={styles.guarantee}>
          <div className={styles.guaranteeIcon}>🛡️</div>
          <div className={styles.guaranteeContent}>
            <h4>{guarantee.title}</h4>
            <p>{guarantee.body}</p>
          </div>
        </ScrollReveal> */}
      </div>
    </section>
  );
}
