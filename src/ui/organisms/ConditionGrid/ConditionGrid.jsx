"use client";
import styles from "./ConditionGrid.module.scss";
import Button from "@/ui/atoms/Button/Button";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";

export default function ConditionGrid({ dictionary }) {
  const copy = dictionary?.conditionGrid || {};
  const title = copy.title || [];

  return (
    <section className={styles.section} id="conditions">
      <div className="page-shell">
        <ScrollReveal className={styles.header}>
          <h2 className={styles.title}>
            {title[0]}<br />
            {title[1]}
          </h2>
          <div className={styles.cta}>
            <Button as="a" href="#waitlist" variant="primary" className={styles.button} icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }>
              {copy.cta}
            </Button>
          </div>
        </ScrollReveal>

        {/* <ScrollReveal className={styles.grid} stagger>
          {copy.categories.map((cat, i) => (
            <div key={i} className={styles.column}>
              <h3 className={styles.catTitle}>{cat.title}</h3>
              <ul className={styles.list}>
                {cat.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal>
          <p className={styles.footnote}>
            {copy.footnote}
          </p>
        </ScrollReveal> */}
      </div>
    </section>
  );
}
