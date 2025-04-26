import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useTimeTheme } from './use-time-theme';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  gradientPrimary: string; // New gradient properties
  gradientSecondary: string;
  gradientBackground: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  timeTheme: 'morning' | 'day' | 'evening' | 'night';
  isDark: boolean;
  prefersDarkMode: boolean; // System preference for dark mode
  progress: number; // 0-1 position through the entire day
  timePosition: number; // 0-1 position within current time period
}

// Define the base theme colors type
type BaseThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};

// Theme configurations with type safety
const themeConfigs: Record<'morning' | 'day' | 'evening' | 'night', BaseThemeColors> = {
  morning: {
    primary: 'hsl(215, 100%, 50%)', // Blue (same as day)
    secondary: 'hsl(165, 100%, 41%)',
    accent: 'hsl(280, 100%, 60%)',
    background: 'hsl(0, 0%, 100%)', // White (same as day)
    text: 'hsl(215, 30%, 20%)' // Darker text for better readability
  },
  day: {
    primary: 'hsl(215, 100%, 50%)', // Bright blue
    secondary: 'hsl(165, 100%, 41%)',
    accent: 'hsl(280, 100%, 60%)',
    background: 'hsl(0, 0%, 100%)', // Pure white
    text: 'hsl(215, 30%, 20%)' // Darker text for better readability
  },
  evening: {
    primary: 'hsl(280, 80%, 50%)', // Purple
    secondary: 'hsl(340, 100%, 65%)',
    accent: 'hsl(180, 100%, 45%)',
    background: 'hsl(240, 25%, 98%)', // Slight blue-purple tint
    text: 'hsl(215, 30%, 20%)' // Darker text for better readability
  },
  night: {
    primary: 'hsl(215, 70%, 60%)', // Softer blue
    secondary: 'hsl(280, 80%, 65%)',
    accent: 'hsl(160, 100%, 45%)',
    background: 'hsl(215, 30%, 12%)', // Dark blue-gray
    text: 'hsl(215, 15%, 85%)'
  }
};

// Transition pairs that define which theme to transition toward
const transitionPairs: Record<'morning' | 'day' | 'evening' | 'night', { to: 'morning' | 'day' | 'evening' | 'night' }> = {
  morning: { to: 'day' },
  day: { to: 'evening' },
  evening: { to: 'night' },
  night: { to: 'morning' }
};

// Default theme colors - initial placeholder
const defaultThemeColors: ThemeColors = {
  ...themeConfigs.day,
  gradientPrimary: 'linear-gradient(135deg, hsl(215, 100%, 50%), hsl(240, 100%, 65%))',
  gradientSecondary: 'linear-gradient(135deg, hsl(165, 100%, 41%), hsl(190, 100%, 50%))',
  gradientBackground: 'linear-gradient(135deg, hsl(0, 0%, 100%), hsl(220, 50%, 98%))'
};

const ThemeContext = createContext<ThemeContextType>({
  colors: defaultThemeColors,
  timeTheme: 'day',
  isDark: false,
  prefersDarkMode: false,
  progress: 0.5,
  timePosition: 0.5
});

export const useTheme = () => useContext(ThemeContext);

// Helper function to interpolate between HSL colors
const interpolateHSL = (from: string, to: string, progress: number): string => {
  // Parse HSL values
  const fromMatch = from.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  const toMatch = to.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  
  if (!fromMatch || !toMatch) {
    return from; // Fallback to from color if parsing fails
  }
  
  const fromH = parseInt(fromMatch[1], 10);
  const fromS = parseInt(fromMatch[2], 10);
  const fromL = parseInt(fromMatch[3], 10);
  
  const toH = parseInt(toMatch[1], 10);
  const toS = parseInt(toMatch[2], 10);
  const toL = parseInt(toMatch[3], 10);
  
  // Handle hue interpolation with special case for wrapping around 360
  let h: number;
  const hueDiff = toH - fromH;
  
  if (Math.abs(hueDiff) > 180) {
    // Take the shorter path around the color wheel
    if (hueDiff > 0) {
      h = fromH + ((toH - 360) - fromH) * progress;
      if (h < 0) h += 360;
    } else {
      h = fromH + ((toH + 360) - fromH) * progress;
      if (h >= 360) h -= 360;
    }
  } else {
    // Normal interpolation
    h = fromH + hueDiff * progress;
  }
  
  // Linear interpolation for saturation and lightness
  const s = fromS + (toS - fromS) * progress;
  const l = fromL + (toL - fromL) * progress;
  
  return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
};

// Converts HSL string to a format for CSS gradient
const formatHSL = (hslString: string): string => {
  // Already in correct format - just return it
  if (hslString.startsWith('hsl(')) return hslString;
  
  // Otherwise parse and reconstruct it
  const match = hslString.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
  if (!match) return hslString;
  
  return `hsl(${match[1]}, ${match[2]}%, ${match[3]}%)`;
};

