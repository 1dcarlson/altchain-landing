import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Load English translation directly - required for initial render
import enTranslation from '../../public/locales/en/translation.json';

// Define interface for resources type safety
interface Resources {
  [key: string]: {
    translation: any;
  };
}

// Create a resources object with English as the default
const resources: Resources = {
  en: {
    translation: enTranslation
  }
};

// Load other translations on demand to improve initial load time
const loadTranslations = async () => {
  try {
    // Using dynamic imports to load other translations in parallel
    const [esModule, zhModule, frModule, ruModule] = await Promise.all([
      import('../../public/locales/es/translation.json'),
      import('../../public/locales/zh/translation.json'),
      import('../../public/locales/fr/translation.json'),
      import('../../public/locales/ru/translation.json')
    ]);
    
    // Add translations to resources after they're loaded
    resources['es'] = { translation: esModule.default };
    resources['zh'] = { translation: zhModule.default };
    resources['fr'] = { translation: frModule.default };
    resources['ru'] = { translation: ruModule.default };
    
    // Notify i18next that resources have changed
    if (i18n.isInitialized) {
      Object.keys(resources).forEach(lng => {
        i18n.addResourceBundle(lng, 'translation', resources[lng].translation, true, true);
      });
    }
  } catch (error) {
    console.error('Failed to load translations:', error);
  }
};

// Start loading other translations in the background
loadTranslations();

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // Options for language detection
    detection: {
      order: ['navigator', 'querystring', 'cookie', 'localStorage', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    },
    
    // Namespaces configuration
    ns: ['translation'],
    defaultNS: 'translation',

    react: {
      useSuspense: false, // Set to false to avoid issues with suspense
    },
  });

export default i18n;