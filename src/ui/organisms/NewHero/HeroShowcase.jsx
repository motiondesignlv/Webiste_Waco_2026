"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import styles from "./HeroShowcase.module.scss";

const IMAGES = [
  { src: "/heroImg/01.webp", alt: "Waco app - Content boosters selection" },
  { src: "/heroImg/02.webp", alt: "Waco app - Full modal view" },
  { src: "/heroImg/03.webp", alt: "Waco app - Content optimization" },
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds per slide

export default function HeroShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
    if (!isPlaying) {
      startTimeRef.current = Date.now() - (progress / 100) * AUTOPLAY_INTERVAL;
    }
  }, [isPlaying, progress]);

  // Autoplay and progress animation
  useEffect(() => {
    if (!isPlaying) return;

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        nextSlide();
      } else {
        progressRef.current = requestAnimationFrame(animate);
      }
    };

    progressRef.current = requestAnimationFrame(animate);

    return () => {
      if (progressRef.current) {
        cancelAnimationFrame(progressRef.current);
      }
    };
  }, [isPlaying, currentIndex, nextSlide]);

  return (
    <div className={styles.showcase}>
      {/* Glow effect behind the device */}
      <div className={styles.glowOrb} />

      {/* Device frame */}
      <div className={styles.deviceFrame}>
        <div className={styles.deviceHeader}>
          <div className={styles.deviceDots}>
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* Image container with transitions */}
        <div className={styles.imageContainer}>
          {IMAGES.map((image, index) => (
            <div
              key={index}
              className={`${styles.slide} ${index === currentIndex ? styles.active : ""}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
                quality={90}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        {/* Play/Pause button */}
        <button
          className={styles.playPauseBtn}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
              <rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 1.5V12.5L12 7L3 1.5Z" fill="currentColor" />
            </svg>
          )}
        </button>

        {/* Progress indicators */}
        <div className={styles.indicators}>
          {IMAGES.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.active : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            >
              <span
                className={styles.indicatorProgress}
                style={{
                  transform: `scaleX(${index === currentIndex ? progress / 100 : index < currentIndex ? 1 : 0})`,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
