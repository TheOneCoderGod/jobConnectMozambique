// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 1) Import your JSON resources
import enTranslation from './locales/en/translation.json';
import ptTranslation from './locales/pt/translation.json';
import changanaTranslation from './locales/changana/translation.json';
import macuaTranslation from './locales/macua/translation.json';

// 2) Strongly-typed resources (note the `as const`)
export const resources = {
  en: {
    translation: enTranslation
  },
  pt: {
    translation: ptTranslation
  },
  changana: {
    translation: changanaTranslation
  },
  macua: {
    translation: macuaTranslation
  }
} as const;

// 3) Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    defaultNS: 'translation', // If all keys are under "translation"
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
