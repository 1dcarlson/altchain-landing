import { useState, useEffect } from 'react';

type TimeTheme = 'morning' | 'day' | 'evening' | 'night';

interface TimeThemeResult {
  timeTheme: TimeTheme;
  hour: number;
  isDay: boolean;
  isNight: boolean;
}

/**
 * Determines the current time theme based on the user's local time
 * More stable implementation with memoization to prevent unnecessary re-renders
 */
export function useTimeTheme(): TimeThemeResult {
  // Initialize with current values
  const getCurrentHour = () => new Date().getHours();
  const getInitialTimeTheme = (): TimeTheme => {
    const hour = getCurrentHour();
    if (hour >= 5 && hour < 10) return 'morning';
    if (hour >= 10 && hour < 17) return 'day';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };
  
  const [hour, setHour] = useState<number>(getCurrentHour());
  const [timeTheme, setTimeTheme] = useState<TimeTheme>(getInitialTimeTheme());
  
  useEffect(() => {
    // Debounced calculation function to prevent rapid changes
    let timeoutId: NodeJS.Timeout | null = null;
    
    const calculateTimeTheme = () => {
      const currentHour = getCurrentHour();
      
      // Only update if hour actually changed
      if (currentHour !== hour) {
        setHour(currentHour);
        
        // Use a timeout to debounce the theme change
        if (timeoutId) clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
          // Determine time of day
          if (currentHour >= 5 && currentHour < 10) {
            setTimeTheme('morning');
          } else if (currentHour >= 10 && currentHour < 17) {
            setTimeTheme('day');
          } else if (currentHour >= 17 && currentHour < 21) {
            setTimeTheme('evening');
          } else {
            setTimeTheme('night');
          }
        }, 500); // Small delay to prevent flickering
      }
    };
    
    // Calculate on mount
    calculateTimeTheme();
    
    // Recalculate every minute to ensure we catch hour changes
    const interval = setInterval(calculateTimeTheme, 60 * 1000);
    
    // Clean up
    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hour]); // Only depend on hour to minimize effect runs
  
  // Memoize these values
  const isDay = timeTheme === 'morning' || timeTheme === 'day';
  const isNight = timeTheme === 'evening' || timeTheme === 'night';
  
  return { timeTheme, hour, isDay, isNight };
}