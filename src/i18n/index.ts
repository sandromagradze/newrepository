import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "../locales/en/translation.json";
import ka from "../locales/ka/translation.json";

export const SUPPORTED_LANGUAGES = [
  { code: "ka", labelKey: "languages.geo" },
  { code: "en", labelKey: "languages.eng" },
] as const;

export type SupportedLanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ka: { translation: ka },
      en: { translation: en },
    },
    fallbackLng: "ka",
    supportedLngs: ["ka", "en"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "ipn-language",
    },
  });

export default i18n;