/**
 * ThemeProvider component that manages color themes based on time of day
 * Enhanced with smooth gradient transitions
 */
export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { timeTheme, isNight, progress, timePosition } = useTimeTheme();
  
  // State to track system preference for dark mode
  const [prefersDarkMode, setPrefersDarkMode] = useState<boolean>(() => {
    // Check system preference on initial render
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // Listen for changes to system color scheme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Define the handler to update state
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersDarkMode(e.matches);
    };
    
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
  }, []);
  
  // Create dynamic color palette with gradients based on time position
  const colors = useMemo(() => {
    // Get current and next theme colors
    const currentTheme = themeConfigs[timeTheme];
    const nextThemeName = transitionPairs[timeTheme].to;
    const nextTheme = themeConfigs[nextThemeName];
    
    // Interpolate between current and next theme colors based on position
    const interpolatedColors = {
      primary: interpolateHSL(currentTheme.primary, nextTheme.primary, timePosition),
      secondary: interpolateHSL(currentTheme.secondary, nextTheme.secondary, timePosition),
      accent: interpolateHSL(currentTheme.accent, nextTheme.accent, timePosition),
      background: interpolateHSL(currentTheme.background, nextTheme.background, timePosition),
      // Always use a darker text color for better readability, regardless of time theme
      text: isNight ? themeConfigs.night.text : 'hsl(215, 30%, 20%)' // Darker text for better contrast
    };
    
    // Create gradient variants - adjusting the balance based on time of day
    const gradientVariant = Math.min(0.8, Math.max(0.2, progress));
    const hueShift = Math.round(progress * 30); // Subtle hue rotation based on time
    
    // Parse the interpolated primary color
    const primaryMatch = interpolatedColors.primary.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    const secondaryMatch = interpolatedColors.secondary.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    
    // Create gradient colors with slight variations
    let gradientPrimary = interpolatedColors.primary;
    let gradientSecondary = interpolatedColors.secondary;
    
    if (primaryMatch && secondaryMatch) {
      const h1 = parseInt(primaryMatch[1], 10);
      const s1 = parseInt(primaryMatch[2], 10);
      const l1 = parseInt(primaryMatch[3], 10);
      
      const h2 = parseInt(secondaryMatch[1], 10);
      
      // Create a slightly shifted variant for the gradient
      const gradientH1 = (h1 + hueShift) % 360;
      const gradientH2 = (h2 + hueShift + 30) % 360;
      
      gradientPrimary = `linear-gradient(135deg, 
        hsl(${h1}, ${s1}%, ${l1}%), 
        hsl(${gradientH1}, ${Math.min(100, s1 + 10)}%, ${Math.min(70, l1 + 5)}%))`;
        
      gradientSecondary = `linear-gradient(135deg, 
        ${interpolatedColors.secondary}, 
        hsl(${gradientH2}, ${Math.min(100, s1 + 5)}%, ${Math.min(70, l1 + 10)}%))`;
    }
    
    // Create background gradient based on time of day
    const gradientBackground = isNight 
      ? `linear-gradient(135deg, 
          ${formatHSL(interpolatedColors.background)}, 
          ${formatHSL(interpolateHSL(interpolatedColors.background, 'hsl(240, 40%, 15%)', 0.3))})`
      : `linear-gradient(135deg, 
          ${formatHSL(interpolatedColors.background)}, 
          ${formatHSL(interpolateHSL(interpolatedColors.background, 'hsl(210, 50%, 95%)', 0.2))})`;
    
    return {
      ...interpolatedColors,
      gradientPrimary,
      gradientSecondary,
      gradientBackground
    };
  }, [timeTheme, timePosition, progress, isNight]);
  
  // Apply CSS variables to the document root
  useEffect(() => {
    // Create a small delay to prevent rapid changes
    const timeoutId = setTimeout(() => {
      const root = document.documentElement;
      
      // Apply all color variables
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });
      
      // Set data-theme attribute - use system preference OR time-based theme
      const isDarkTheme = prefersDarkMode || isNight;
      root.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
      
      // For dark mode, apply custom colors defined in our CSS
      if (isDarkTheme) {
        root.style.setProperty('--background', 'hsl(222, 25%, 8%)');
        root.style.setProperty('--text', 'hsl(220, 15%, 90%)');
      }
      
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
  }, [colors, isNight, prefersDarkMode]);
  
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    colors,
    timeTheme,
    isDark: isNight,
    prefersDarkMode,
    progress,
    timePosition
  }), [colors, timeTheme, isNight, prefersDarkMode, progress, timePosition]);
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};