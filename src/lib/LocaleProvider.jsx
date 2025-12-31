"use client";

import { createContext, useContext, useState, useEffect } from "react";
import en from "@/messages/en.js";
import es from "@/messages/es.js";

const dictionaries = { en, es };
const defaultLocale = "en";
const supportedLocales = ["en", "es"];

const LocaleContext = createContext({
  locale: defaultLocale,
  dictionary: dictionaries[defaultLocale],
  setLocale: () => {},
});

export function useLocale() {
  return useContext(LocaleContext);
}

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLocale = getCookie("lang");
    if (savedLocale && supportedLocales.includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale) => {
    if (supportedLocales.includes(newLocale)) {
      document.cookie = `lang=${newLocale}; path=/; max-age=31536000; samesite=lax`;
      setLocaleState(newLocale);
    }
  };

  const dictionary = dictionaries[locale] || dictionaries[defaultLocale];

  // Prevent hydration mismatch by rendering with default locale until mounted
  const value = {
    locale: mounted ? locale : defaultLocale,
    dictionary: mounted ? dictionary : dictionaries[defaultLocale],
    setLocale,
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
