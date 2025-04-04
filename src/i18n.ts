import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import language resources
import enTranslation from './locales/en/translation.json';
import ptTranslation from './locales/pt/translation.json';
import changanaTranslation from './locales/changana/translation.json';
import macuaTranslation from './locales/macua/translation.json';

// Configure i18next
i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Default language
    fallbackLng: 'pt',
    // Debug mode in development
    debug: process.env.NODE_ENV === 'development',
    // Namespace
    defaultNS: 'translation',
    // Resources
    resources: {
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
    },
    // Interpolation
    interpolation: {
      escapeValue: false // React already escapes values
    },
    // Detection options
    detection: {
      // Order of language detection
      order: ['localStorage', 'navigator'],
      // Cache user language on localStorage
      caches: ['localStorage'],
      // Look up language in the path
      lookupFromPathIndex: 0
    },
    // React options
    react: {
      useSuspense: true
    }
  });

export default i18n;
