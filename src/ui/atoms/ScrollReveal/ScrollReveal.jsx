'use client';

import { useEffect, useRef } from 'react';

export default function ScrollReveal({
  children,
  className = '',
  stagger = false,
  threshold = 0.15,
  as: Component = 'div'
}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -180px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  const baseClass = stagger ? 'scroll-reveal-stagger' : 'scroll-reveal';

  return (
    <Component ref={ref} className={`${baseClass} ${className}`.trim()}>
      {children}
    </Component>
  );
}
