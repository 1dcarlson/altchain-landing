import { useState, useEffect, useMemo } from 'react';

type TimeTheme = 'morning' | 'day' | 'evening' | 'night';

interface TimeThemeResult {
  timeTheme: TimeTheme;
  hour: number;
  minute: number;
  isDay: boolean;
  isNight: boolean;
  progress: number; // 0-1 value representing progress through the day
  timePosition: number; // 0-1 value normalized within current time period
}

/**
 * Determines the current time theme based on the user's local time
 * Enhanced implementation with smooth gradient transitions
 */
export function useTimeTheme(): TimeThemeResult {
  // Get current time details
  const getCurrentTime = () => {
    const now = new Date();
    return {
      hour: now.getHours(),
      minute: now.getMinutes(),
    };
  };

  // Calculate the normalized time progress (0-1) through the entire day
  const calculateDayProgress = (hour: number, minute: number): number => {
    const totalMinutes = hour * 60 + minute;
    return totalMinutes / (24 * 60); // Normalize to 0-1 range
  };

  // Initialize time theme based on hour
  const getInitialTimeTheme = (hour: number): TimeTheme => {
    if (hour >= 5 && hour < 10) return 'morning';
    if (hour >= 10 && hour < 17) return 'day';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  // Calculate position within the current time theme (0-1)
  const calculateTimePosition = (hour: number, minute: number, theme: TimeTheme): number => {
    const totalMinutes = hour * 60 + minute;
    
    switch (theme) {
      case 'morning': // 5:00 - 10:00
        return (totalMinutes - 5 * 60) / (5 * 60);
      case 'day': // 10:00 - 17:00
        return (totalMinutes - 10 * 60) / (7 * 60);
      case 'evening': // 17:00 - 21:00
        return (totalMinutes - 17 * 60) / (4 * 60);
      case 'night': // 21:00 - 5:00
        // Handle wrapping around midnight
        if (hour >= 21) {
          return (totalMinutes - 21 * 60) / (8 * 60 + 0); 
        } else {
          return (totalMinutes + (3 * 60)) / (8 * 60 + 0);
        }
      default:
        return 0;
    }
  };
  
  // Initialize state with current values
  const initialTime = getCurrentTime();
  const [hour, setHour] = useState<number>(initialTime.hour);
  const [minute, setMinute] = useState<number>(initialTime.minute);
  const [timeTheme, setTimeTheme] = useState<TimeTheme>(getInitialTimeTheme(initialTime.hour));
  
  useEffect(() => {
    // Debounced calculation function to prevent rapid changes
    let timeoutId: NodeJS.Timeout | null = null;
    
    const calculateTimeTheme = () => {
      const { hour: currentHour, minute: currentMinute } = getCurrentTime();
      
      // Update time if changed
      if (currentHour !== hour || currentMinute !== minute) {
        setHour(currentHour);
        setMinute(currentMinute);
        
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
        }, 300); // Small delay to prevent flickering
      }
    };
    
    // Calculate on mount
    calculateTimeTheme();
    
    // Recalculate every minute to ensure we catch time changes
    const interval = setInterval(calculateTimeTheme, 30 * 1000);
    
    // Clean up
    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hour, minute]); // Depend on both hour and minute
  
  // Calculate derived values (memoized for performance)
  const derivedValues = useMemo(() => {
    const isDay = timeTheme === 'morning' || timeTheme === 'day';
    const isNight = timeTheme === 'evening' || timeTheme === 'night';
    const progress = calculateDayProgress(hour, minute);
    const timePosition = calculateTimePosition(hour, minute, timeTheme);
    
    return {
      isDay,
      isNight,
      progress,
      timePosition
    };
  }, [hour, minute, timeTheme]);
  
  return { 
    timeTheme, 
    hour, 
    minute, 
    isDay: derivedValues.isDay, 
    isNight: derivedValues.isNight,
    progress: derivedValues.progress,
    timePosition: derivedValues.timePosition
  };
}