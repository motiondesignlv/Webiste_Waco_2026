"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "@/lib/LocaleProvider";
import styles from "./LanguageSwitcher.module.scss";

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const LOCALES = [
  { code: "en", labelKey: "english", fallback: "English" },
  { code: "es", labelKey: "spanish", fallback: "Español" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale, dictionary } = useLocale();
  const lang = dictionary?.language || {};
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);

  const handleSetLocale = useCallback((nextLocale) => {
    setLocale(nextLocale);
    setIsOpen(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  }, [setLocale]);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
    setFocusedIndex(-1);
  }, []);

  // Close on Escape and handle Arrow key navigation
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) {
      // Open on ArrowDown or Enter when closed
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % LOCALES.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex(prev => (prev - 1 + LOCALES.length) % LOCALES.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleSetLocale(LOCALES[focusedIndex].code);
        }
        break;
      case "Tab":
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      default:
        break;
    }
  }, [isOpen, focusedIndex, handleSetLocale]);

  // Focus the correct option when focusedIndex changes
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex].focus();
    }
  }, [focusedIndex, isOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.switcher} ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={handleToggle}
        aria-label={lang.label || "Select language"}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <GlobeIcon />
        <span className={styles.currentLang}>{locale.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox" aria-label="Language options">
          {LOCALES.map((loc, index) => (
            <button
              key={loc.code}
              ref={el => optionRefs.current[index] = el}
              type="button"
              role="option"
              aria-selected={locale === loc.code}
              className={`${styles.option} ${locale === loc.code ? styles.active : ""} ${focusedIndex === index ? styles.focused : ""}`}
              onClick={() => handleSetLocale(loc.code)}
              tabIndex={focusedIndex === index ? 0 : -1}
            >
              <span>{lang[loc.labelKey] || loc.fallback}</span>
              <span className={styles.code}>{loc.code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
