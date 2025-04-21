import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Load translations directly
import enTranslation from '../../public/locales/en/translation.json';
import esTranslation from '../../public/locales/es/translation.json';
import zhTranslation from '../../public/locales/zh/translation.json';
import frTranslation from '../../public/locales/fr/translation.json';
import ruTranslation from '../../public/locales/ru/translation.json';

// Fallback translations for any missing keys
const fallbackTranslations = {
  about: "Home",
  contact: {
    navLink: "Contact",
    title: "Contact Us",
    description: "Have questions? We'd love to hear from you!"
  },
  languageSwitch: {
    detected: "We detected your browser language is {{language}}",
    suggestion: "Would you like to switch to this language?",
    accept: "Yes, switch language",
    decline: "No, thank you",
    switched: "Switched to {{language}}",
    confirmation: "Your language preference has been saved"
  },
  hero: {
    title: "Smarter Global Sourcing with AI",
    description: "AltChain helps companies worldwide navigate the evolving landscape of trade wars, tariffs, and supply chain shifts — using AI to optimize sourcing, reduce risk, and save time."
  },
  waitlist: {
    title: "Join our waitlist",
    button: "Join Waitlist",
    namePlaceholder: "Your name (optional)",
    placeholder: "Your email address",
    submitting: "Submitting...",
    success: "Thank you for joining our waitlist!",
    successDetail: "We'll notify you when AltChain launches.",
    error: "Error",
    errorDetail: "Something went wrong. Please try again.",
    tryAgain: "Try Again",
    congratulations: "You're on the list!",
    description: "Be among the first to access AltChain's AI-powered sourcing platform."
  },
  form: {
    submit: "Submit",
    success: "Thank you for your message!",
    error: "Something went wrong. Please try again.",
    email: "Your email",
    name: "Your name",
    message: "Your message",
    subject: "Subject"
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
  detailedBenefits: {
    title: "Detailed Benefits",
    description: "AltChain provides a comprehensive solution for global sourcing challenges.",
    reducedTime: {
      title: "Reduced Time",
      description: "Save time with AI-powered sourcing recommendations.",
      items: [
        "Automated supplier discovery",
        "Quick risk assessment",
        "Streamlined compliance checks"
      ]
    },
    riskMitigation: {
      title: "Risk Mitigation",
      description: "Identify and mitigate supply chain risks proactively.",
      items: [
        "Real-time disruption alerts",
        "Alternative supplier recommendations",
        "Comprehensive risk scoring"
      ]
    },
    costSavings: {
      title: "Cost Savings",
      description: "Optimize spending and identify savings opportunities.",
      items: [
        "Total landed cost calculation",
        "Automated price benchmarking",
        "Duty and tariff optimization"
      ]
    }
  },
  benefits: {
    title: "Key Benefits",
    free: "Free for early access",
    noCard: "No credit card required",
    global: "Global coverage",
    realTime: "Real-time insights",
    aiPowered: "AI-powered recommendations",
    comprehensive: "Comprehensive supplier database",
    description: "AltChain provides a comprehensive solution for global sourcing challenges."
  },
  howItWorks: {
    title: "How It Works"
  },
  testimonials: {
    title: "What Our Users Say"
  },
  faq: {
    title: "Frequently Asked Questions"
  },
  cta: {
    title: "Ready to transform your global sourcing?",
    description: "Join our waitlist to be among the first to access AltChain.",
    button: "Join Now"
  },
  footer: {
    copyright: "© 2025 AltChain. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact"
  }
};

// Deep merge function for combining translations with fallbacks
function deepMerge(target: any, source: any) {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      result[key] = deepMerge(target[key], source[key]);
    } else if (!(key in target) || target[key] === '') {
      result[key] = source[key];
    }
  }
  
  return result;
}

// Create our resources object with merged translations
const resources = {
  en: {
    translation: deepMerge(enTranslation, fallbackTranslations)
  },
  es: {
    translation: deepMerge(esTranslation, fallbackTranslations)
  },
  zh: {
    translation: deepMerge(zhTranslation, fallbackTranslations)
  },
  fr: {
    translation: deepMerge(frTranslation, fallbackTranslations)
  },
  ru: {
    translation: deepMerge(ruTranslation, fallbackTranslations)
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