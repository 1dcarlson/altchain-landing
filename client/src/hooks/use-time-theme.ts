import { useState, useEffect } from 'react';

type TimeTheme = 'morning' | 'day' | 'evening' | 'night';

interface TimeThemeResult {
  timeTheme: TimeTheme;
  hour: number;
  isDay: boolean;
  isNight: boolean;
}

export function useTimeTheme(): TimeThemeResult {
  const [timeTheme, setTimeTheme] = useState<TimeTheme>('day');
  const [hour, setHour] = useState<number>(new Date().getHours());
  
  useEffect(() => {
    const calculateTimeTheme = () => {
      const currentHour = new Date().getHours();
      setHour(currentHour);
      
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
    };
    
    // Calculate on mount
    calculateTimeTheme();
    
    // Recalculate every 5 minutes
    const interval = setInterval(calculateTimeTheme, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const isDay = timeTheme === 'morning' || timeTheme === 'day';
  const isNight = timeTheme === 'evening' || timeTheme === 'night';
  
  return { timeTheme, hour, isDay, isNight };
}