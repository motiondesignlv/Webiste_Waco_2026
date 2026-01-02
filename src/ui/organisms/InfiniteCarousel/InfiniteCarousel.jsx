"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./InfiniteCarousel.module.scss";

const TestimonialCard = memo(function TestimonialCard({ testimonial }) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <p className={styles.quote}>&quot;{testimonial.quote}&quot;</p>
        <div className={styles.meta}>
          <Image
            src={testimonial.image}
            alt={`Photo of ${testimonial.author}`}
            width={56}
            height={56}
            className={styles.avatar}
          />
          <span className={styles.author}>{testimonial.author}</span>
        </div>
      </div>
    </div>
  );
});

const InfiniteCarousel = memo(function InfiniteCarousel({ dictionary }) {
  const dictCopy = dictionary?.testimonials || {};

  // Memoize the doubled array to prevent recreation on every render
  const doubledTestimonials = useMemo(() => {
    const items = dictCopy.items || [];
    return items.flatMap((t, originalIndex) => [
      { ...t, instanceId: `first-${originalIndex}` },
      { ...t, instanceId: `second-${originalIndex}` }
    ]);
  }, [dictCopy.items]);

  return (
    <section className={styles.section} id="testimonials">
      <div className="page-shell">
        <ScrollReveal>
          <h2 className={styles.title}>{dictCopy.title}</h2>
        </ScrollReveal>
      </div>
      <div className={styles.track} aria-label="Testimonials carousel">
        {doubledTestimonials.map((t) => (
          <TestimonialCard
            key={t.instanceId}
            testimonial={t}
          />
        ))}
      </div>
    </section>
  );
});

export default InfiniteCarousel;
