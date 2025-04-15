import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useTimeTheme } from './use-time-theme';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  timeTheme: 'morning' | 'day' | 'evening' | 'night';
  isDark: boolean;
}

// Default theme colors
const defaultThemeColors: ThemeColors = {
  primary: 'hsl(215, 100%, 50%)',
  secondary: 'hsl(165, 100%, 41%)',
  accent: 'hsl(280, 100%, 60%)',
  background: 'hsl(0, 0%, 100%)',
  text: 'hsl(215, 25%, 27%)'
};

// Theme color configurations
const themeConfigs = {
  morning: {
    primary: 'hsl(35, 100%, 50%)', // Warm orange
    secondary: 'hsl(160, 100%, 45%)',
    accent: 'hsl(320, 100%, 65%)',
    background: 'hsl(48, 100%, 97%)', // Light warm yellow
    text: 'hsl(215, 25%, 27%)'
  },
  day: {
    primary: 'hsl(215, 100%, 50%)', // Bright blue
    secondary: 'hsl(165, 100%, 41%)',
    accent: 'hsl(280, 100%, 60%)',
    background: 'hsl(0, 0%, 100%)', // Pure white
    text: 'hsl(215, 25%, 27%)'
  },
  evening: {
    primary: 'hsl(280, 80%, 50%)', // Purple
    secondary: 'hsl(340, 100%, 65%)',
    accent: 'hsl(180, 100%, 45%)',
    background: 'hsl(240, 25%, 98%)', // Slight blue-purple tint
    text: 'hsl(215, 25%, 27%)'
  },
  night: {
    primary: 'hsl(215, 70%, 60%)', // Softer blue
    secondary: 'hsl(280, 80%, 65%)',
    accent: 'hsl(160, 100%, 45%)',
    background: 'hsl(215, 30%, 12%)', // Dark blue-gray
    text: 'hsl(215, 15%, 85%)'
  }
};

const ThemeContext = createContext<ThemeContextType>({
  colors: defaultThemeColors,
  timeTheme: 'day',
  isDark: false
});

export const useTheme = () => useContext(ThemeContext);

/**
 * ThemeProvider component that manages color themes based on time of day
 * Optimized to prevent unnecessary re-renders and flickering
 */
export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { timeTheme, isNight } = useTimeTheme();
  
  // Use memo to avoid recreating the colors object on every render
  const colors = useMemo(() => {
    return themeConfigs[timeTheme];
  }, [timeTheme]);
  
  // Apply CSS variables to the document root with debouncing
  useEffect(() => {
    // Create a small delay to prevent rapid changes
    const timeoutId = setTimeout(() => {
      const root = document.documentElement;
      
      // Apply all color variables
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });
      
      // Set data-theme attribute
      root.setAttribute('data-theme', isNight ? 'dark' : 'light');
      
      // Update meta theme-color
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', colors.primary);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = colors.primary;
        document.head.appendChild(meta);
      }
    }, 100); // Small delay to batch updates

    return () => clearTimeout(timeoutId);
  }, [colors, isNight]);
  
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    colors,
    timeTheme,
    isDark: isNight
  }), [colors, timeTheme, isNight]);
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};