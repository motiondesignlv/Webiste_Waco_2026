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

  const copy = dictionary?.faq || {
    eyebrow: "FAQ",
    title: "Questions? We've Got Answers.",
    items: [
      { q: "Do my clients need to create an account to view proposals?", a: "Nope. Clients click your link and see a beautiful proposal instantly. No signup, no login, no friction. They see your work; you see their engagement data." },
      { q: "Will AI-generated proposals sound generic?", a: "The AI creates a strong first draft with professional structure and persuasive language. Then you customize it with your specific project details, voice, and expertise. The result sounds like you—just faster." },
      { q: "What kind of analytics do I get?", a: "You'll see: total viewing time, time spent per section, number of views, return visits, device type (mobile/desktop), engagement score (High/Medium/Low), session recordings showing scroll behavior, and AI-generated insights about what to do next." },
      { q: "Can I still send PDFs?", a: "Absolutely. Generate professional PDFs with your branding for clients who prefer attachments. Web links give you tracking; PDFs give you flexibility. Use both." },
      { q: "Is my data secure?", a: "Yes. All data is encrypted in transit and at rest. We never share your proposals or client information with third parties. Your work stays yours." },
      { q: "Do you offer refunds?", a: "Yes. 30-day money-back guarantee, no questions asked. We're confident Waco3 will save you time and win you clients—but if it doesn't, you pay nothing." },
    ],
  };

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-title">
      <FAQSchema items={copy.items} />
      <div className="page-shell">
        <ScrollReveal className={styles.header}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 className={styles.title} id="faq-title">{copy.title}</h2>
        </ScrollReveal>

        <ScrollReveal className={styles.list} stagger>
          {copy.items.map((item, i) => {
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
