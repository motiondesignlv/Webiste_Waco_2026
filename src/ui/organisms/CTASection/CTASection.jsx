"use client";

import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./CTASection.module.scss";
 
import Button from "@/ui/atoms/Button/Button";
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
           <div className={styles.primaryCta}>
              <Button
                href="#waitlist"
                as="a"
                variant="primary"
                className={styles.button}
                trackingCategory="hero_cta"
                icon={
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 11L11 1M11 1H1M11 1V11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Start your free trial
              </Button>
          </div>
          {/* <div className={styles.iframeContainer}>
            <iframe
              src="about:blank"
              title="Newsletter signup form"
              className={styles.signupIframe}
              loading="lazy"
            />
          </div> */}
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
