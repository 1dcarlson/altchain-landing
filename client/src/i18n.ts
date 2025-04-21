import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Comprehensive hard-coded English translations for fallback
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
        button: "Join Waitlist",
        success: "Thank you for joining our waitlist!",
        placeholder: {
          name: "Your name (optional)",
          email: "Your email address"
        },
        error: {
          generic: "Something went wrong. Please try again.",
          email: "Please enter a valid email address.",
          name: "Name must be at least 2 characters if provided."
        }
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
      benefits: {
        title: "Detailed Benefits",
        free: "Free for early access",
        noCard: "No credit card required",
        global: "Global coverage",
        realTime: "Real-time insights",
        aiPowered: "AI-powered recommendations",
        comprehensive: "Comprehensive supplier database",
        description: "AltChain provides a comprehensive solution for global sourcing challenges."
      },
      howItWorks: {
        title: "How It Works",
        step1: {
          title: "Sign Up",
          description: "Join our platform and set up your company profile in minutes."
        },
        step2: {
          title: "Define Requirements",
          description: "Specify your sourcing needs and constraints."
        },
        step3: {
          title: "Get Recommendations",
          description: "Receive AI-powered supplier recommendations and risk assessments."
        },
        step4: {
          title: "Make Decisions",
          description: "Choose optimal suppliers based on comprehensive data."
        }
      },
      testimonials: {
        title: "What Our Users Say"
      },
      faq: {
        title: "Frequently Asked Questions",
        q1: {
          question: "What makes AltChain different?",
          answer: "AltChain combines AI technology with global trade expertise to provide actionable insights, not just data."
        },
        q2: {
          question: "Is my data secure?",
          answer: "Yes, we implement enterprise-grade security measures and never share your data with third parties."
        },
        q3: {
          question: "How much does it cost?",
          answer: "Early access users get premium features for free. After launch, we'll offer flexible pricing tiers."
        }
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