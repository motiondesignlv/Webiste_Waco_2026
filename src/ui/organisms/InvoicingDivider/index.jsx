"use client";
import styles from "./InvoicingDivider.module.scss";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";

const icon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const arrowIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function InvoicingDivider({ dictionary }) {
  const content = dictionary?.invoicingDivider || {};

  return (
    <section className={styles.section} id="invoicing">
      <div className="page-shell">
        <ScrollReveal className={styles.divider}>
          <div className={styles.iconWrapper}>{icon}</div>
          <div className={styles.content}>
            <p className={styles.text}>{content.text}</p>
            <p className={styles.cta}>
              {arrowIcon}
              <span>{content.cta}</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
