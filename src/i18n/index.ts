import { createInstance, type i18n as I18n } from "i18next";
import { initReactI18next } from "react-i18next";
import { en, he } from "./locales";

export const LANGS = ["en", "he"] as const;
export type Lang = (typeof LANGS)[number];
export const LANG_COOKIE = "dentaloffers-lang";

export function normalizeLang(value: string | undefined | null): Lang {
  return value === "he" ? "he" : "en";
}

export const dirOf = (lng: string) => (lng === "he" ? "rtl" : "ltr");

/** A fresh, already-initialised instance per render tree (never share one across server requests). */
export function createI18n(lng: Lang): I18n {
  const instance = createInstance();
  instance.use(initReactI18next).init({
    resources: { en: { translation: en }, he: { translation: he } },
    lng,
    fallbackLng: "en",
    supportedLngs: [...LANGS],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return instance;
}
