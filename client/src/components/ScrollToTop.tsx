import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * ScrollToTop component that automatically scrolls the page to
 * the top when navigating between routes
 */
export default function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [location]);
  
  return null;
}