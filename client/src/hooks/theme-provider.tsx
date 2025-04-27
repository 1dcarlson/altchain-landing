import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false
});

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Simplified ThemeProvider component that only tracks dark mode preference
 */
export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // State to track system preference for dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check system preference on initial render
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // Apply dark mode to the DOM and listen for system changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Define the handler to update state
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    // Function to apply dark mode classes and attributes
    const applyDarkMode = (isDark: boolean) => {
      // Set data attributes for CSS targeting
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      
      // Apply/remove classes for additional CSS targeting
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        document.body.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        document.body.classList.remove('dark-mode');
      }
    };
    
    // Apply dark mode immediately
    applyDarkMode(isDarkMode);
    
    // Add the listener to the media query
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
    
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