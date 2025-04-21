import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Simple hard-coded English translations for fallback
const resources = {
  en: {
    translation: {
      about: "Home",
      hero: {
        title: "Smarter Global Sourcing with AI",
        description: "AltChain helps companies worldwide navigate the evolving landscape of trade wars, tariffs, and supply chain shifts — using AI to optimize sourcing, reduce risk, and save time."
      },
      waitlist: {
        title: "Join our waitlist",
        button: "Join Waitlist"
      },
      features: {
        title: "Why choose AltChain?",
        description: "Our AI-powered platform helps you navigate global sourcing with confidence.",
        riskAnalysis: {
          title: "Risk Analysis",
          description: "Analyze and mitigate risks in your global supply chain with AI insights.",
          tooltip: "Our AI analyzes thousands of data points to identify potential supply chain disruptions before they affect your business."
        },
        compliance: {
          title: "Compliance Management",
          description: "Stay compliant with changing trade regulations and requirements worldwide.",
          tooltip: "Automatically check compliance with international trade regulations, tariffs, and country-specific requirements."
        },
        costOptimization: {
          title: "Cost Optimization",
          description: "Identify cost-saving opportunities and optimize your sourcing strategy.",
          tooltip: "Compare suppliers, shipping routes, and total landed costs to maximize savings."
        }
      },
      benefits: {
        free: "Free for early access",
        noCard: "No credit card required"
      },
      cta: {
        title: "Ready to transform your global sourcing?",
        description: "Join our waitlist to be among the first to access AltChain.",
        button: "Join Now"
      }
    }
  }
};

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