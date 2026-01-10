"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Button from "@/ui/atoms/Button/Button";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./HowItWorks.module.scss";

const xrayImages = [
  { src: "/xray/brain01.jpg", alt: "Brain scan visualization showing AI analysis" },
  { src: "/xray/brain02.jpg", alt: "Neural network pattern analysis" },
  { src: "/xray/brain03.jpg", alt: "AI-powered document processing visualization" },
  { src: "/xray/brain04.jpg", alt: "Proposal structure X-ray view" },
];

export default function HowItWorks({ dictionary }) {
  const copy = dictionary?.howItWorks || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Don't auto-rotate if user prefers reduced motion or if paused
    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % xrayImages.length);
        setTimeout(() => setIsTransitioning(false), 150);
      }, 150);
    }, 4000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, isPaused]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  return (
    <section className={styles.section} id="how-it-works">
      {/* Image carousel on the right */}
      <div
        className={styles.imageCarousel}
        role="region"
        aria-label="Image carousel showing AI analysis visualizations"
        aria-live="polite"
      >
        {xrayImages.map((image, index) => (
          <div
            key={image.src}
            className={`${styles.carouselImage} ${index === currentIndex ? styles.active : ""} ${isTransitioning && !prefersReducedMotion ? styles.glitch : ""}`}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="60vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority={index === 0}
            />
          </div>
        ))}
        <div className={styles.imageOverlay} aria-hidden="true" />

        {/* Pause/Play button for accessibility */}
        <button
          type="button"
          className={styles.carouselControl}
          onClick={togglePause}
          aria-label={isPaused ? "Play carousel" : "Pause carousel"}
        >
          {isPaused ? "▶" : "❚❚"}
        </button>
      </div>

      <div className="page-shell">
        <ScrollReveal className={styles.header}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </ScrollReveal>

        <ScrollReveal stagger className={styles.timeline}>
          {(copy.steps || []).map((step, index) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>
                <span>{step.number}</span>
                {index < (copy.steps || []).length - 1 && <div className={styles.connector} aria-hidden="true" />}
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
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
