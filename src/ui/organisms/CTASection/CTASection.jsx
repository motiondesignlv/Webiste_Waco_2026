"use client";

import { useState } from "react";
import Button from "@/ui/atoms/Button/Button";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./CTASection.module.scss";

export default function CTASection({ dictionary }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [workType, setWorkType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const copy = dictionary?.finalCta || {};
  const formFields = copy.formFields || {};
  const workType_options = formFields.workType || {};
  const founderNote = copy.founderNote || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              <span className={styles.check}>✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal className={styles.formWrapper}>
          {submitted ? (
            <div className={styles.success}>
              <h3>{copy.successTitle}</h3>
              <p>{copy.successMessage}</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.inputWrapper}>
                  <label htmlFor="cta-email" className="sr-only">
                    {formFields.email}
                  </label>
                  <input
                    id="cta-email"
                    type="email"
                    placeholder={`${formFields.email} *`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label htmlFor="cta-name" className="sr-only">
                    {formFields.name}
                  </label>
                  <input
                    id="cta-name"
                    type="text"
                    placeholder={formFields.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputWrapper}>
                  <label htmlFor="cta-work-type" className="sr-only">
                    {workType_options.label}
                  </label>
                  <select
                    id="cta-work-type"
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                    className={styles.select}
                  >
                    <option value="">{workType_options.label}</option>
                    {(workType_options.options || []).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Button type="submit" variant="primary" size="lg">
                {copy.ctaLabel}
              </Button>
              <p className={styles.formNote}>{copy.formNote}</p>
            </form>
          )}
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
