import React, { createContext, useContext, useEffect } from 'react';

// Simple theme colors interface
interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  gradientBackground: string;
}

// Simple theme context type
interface ThemeContextType {
  colors: ThemeColors;
  isDark: boolean;
}

// Fixed theme colors for consistency
const themeColors: ThemeColors = {
  primary: 'hsl(215, 100%, 50%)', // Blue
  secondary: 'hsl(165, 100%, 41%)',
  accent: 'hsl(280, 100%, 60%)',
  background: 'hsl(0, 0%, 100%)',
  text: 'hsl(215, 25%, 27%)',
  gradientBackground: 'linear-gradient(135deg, hsl(0, 0%, 100%), hsl(210, 30%, 95%))'
};

// Create the theme context with default values
const ThemeContext = createContext<ThemeContextType>({
  colors: themeColors,
  isDark: false
});

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);

/**
 * Simple ThemeProvider component with fixed colors
 */
export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Effect to set CSS variables once
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', themeColors.primary);
    document.documentElement.style.setProperty('--secondary', themeColors.secondary);
    document.documentElement.style.setProperty('--accent', themeColors.accent);
    document.documentElement.style.setProperty('--background', themeColors.background);
    document.documentElement.style.setProperty('--text', themeColors.text);
    document.documentElement.style.setProperty('--gradientBackground', themeColors.gradientBackground);
    
    // Set light color scheme
    document.documentElement.style.setProperty('color-scheme', 'light');
  }, []);
  
  // Provide the theme context to children
  return (
    <ThemeContext.Provider value={{ colors: themeColors, isDark: false }}>
      {children}
    </ThemeContext.Provider>
  );
};