"use client";

import { useState } from "react";
import styles from "./QuickAnswers.module.scss";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";

// FAQPage Schema component for rich results in Google
function FAQSchema({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function QuickAnswers({ dictionary }) {
  const [openIndex, setOpenIndex] = useState(null);

  const copy = dictionary?.faq || {};

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-title">
      <FAQSchema items={copy.items || []} />
      <div className="page-shell">
        <ScrollReveal className={styles.header}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 className={styles.title} id="faq-title">{copy.title}</h2>
        </ScrollReveal>

        <ScrollReveal className={styles.list} stagger>
          {(copy.items || []).map((item, i) => {
            const isOpen = openIndex === i;
            const answerId = `faq-answer-${i}`;
            return (
              <div
                key={i}
                className={`${styles.item} ${isOpen ? styles.open : ""}`}
              >
                <button
                  id={`faq-question-${i}`}
                  className={styles.question}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <span>{item.q}</span>
                  <span className={styles.icon} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  id={answerId}
                  className={styles.answer}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  hidden={!isOpen}
                  style={{ maxHeight: isOpen ? "300px" : "0" }}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
