"use client";

import { useState } from "react";
import Button from "@/ui/atoms/Button/Button";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./CTASection.module.scss";

const defaultCopy = {
  title: "Ready to Send Smarter Proposals?",
  subtitle: "Be first to access AI-powered proposals with built-in client intelligence. Early supporters get founding member pricing — locked in forever.",
  benefits: [
    "Create proposals in minutes, not hours",
    "Know exactly when clients read them",
    "Follow up at the perfect moment",
    "Win more clients with less effort",
  ],
  ctaLabel: "Join the Waitlist",
  formFields: {
    email: "Email address",
    name: "First name (optional)",
    workType: {
      label: "What type of work do you do?",
      options: ["Web Development", "Design", "Marketing", "Consulting", "Photography", "Architecture", "Other"],
    },
  },
  formNote: "No spam. Just early access news and founding member perks.",
  successTitle: "Thanks for joining!",
  successMessage: "We'll be in touch with early access news and founding member perks.",
  founderNote: {
    title: "A note from the founder:",
    body: "\"I built Waco3 because I was tired of spending Sunday nights writing proposals instead of spending time with my family. I was tired of wondering if clients even read the work I put into them. I was tired of guessing when to follow up.\n\nIf you're a freelancer who feels the same way, I built this for you. Join the waitlist and let's change how creative professionals win clients.\"",
    signature: "[Founder Name]",
  },
};

export default function CTASection({ dictionary }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [workType, setWorkType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const dictCopy = dictionary?.finalCta;
  const copy = {
    title: dictCopy?.title || defaultCopy.title,
    subtitle: dictCopy?.subtitle || defaultCopy.subtitle,
    benefits: dictCopy?.benefits || defaultCopy.benefits,
    ctaLabel: dictCopy?.ctaLabel || defaultCopy.ctaLabel,
    formFields: dictCopy?.formFields || defaultCopy.formFields,
    formNote: dictCopy?.formNote || defaultCopy.formNote,
    successTitle: dictCopy?.successTitle || defaultCopy.successTitle,
    successMessage: dictCopy?.successMessage || defaultCopy.successMessage,
    founderNote: dictCopy?.founderNote || defaultCopy.founderNote,
  };

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
          {copy.benefits.map((benefit, index) => (
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
                    {copy.formFields.email}
                  </label>
                  <input
                    id="cta-email"
                    type="email"
                    placeholder={`${copy.formFields.email} *`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label htmlFor="cta-name" className="sr-only">
                    {copy.formFields.name}
                  </label>
                  <input
                    id="cta-name"
                    type="text"
                    placeholder={copy.formFields.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputWrapper}>
                  <label htmlFor="cta-work-type" className="sr-only">
                    {copy.formFields.workType.label}
                  </label>
                  <select
                    id="cta-work-type"
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                    className={styles.select}
                  >
                    <option value="">{copy.formFields.workType.label}</option>
                    {copy.formFields.workType.options.map((type) => (
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

        <ScrollReveal className={styles.founderNote}>
          <h4 className={styles.noteTitle}>{copy.founderNote.title}</h4>
          <blockquote className={styles.noteBody}>
            {copy.founderNote.body}
          </blockquote>
          <p className={styles.signature}>— {copy.founderNote.signature}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
