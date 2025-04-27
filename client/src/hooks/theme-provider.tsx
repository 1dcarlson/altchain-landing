import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false
});

export const useTheme = () => useContext(ThemeContext);

/**
 * Simplified ThemeProvider component that only tracks dark mode preference
 */
export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // State to track system preference for dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check system preference on initial render
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // Listen for changes to system color scheme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Define the handler to update state
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    // Add the listener to the media query
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
    
    // Set data-theme attribute on the document root
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [isDarkMode]);
  
  return (
    <ThemeContext.Provider value={{ isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};