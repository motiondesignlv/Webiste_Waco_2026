import en from "@/messages/en.js";
import es from "@/messages/es.js";

export const locales = ["en", "es"];
export const defaultLocale = "en";

const dictionaries = {
  en,
  es,
};

export function getDictionary(locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
