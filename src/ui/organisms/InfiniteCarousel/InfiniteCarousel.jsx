"use client";
import Image from "next/image";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./InfiniteCarousel.module.scss";

const defaultTestimonials = [
  {
    quote: "I used to spend 4-5 hours on every proposal. Now I spend 20 minutes—and they look way better. Last month I sent twice as many proposals and won 3 new clients. Waco3 paid for itself on day one.",
    author: "Marcus Chen",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    quote: "The analytics changed everything for me. I sent a proposal on Tuesday, saw the client spent 12 minutes reading it Wednesday morning, and called them that afternoon. Closed a $8,000 project on the spot. Before Waco3, I would have waited a week to follow up and probably lost it.",
    author: "Sarah Mitchell",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    quote: "I'm not a writer. Proposals were my least favorite part of freelancing. Now AI writes 90% of it and I just customize the details. My proposals actually sound professional now—not like I wrote them at midnight after finishing client work.",
    author: "James Okonkwo",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    quote: "The session recordings are wild. I watched a client re-read my pricing section three times. Knew exactly what their concern was before I even picked up the phone. That insight alone is worth the subscription.",
    author: "Elena Rodriguez",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

const defaultCopy = {
  title: "Freelancers Are Winning More Clients with Waco3",
  testimonials: defaultTestimonials,
};

export default function InfiniteCarousel({ dictionary }) {
  const dictCopy = dictionary?.testimonials;
  const copy = {
    title: dictCopy?.title || defaultCopy.title,
    testimonials: dictCopy?.items || defaultCopy.testimonials,
  };

  return (
    <section className={styles.section} id="testimonials">
      <div className="page-shell">
        <ScrollReveal>
          <h2 className={styles.title}>{copy.title}</h2>
        </ScrollReveal>
      </div>
      <div className={styles.track}>
        {/* Double the list for infinite loop effect */}
        {[...copy.testimonials, ...copy.testimonials].map((t, i) => (
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
