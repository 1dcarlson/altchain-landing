import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showPercentage, setShowPercentage] = useState(false);
  
  // Throttle function to limit execution frequency
  const throttle = (callback: Function, delay = 100) => {
    let lastCall = 0;
    return (...args: any[]) => {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return callback(...args);
    };
  };
  
  const updateScrollProgress = useCallback(throttle(() => {
    // Calculate how far the user has scrolled
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Show scroll to top button when scrolled down a bit
    setShowScrollToTop(scrollTop > window.innerHeight * 0.3);
    
    // Show percentage when scrolled significantly
    setShowPercentage(scrollTop > window.innerHeight * 0.5);
    
    if (scrollHeight > 0) {
      // Convert to percentage
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    }
  }, 50), []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress);
    
    // Initialize on mount
    updateScrollProgress();
    
    // Clean up
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, [updateScrollProgress]);
  
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-gray-200/20">
        <div 
          className={`h-full bg-primary origin-left transition-transform duration-150 ease-out shadow-sm ${
            scrollProgress > 0 && scrollProgress < 100 ? 'after:content-[""] after:absolute after:right-0 after:top-0 after:w-2 after:h-full after:bg-white/50 after:rounded-full after:animate-pulse' : ''
          }`}
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>
      
      {/* Percentage indicator */}
      <div 
        className={`fixed top-4 right-4 bg-primary/85 text-white text-xs font-medium rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300 ${
          showPercentage 
            ? 'opacity-80 scale-100' 
            : 'opacity-0 scale-75 pointer-events-none'
        }`}
      >
        {Math.round(scrollProgress)}%
      </div>
      
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-xl z-50 transition-all duration-300 overflow-hidden group border-2 border-white/80 ${
          showScrollToTop 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
        <ArrowUp 
          size={24} 
          className="relative z-10 transition-transform group-hover:animate-bounce-subtle"
        />
      </button>
    </>
  );
}