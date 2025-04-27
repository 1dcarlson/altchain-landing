import { useTheme } from '@/hooks/theme-provider';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export default function TimeThemeIndicator() {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  
  // Icon based on dark mode
  const icon = useMemo(() => {
    return isDarkMode ? (
      <svg className="w-5 h-5 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    ) : (
      <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
      </svg>
    );
  }, [isDarkMode]);
  
  // Theme text
  const themeText = useMemo(() => {
    return isDarkMode ? t('theme.dark', 'Dark mode') : t('theme.light', 'Light mode');
  }, [isDarkMode, t]);
  
  // Container styles based on dark mode
  const containerStyles = useMemo(() => {
    return `
      inline-flex items-center px-3 py-2 rounded-xl text-xs font-medium
      ${isDarkMode ? 'bg-slate-800/80 text-slate-200' : 'bg-white/80 text-slate-700 shadow-sm border border-slate-200'}
      transition-all duration-700 ease-in-out
      backdrop-blur-sm
    `;
  }, [isDarkMode]);
  
  // Format the current time
  const currentTime = useMemo(() => {
    const date = new Date();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);
  
  return (
    <div className={containerStyles}>
      <div className="flex items-center">
        {icon}
        <span>{themeText}</span>
      </div>
      <span className="text-xs opacity-70 ml-2">{currentTime}</span>
    </div>
  );
}