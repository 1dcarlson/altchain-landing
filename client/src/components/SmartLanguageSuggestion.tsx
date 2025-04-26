import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { useToast } from '@/hooks/use-toast';

/**
 * Component that uses AI-powered detection to suggest language changes based on browser preferences
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

  /**
   * Advanced language detection algorithm that uses multiple signals to determine
   * the most appropriate language suggestion
   */
  const detectPreferredLanguage = useCallback(() => {
    // Get user's browser languages (primary signal)
    const browserLanguages = navigator.languages || [navigator.language];
    console.log('Browser languages detected:', browserLanguages);
    
    // Get current language
    const currentLanguage = i18n.language.split('-')[0]; // Strip region code if present
    console.log('Current language:', currentLanguage);
    
    // Supported languages in the application
    const supportedLanguages = Object.keys(languageNames);
    console.log('Supported languages:', supportedLanguages);
    
    // Examine browser languages and assign weights to them
    const languageScores: Record<string, number> = {};
    
    // Process browser languages with weighted scoring
    // Primary language gets higher weight
    browserLanguages.forEach((lang, index) => {
      const simpleLang = lang.split('-')[0]; // Strip region code
      
      if (supportedLanguages.includes(simpleLang) && simpleLang !== currentLanguage) {
        // Weigh first languages higher (primary language gets 5, others get decreasing weights)
        const weight = 5 / (index + 1);
        languageScores[simpleLang] = (languageScores[simpleLang] || 0) + weight;
      }
    });

    // Add locale-based heuristics (time zone, country-specific detection)
    try {
      // Timezone-based heuristics
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Continental/regional heuristics based on timezone
      if (timeZone.includes('America') && !languageScores['en']) {
        languageScores['en'] = (languageScores['en'] || 0) + 0.5;
        languageScores['es'] = (languageScores['es'] || 0) + 0.3;
      } else if (timeZone.includes('Europe')) {
        if (timeZone.includes('Madrid') || timeZone.includes('Lisbon')) {
          languageScores['es'] = (languageScores['es'] || 0) + 0.6;
        } else if (timeZone.includes('Paris') || timeZone.includes('Brussels')) {
          languageScores['fr'] = (languageScores['fr'] || 0) + 0.6;
        } else if (timeZone.includes('Moscow')) {
          languageScores['ru'] = (languageScores['ru'] || 0) + 0.6;
        }
      } else if (timeZone.includes('Asia')) {
        if (timeZone.includes('Shanghai') || timeZone.includes('Hong_Kong') || timeZone.includes('Taipei')) {
          languageScores['zh'] = (languageScores['zh'] || 0) + 0.6;
        }
      }
    } catch (e) {
      console.log('Error analyzing timezone data:', e);
    }

    console.log('Language scores:', languageScores);
    
    // Find the language with the highest score
    let bestLanguage = null;
    let highestScore = 0;
    
    Object.entries(languageScores).forEach(([lang, score]) => {
      if (score > highestScore) {
        highestScore = score;
        bestLanguage = lang;
      }
    });
    
    // Only suggest if we have a good confidence score (above threshold)
    if (bestLanguage && highestScore >= 0.5) {
      return bestLanguage;
    }
    
    return null;
  }, []);

  useEffect(() => {
    // Check if suggestion already shown this session
    const hasSuggested = sessionStorage.getItem('language_suggested');
    if (hasSuggested) {
      console.log('Language suggestion already shown this session');
      return;
    }
    
    // Delay suggestion slightly to avoid disrupting initial page load
    const timer = setTimeout(() => {
      const preferredLanguage = detectPreferredLanguage();
      
      if (preferredLanguage) {
        setSuggestedLanguage(preferredLanguage);
        setSuggestedLanguageName(languageNames[preferredLanguage]);
        setShowSuggestion(true);
        console.log(`AI suggests switching to ${languageNames[preferredLanguage]} based on browser preferences`);
      }
      
      // Mark as suggested for this session
      sessionStorage.setItem('language_suggested', 'true');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [detectPreferredLanguage]);
  
  // This now means "stay in current language" (declining the change)
  const handleStayInCurrentLanguage = () => {
    setShowSuggestion(false);
    
    // Log the choice to stay in current language for potential analytics
    console.log(`User chose to stay in current language instead of switching to ${suggestedLanguageName}`);
  };
  
  // This now means "change to suggested language" (accepting the change)
  const handleChangeLanguage = () => {
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
  
  if (!showSuggestion) return null;
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-lg shadow-xl p-4 w-full max-w-sm z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
      {/* Blue accent bar at top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary rounded-t-lg"></div>
      
      <div className="flex items-start mt-1">
        <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
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
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {t('languageSwitch.detected', { language: suggestedLanguageName })}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {t('languageSwitch.suggestion')}
          </p>
          
          <div className="mt-4 flex space-x-3">
            <button
              type="button"
              onClick={handleStayInCurrentLanguage}
              className="flex-1 inline-flex justify-center items-center rounded-md bg-primary hover:bg-primary/90 
                px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all 
                hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              {t('languageSwitch.stayInCurrent', { language: i18n.language.split('-')[0] === 'en' ? 'English' : 
                 i18n.language.split('-')[0] === 'es' ? 'español' :
                 i18n.language.split('-')[0] === 'fr' ? 'français' :
                 i18n.language.split('-')[0] === 'zh' ? '中文' :
                 i18n.language.split('-')[0] === 'ru' ? 'русском' : 'current language' })}
            </button>
            <button
              type="button"
              onClick={handleChangeLanguage}
              className="flex-1 inline-flex justify-center items-center rounded-md bg-white dark:bg-gray-700
                px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm 
                ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
            >
              {t('languageSwitch.changeLanguage')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}