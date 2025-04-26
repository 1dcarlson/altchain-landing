import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

/**
 * Enhanced ScrollToTop component that automatically scrolls the page to
 * the top when navigating between routes, with improved behavior
 */
export default function ScrollToTop() {
  const [location] = useLocation();
  const prevLocation = useRef(location);
  
  useEffect(() => {
    // Only scroll if the location has changed
    if (prevLocation.current !== location) {
      // Small timeout to allow transitions to start
      const timer = setTimeout(() => {
        // Only scroll if we're not already at the top
        if (window.scrollY > 0) {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      }, 100);
      
      prevLocation.current = location;
      return () => clearTimeout(timer);
    }
  }, [location]);
  
  return null;
}