'use client';

import { useEffect, useRef, memo } from 'react';

// Shared observer pool - one observer per unique threshold value
const observerPool = new Map();
const elementCallbacks = new WeakMap();

function getSharedObserver(threshold, rootMargin) {
  const key = `${threshold}-${rootMargin}`;

  if (!observerPool.has(key)) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = elementCallbacks.get(entry.target);
            if (callback) {
              callback();
              observer.unobserve(entry.target);
              elementCallbacks.delete(entry.target);
            }
          }
        });
      },
      { threshold, rootMargin }
    );
    observerPool.set(key, observer);
  }

  return observerPool.get(key);
}

const ScrollReveal = memo(function ScrollReveal({
  children,
  className = '',
  stagger = false,
  threshold = 0.15,
  as: Component = 'div',
  ...rest
}) {
  const ref = useRef(null);
  const rootMargin = '0px 0px -180px 0px';

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      element.classList.add('visible');
      return;
    }

    const observer = getSharedObserver(threshold, rootMargin);

    // Store callback in WeakMap for this element
    elementCallbacks.set(element, () => {
      element.classList.add('visible');
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      elementCallbacks.delete(element);
    };
  }, [threshold, rootMargin]);

  const baseClass = stagger ? 'scroll-reveal-stagger' : 'scroll-reveal';

  return (
    <Component ref={ref} className={`${baseClass} ${className}`.trim()} {...rest}>
      {children}
    </Component>
  );
});

export default ScrollReveal;
