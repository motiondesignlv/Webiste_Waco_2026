"use client";

import Button from "@/ui/atoms/Button/Button";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./PricingSection.module.scss";

const defaultCopy = {
  eyebrow: "Pricing",
  title: "Simple Pricing. Serious Value.",
  subtitle: "One plan with everything you need. No per-seat charges. No surprise fees.",
  everythingIncluded: "Everything included:",
  annualPrefix: "or",
  plan: {
    name: "Pro Plan",
    price: "$19",
    period: "month",
    annual: "$190/year",
    annualSaving: "save $38",
    foundingPrice: "$15",
    foundingNote: "Lock in founding member pricing: $15/month forever",
    ctaLabel: "Join the Waitlist",
    features: [
      "Unlimited proposals, quotes, invoices",
      "AI document generation",
      "AI text editing & improvement",
      "Full client engagement analytics",
      "Session recordings",
      "AI follow-up recommendations",
      "Custom branding",
      "Professional PDF exports",
      "Template library",
      "Priority support",
    ],
  },
  valueComparison: {
    title: "Waco3 costs less than one hour of your time—and saves you 15+.",
    headers: ["If you value your time at...", "Waco3 saves you...", "Monthly ROI"],
    rows: [
      { rate: "$50/hour", savings: "15+ hours/month", value: "$750+ value" },
      { rate: "$75/hour", savings: "15+ hours/month", value: "$1,125+ value" },
      { rate: "$100/hour", savings: "15+ hours/month", value: "$1,500+ value" },
    ],
  },
  guarantee: {
    title: "30-Day Money-Back Guarantee",
    body: "Try Waco3 risk-free. If it doesn't save you time and help you win clients, we'll refund every penny. No questions asked.",
  },
};

export default function PricingSection({ dictionary }) {
  const dictCopy = dictionary?.pricing;
  const copy = {
    eyebrow: dictCopy?.eyebrow || defaultCopy.eyebrow,
    title: dictCopy?.title || defaultCopy.title,
    subtitle: dictCopy?.subtitle || defaultCopy.subtitle,
    everythingIncluded: dictCopy?.everythingIncluded || defaultCopy.everythingIncluded,
    annualPrefix: dictCopy?.annualPrefix || defaultCopy.annualPrefix,
    plan: dictCopy?.plan || defaultCopy.plan,
    valueComparison: dictCopy?.valueComparison || defaultCopy.valueComparison,
    guarantee: dictCopy?.guarantee || defaultCopy.guarantee,
  };

  const plan = copy.plan;
  const valueComparison = copy.valueComparison;
  const headers = valueComparison.headers || defaultCopy.valueComparison.headers;
  const guarantee = copy.guarantee;

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
            {plan.features.map((item) => (
              <div key={item} className={styles.feature}>
                <span className={styles.check}>✓</span>
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

        <ScrollReveal className={styles.valueSection}>
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
        </ScrollReveal>
      </div>
    </section>
  );
}
