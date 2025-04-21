import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { useToast } from '@/hooks/use-toast';

/**
 * Component that detects browser language and suggests changing language if different from current
 */
export default function SmartLanguageSuggestion() {
  const { t } = useTranslation();
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestedLanguage, setSuggestedLanguage] = useState<string | null>(null);
  const [suggestedLanguageName, setSuggestedLanguageName] = useState('');
  const { toast } = useToast();
  
  // Maps language codes to their full names
  const languageNames: Record<string, string> = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    zh: '中文',
    ru: 'Русский'
  };

  useEffect(() => {
    // For testing purposes, let's clear any previous suggestion flag
    // Comment this line out for production
    sessionStorage.removeItem('language_suggested');
    
    // Only show suggestion once per session
    const hasSuggested = sessionStorage.getItem('language_suggested');
    if (hasSuggested) {
      console.log('Language suggestion already shown this session');
      return;
    }
    
    // Get user's browser languages
    const browserLanguages = navigator.languages || [navigator.language];
    console.log('Browser languages detected:', browserLanguages);
    
    // Get current language
    const currentLanguage = i18n.language.split('-')[0]; // Strip region code if present
    console.log('Current language:', currentLanguage);
    
    // Find the first supported browser language that's not the current one
    const supportedLanguages = Object.keys(languageNames);
    console.log('Supported languages:', supportedLanguages);
    
    // For testing purposes, always suggest Spanish if current language is English
    // and vice versa. Remove this for production.
    if (currentLanguage === 'en') {
      setSuggestedLanguage('es');
      setSuggestedLanguageName(languageNames['es']);
      setShowSuggestion(true);
      console.log('Suggesting Spanish to English users for testing');
      sessionStorage.setItem('language_suggested', 'true');
      return;
    } else if (currentLanguage === 'es') {
      setSuggestedLanguage('en');
      setSuggestedLanguageName(languageNames['en']);
      setShowSuggestion(true);
      console.log('Suggesting English to Spanish users for testing');
      sessionStorage.setItem('language_suggested', 'true');
      return;
    }
    
    // Normal browser language detection flow
    for (const lang of browserLanguages) {
      const simpleLang = lang.split('-')[0]; // Strip region code
      
      if (
        supportedLanguages.includes(simpleLang) && 
        simpleLang !== currentLanguage
      ) {
        setSuggestedLanguage(simpleLang);
        setSuggestedLanguageName(languageNames[simpleLang]);
        setShowSuggestion(true);
        console.log(`Suggesting ${languageNames[simpleLang]} based on browser language`);
        break;
      }
    }
    
    // Mark as suggested for this session
    sessionStorage.setItem('language_suggested', 'true');
  }, []);
  
  const handleAccept = () => {
    if (suggestedLanguage) {
      i18n.changeLanguage(suggestedLanguage);
      
      toast({
        title: t('languageSwitch.switched', { language: suggestedLanguageName }),
        description: t('languageSwitch.confirmation'),
        duration: 3000
      });
    }
    setShowSuggestion(false);
  };
  
  const handleDecline = () => {
    setShowSuggestion(false);
  };
  
  if (!showSuggestion) return null;
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-full max-w-sm z-50 animate-fade-in-up">
      {/* Blue accent bar at top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary rounded-t-lg"></div>
      
      <div className="flex items-start mt-1">
        <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-primary" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" 
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-base font-semibold text-gray-900">
            {t('languageSwitch.detected', { language: suggestedLanguageName })}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            {t('languageSwitch.suggestion')}
          </p>
          
          <div className="mt-4 flex space-x-3">
            <button
              type="button"
              onClick={handleAccept}
              className="flex-1 inline-flex justify-center items-center rounded-md bg-primary hover:bg-primary/90 
                px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all 
                hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              {t('languageSwitch.accept')}
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="flex-1 inline-flex justify-center items-center rounded-md bg-white 
                px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm 
                ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all"
            >
              {t('languageSwitch.decline')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}