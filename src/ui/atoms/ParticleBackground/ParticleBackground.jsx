'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import styles from './ParticleBackground.module.scss';

// Expanded symbols: 150+ variations including emoji icons
const SYMBOLS = [
  // Math operators
  '+', '-', '/', '*', '=', '×', '÷', '±', '≈', '≠', '≤', '≥', '<', '>',
  // Currency & percentages
  '$', '€', '£', '¥', '%', '¢', '₿',
  // Numbers & prices
  '99', '49', '19', '29', '39', '59', '79', '89',
  '1.5', '2.0', '3.5', '4.99', '9.99', '14.99', '19.99',
  '.00', '.50', '.99', '24', '15', '30', '60', '12', '7',
  '25', '10×2', '50%', '+15%', '-20%', '2x', '3x', '5x', '10x',
  // AI & tech symbols
  'AI', 'ML', 'API', 'GPT', '01', '10', '11', '00',
  '⚡', '✦', '◈', '⬡', '◉', '▣', '⊛', '⟡', '◆', '◇',
  '⬢', '⬣', '⏣', '⎔', '⌬', '⏢', '⏥', '⎊', '⌘', '⌥',
  // Arrows & directions
  '→', '←', '↑', '↓', '↗', '↘', '↙', '↖', '⟶', '⟵',
  '►', '◄', '▲', '▼', '⇒', '⇐', '⇑', '⇓',
  // Geometric shapes
  '○', '●', '□', '■', '△', '▽', '◁', '▷', '◊', '⬟',
  '⬠', '⬡', '⬢', '⬣', '⭐', '★', '☆', '✧', '✶', '✴',
  // Business & documents
  '✓', '✗', '✔', '✕', '§', '¶', '†', '‡', '©', '®', '™',
  // Brackets & special
  '{}', '[]', '()', '<>', '«»',
  // Infinity & math concepts
  '∞', 'π', 'Σ', 'Δ', 'Ω', 'λ', 'μ', '√', '∫', '∂',
  // Code & tech
  '#', '@', '&', '~', '^', '|', '`',
  '::', '//', '/*', '*/', '=>', '&&', '||',
  // Finance icons (line style)
  '⊕', '⊖', '⊗', '⊘', '⊙', '⊚', '⊛', '⊜',
  '⬒', '⬓', '⬔', '⬕', '◧', '◨', '◩', '◪',
  '⤴', '⤵', '⇗', '⇘', '⥀', '⥁',
  // Document icons (line style)
  '☐', '☑', '☒', '▭', '▯', '◳', '◲', '◱', '◰',
  '✎', '✐', '✑', '⌗', '⎙', '⎘', '⎗',
  '⊞', '⊟', '⊠', '⊡', '⧉', '⧈',
  // Math icons (line style)
  '⊕', '⊖', '⊗', '⊘', '∑', '∏', '∐', '∆',
  '⋈', '⋉', '⋊', '⋮', '⋯', '⋰', '⋱',
  // Business icons (line style)
  '⚙', '⚛', '⚑', '⚐', '☰', '☱', '☲', '☳',
  '⌂', '⌘', '⌥', '⌃', '⇧', '⎋', '⏎', '⏏',
  '✉', '☎', '⌚', '⏱', '⏲', '⧗', '⧖',
  '◎', '◉', '◈', '◇', '◆', '▣', '▢', '▤',
];

// Reduced particle count for better performance
const PARTICLE_COUNT = 40;
const MOUSE_ATTRACTION_RADIUS = 150;
const MOUSE_ATTRACTION_STRENGTH = 0.015;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

