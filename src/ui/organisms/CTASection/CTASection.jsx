"use client";

import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./CTASection.module.scss";

export default function CTASection({ dictionary }) {
  const copy = dictionary?.finalCta || {};
  const founderNote = copy.founderNote || {};

  return (
    <section className={styles.section} id="waitlist">
      <div className="page-shell">
        <ScrollReveal className={styles.header}>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </ScrollReveal>

        <ScrollReveal className={styles.benefits} stagger>
          {(copy.benefits || []).map((benefit, index) => (
            <div key={index} className={styles.benefit}>
              <span className={styles.check} aria-hidden="true">✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal className={styles.formWrapper}>
          {/* SendGrid iframe placeholder - replace src with your SendGrid signup form URL */}
          <div className={styles.iframeContainer}>
            <iframe
              src="about:blank"
              title="Newsletter signup form"
              className={styles.signupIframe}
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        {founderNote.title && (
          <ScrollReveal className={styles.founderNote}>
            <h4 className={styles.noteTitle}>{founderNote.title}</h4>
            <blockquote className={styles.noteBody}>
              {founderNote.body}
            </blockquote>
            <p className={styles.signature}>— {founderNote.signature}</p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
