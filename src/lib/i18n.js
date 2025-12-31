import en from "@/messages/en.json";
import es from "@/messages/es.json";

export const locales = ["en", "es"];
export const defaultLocale = "en";

const dictionaries = {
  en,
  es,
};

export function getDictionary(locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