export default function ParticleBackground() {
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const tickerCallbackRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Intersection Observer to only run animation when visible
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    } else {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    }
  }, []);

  useEffect(() => {
    // Don't initialize if user prefers reduced motion or not visible
    if (prefersReducedMotion || !isVisible || !containerRef.current) return;

    let app = null;

    const initPixi = async () => {
      const { Application, Text, TextStyle } = await import('pixi.js');

      const container = containerRef.current;
      if (!container) return;

      app = new Application();

      await app.init({
        resizeTo: container,
        backgroundAlpha: 0,
        antialias: false,
        resolution: Math.min(window.devicePixelRatio || 1, 1.5),
        autoDensity: true,
        powerPreference: 'low-power',
      });

      container.appendChild(app.canvas);
      appRef.current = app;

      const textStyle = new TextStyle({
        fontFamily: 'Manrope, system-ui, sans-serif',
        fontSize: 28,
        fontWeight: '300',
        fill: '#ffffff',
      });

      const particles = [];
      const screenWidth = app.screen.width;
      const screenHeight = app.screen.height;

      // Shared wave frequency for cohesive liquid-like flow
      const sharedFrequency = 0.003;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        const text = new Text({
          text: symbol,
          style: textStyle,
        });

        // EXPLOSION: All particles start off-screen left, staggered for wave effect
        text.x = random(-screenWidth * 0.5, -20);

        // Distribute vertically across the full height
        text.y = random(screenHeight * 0.05, screenHeight * 0.95);

        // Varied scale - small to large for visual depth
        text.scale.set(random(0.06, 0.55));
        text.alpha = random(0.08, 0.22);
        text.anchor.set(0.5);

        // S-curve flow properties - shared frequency for cohesion
        text.baseY = text.y;
        text.phase = random(0, Math.PI * 2);
        text.amplitude = random(60, 120);
        text.frequency = sharedFrequency + random(-0.0005, 0.0005);

        // BURST MODE: High initial speed for explosion effect
        // Varied burst speeds for staggered arrival
        const burstTier = Math.random();
        if (burstTier < 0.25) {
          text.currentSpeed = random(8, 12); // Fastest burst
        } else if (burstTier < 0.5) {
          text.currentSpeed = random(5, 8); // Fast burst
        } else if (burstTier < 0.75) {
          text.currentSpeed = random(3, 5); // Medium burst
        } else {
          text.currentSpeed = random(1.5, 3); // Slower burst
        }

        // Target cruise speed (after friction slows them down)
        const speedTier = Math.random();
        if (speedTier < 0.2) {
          text.cruiseSpeed = random(0.05, 0.15);
        } else if (speedTier < 0.4) {
          text.cruiseSpeed = random(0.2, 0.4);
        } else if (speedTier < 0.65) {
          text.cruiseSpeed = random(0.5, 0.8);
        } else if (speedTier < 0.85) {
          text.cruiseSpeed = random(1.0, 1.6);
        } else {
          text.cruiseSpeed = random(2.0, 3.0);
        }

        // Friction coefficient - how fast they slow down
        text.friction = random(0.96, 0.985);
        // Random friction zone per particle (40-80% of screen width)
        text.frictionZone = screenWidth * random(0.4, 0.8);
        text.inBurstMode = true;

        text.vr = random(-0.0003, 0.0003);

        // Mouse interaction offsets
        text.offsetX = 0;
        text.offsetY = 0;

        app.stage.addChild(text);
        particles.push(text);
      }

      particlesRef.current = particles;

      const tickerCallback = () => {
        const mouse = mouseRef.current;

        particles.forEach((particle) => {
          // BURST MODE: Apply friction when entering the particle's friction zone
          if (particle.inBurstMode) {
            // Apply friction to slow down
            if (particle.x > particle.frictionZone) {
              particle.currentSpeed *= particle.friction;
            }

            // Transition to cruise mode when speed drops near cruise speed
            if (particle.currentSpeed <= particle.cruiseSpeed * 1.2) {
              particle.currentSpeed = particle.cruiseSpeed;
              particle.inBurstMode = false;
            }
          }

          // Horizontal flow - left to right
          particle.x += particle.currentSpeed;

          // S-curve: horizontal sine wave motion
          const wave = Math.sin(particle.x * particle.frequency + particle.phase);
          const targetY = particle.baseY + wave * particle.amplitude;

          // Smooth easing toward the wave position
          particle.y += (targetY - particle.y) * 0.08;

          // Very subtle rotation
          particle.rotation += particle.vr;

          // Mouse attraction
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < MOUSE_ATTRACTION_RADIUS && distance > 0) {
            const force = (1 - distance / MOUSE_ATTRACTION_RADIUS) * MOUSE_ATTRACTION_STRENGTH;
            particle.offsetX += dx * force;
            particle.offsetY += dy * force;
          }

          // Apply and decay mouse offsets
          particle.x += particle.offsetX;
          particle.y += particle.offsetY;
          particle.offsetX *= 0.92;
          particle.offsetY *= 0.92;

          // When particle exits right, re-enter from left with burst speed
          if (particle.x > screenWidth + 80) {
            particle.x = -80;
            // Reset to a new vertical band position
            particle.baseY = random(screenHeight * 0.1, screenHeight * 0.9);
            particle.y = particle.baseY;
            particle.phase = random(0, Math.PI * 2);
            // Reset to cruise mode (no burst on re-entry)
            particle.currentSpeed = particle.cruiseSpeed;
            particle.inBurstMode = false;
          }
        });
      };

      tickerCallbackRef.current = tickerCallback;
      app.ticker.maxFPS = 30;
      app.ticker.add(tickerCallback);

      window.addEventListener('mousemove', handleMouseMove);
    };

    initPixi();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);

      if (appRef.current) {
        if (tickerCallbackRef.current) {
          appRef.current.ticker.remove(tickerCallbackRef.current);
        }
        appRef.current.destroy(true, { children: true, texture: true });
        appRef.current = null;
      }
      particlesRef.current = [];
    };
  }, [handleMouseMove, prefersReducedMotion, isVisible]);

  // If user prefers reduced motion, render nothing
  if (prefersReducedMotion) {
    return null;
  }

  return <div ref={containerRef} className={styles.container} aria-hidden="true" />;
}
