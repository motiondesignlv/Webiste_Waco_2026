"use client";
import Image from "next/image";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./InfiniteCarousel.module.scss";

export default function InfiniteCarousel({ dictionary }) {
  const dictCopy = dictionary?.testimonials || {};
  const testimonials = dictCopy.items || [];

  return (
    <section className={styles.section} id="testimonials">
      <div className="page-shell">
        <ScrollReveal>
          <h2 className={styles.title}>{dictCopy.title}</h2>
        </ScrollReveal>
      </div>
      <div className={styles.track}>
        {/* Double the list for infinite loop effect */}
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.content}>
              <p className={styles.quote}>&quot;{t.quote}&quot;</p>
              <div className={styles.meta}>
                <Image
                  src={t.image}
                  alt={`Photo of ${t.author}`}
                  width={56}
                  height={56}
                  className={styles.avatar}
                />
                <span className={styles.author}>{t.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
