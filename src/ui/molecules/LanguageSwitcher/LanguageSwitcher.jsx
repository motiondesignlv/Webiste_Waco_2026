"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/lib/LocaleProvider";
import styles from "./LanguageSwitcher.module.scss";

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSetLocale = (nextLocale) => {
    setLocale(nextLocale);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.switcher} ref={dropdownRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <GlobeIcon />
        <span className={styles.currentLang}>{locale.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button
            type="button"
            className={`${styles.option} ${locale === "en" ? styles.active : ""}`}
            onClick={() => handleSetLocale("en")}
          >
            <span>English</span>
            <span className={styles.code}>EN</span>
          </button>
          <button
            type="button"
            className={`${styles.option} ${locale === "es" ? styles.active : ""}`}
            onClick={() => handleSetLocale("es")}
          >
            <span>Español</span>
            <span className={styles.code}>ES</span>
          </button>
        </div>
      )}
    </div>
  );
}
