import { useTheme } from '@/hooks/theme-provider';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export default function TimeThemeIndicator() {
  const { colors, timeTheme, isDark } = useTheme();
  const { t } = useTranslation();
  
  // Icons for different times of day - memoized to prevent re-renders
  const icon = useMemo(() => {
    switch (timeTheme) {
      case 'morning':
        return (
          <svg className="w-5 h-5 mr-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        );
      case 'day':
        return (
          <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        );
      case 'evening':
        return (
          <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        );
      case 'night':
        return (
          <svg className="w-5 h-5 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        );
      default:
        return null;
    }
  }, [timeTheme]);
  
  // Get time theme text - memoized to prevent re-renders
  const timeThemeText = useMemo(() => {
    switch (timeTheme) {
      case 'morning':
        return t('timeTheme.morning');
      case 'day':
        return t('timeTheme.day');
      case 'evening':
        return t('timeTheme.evening');
      case 'night':
        return t('timeTheme.night');
      default:
        return '';
    }
  }, [timeTheme, t]);
  
  // Get container styles - memoized to prevent re-renders
  const containerStyles = useMemo(() => {
    return `
      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
      ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-700'}
      transition-all duration-700 ease-in-out will-change-auto
      shadow-sm transform hover:scale-105
    `;
  }, [isDark]);
  
  return (
    <div className={containerStyles}>
      {icon}
      <span>{timeThemeText}</span>
    </div>
  );
}