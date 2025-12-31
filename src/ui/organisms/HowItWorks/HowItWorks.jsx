"use client";

import Button from "@/ui/atoms/Button/Button";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./HowItWorks.module.scss";

const defaultCopy = {
  eyebrow: "Solution",
  title: "AI-Powered Proposals with X-Ray Vision",
  subtitle: "Create professional proposals in minutes. See exactly how clients engage with them. Follow up at the perfect moment.",
  steps: [
    { number: 1, title: "Tell AI What You Need", body: "\"Create a proposal for a WordPress e-commerce site with 20 products, payment integration, and mobile optimization for a boutique clothing brand.\"", description: "Waco3's AI understands your project and generates a complete proposal—with scope, timeline, pricing, and terms—in under 60 seconds." },
    { number: 2, title: "Make It Yours", body: "Customize anything. Select text and ask AI to \"make this more persuasive\" or \"add technical details.\" Your brand colors, logo, and style are applied automatically.", description: "Your voice. Your brand. Zero design skills required." },
    { number: 3, title: "Send & Track", body: "Share a beautiful web link (or PDF). The moment your client opens it, you'll know. See which sections they read, how long they spent, and get AI-powered follow-up recommendations.", description: "Never wonder \"did they see it?\" again." },
  ],
  cta: "Join the Waitlist",
  ctaSubtitle: "Get early access and lock in founding member pricing.",
};

export default function HowItWorks({ dictionary }) {
  const dictCopy = dictionary?.howItWorks;
  const copy = {
    eyebrow: dictCopy?.eyebrow || defaultCopy.eyebrow,
    title: dictCopy?.title || defaultCopy.title,
    subtitle: dictCopy?.subtitle || defaultCopy.subtitle,
    steps: dictCopy?.steps || defaultCopy.steps,
    cta: dictCopy?.cta || defaultCopy.cta,
    ctaSubtitle: dictCopy?.ctaSubtitle || defaultCopy.ctaSubtitle,
  };

  return (
    <section className={styles.section} id="how-it-works">
      <div className="page-shell">
        <ScrollReveal className={styles.header}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </ScrollReveal>

        <ScrollReveal stagger className={styles.timeline}>
          {copy.steps.map((step, index) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>
                <span>{step.number}</span>
                {index < copy.steps.length - 1 && <div className={styles.connector} />}
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal className={styles.cta}>
          <Button
            href="#waitlist"
            as="a"
            variant="primary"
            size="lg"
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          >
            {copy.cta}
          </Button>
          <p className={styles.ctaSubtitle}>{copy.ctaSubtitle}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
