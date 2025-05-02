import React, { useEffect, useRef } from 'react';
import { useTheme } from '../hooks/theme-provider';

/**
 * Optimized interactive background component that creates a subtle gradient shift effect
 * based on mouse movements and interactions
 */
export default function InteractiveBackground() {
  // Use refs to avoid state updates and re-renders completely
  const gradientRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const lastMoveRef = useRef<{ x: number, y: number }>({ x: 50, y: 50 });
  const isActiveRef = useRef(false);
  const activeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const throttleRef = useRef<boolean>(false);
  const clickEffectActiveRef = useRef<boolean>(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Get theme context for dark mode
  const { isDarkMode } = useTheme();
  
  // Set up mouse tracking and click effects only once on mount
  useEffect(() => {
    // Only track mouse on devices that support hover
    const hasHoverSupport = window.matchMedia('(hover: hover)').matches;
    
    // Skip mouse tracking on touch devices to improve performance
    if (!hasHoverSupport) return;
    
    // Function to update gradient based on mouse position - heavily throttled
    const handleMouseMove = (event: MouseEvent) => {
      // Extreme throttling for better performance - only process every 100ms max
      if (throttleRef.current) return;
      throttleRef.current = true;
      
      setTimeout(() => {
        throttleRef.current = false;
      }, 100);
      
      // Calculate position with reduced precision to improve performance
      const x = Math.round((event.clientX / window.innerWidth) * 100);
      const y = Math.round((event.clientY / window.innerHeight) * 100);
      
      // Smooth transition with strong damping (less reactive, more stable)
      const smoothX = lastMoveRef.current.x + (x - lastMoveRef.current.x) * 0.1;
      const smoothY = lastMoveRef.current.y + (y - lastMoveRef.current.y) * 0.1;
      
      lastMoveRef.current = { x: smoothX, y: smoothY };
      
      // Only update DOM if we have refs
      if (gradientRef.current) {
        // Apply moderate position effect
        // Note: Using style manipulation instead of state for performance
        gradientRef.current.style.setProperty(
          'background-position', 
          `${smoothX}% ${smoothY}%`
        );
        
        // Update active state with debouncing
        isActiveRef.current = true;
        
        if (activeTimeoutRef.current) {
          clearTimeout(activeTimeoutRef.current);
        }
        
        activeTimeoutRef.current = setTimeout(() => {
          isActiveRef.current = false;
          
          if (gradientRef.current) {
            gradientRef.current.classList.remove('duration-1000');
            gradientRef.current.classList.add('duration-3000');
            
            // Reset to center with a slow transition when inactive
            gradientRef.current.style.setProperty('background-position', '50% 50%');
          }
        }, 3000);
        
        // Quick transition when moving
        gradientRef.current.classList.remove('duration-3000');
        gradientRef.current.classList.add('duration-1000');
      }
    };
    
    // Create subtle pulse effect on click
    const handleClick = (event: MouseEvent) => {
      // Prevent multiple click effects
      if (clickEffectActiveRef.current) return;
      clickEffectActiveRef.current = true;
      
      // Create pulse effect at mouse position
      if (pulseRef.current) {
        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;
        
        pulseRef.current.style.setProperty('left', `${x}%`);
        pulseRef.current.style.setProperty('top', `${y}%`);
        pulseRef.current.style.setProperty('opacity', '1');
        pulseRef.current.style.setProperty('transform', 'scale(0)');
        
        // After a tiny delay, start the animation
        setTimeout(() => {
          if (pulseRef.current) {
            pulseRef.current.style.setProperty('transform', 'scale(1)');
            pulseRef.current.style.setProperty('opacity', '0');
          }
        }, 10);
        
        // Reset the pulse effect after animation
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current);
        }
        
        clickTimeoutRef.current = setTimeout(() => {
          clickEffectActiveRef.current = false;
          if (pulseRef.current) {
            pulseRef.current.style.setProperty('transform', 'scale(0)');
            pulseRef.current.style.setProperty('opacity', '0');
          }
        }, 700); // Match this to the CSS animation duration
      }
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });
    
    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      
      if (activeTimeoutRef.current) {
        clearTimeout(activeTimeoutRef.current);
      }
      
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);
  
  // Simple gradient based on mode
  const backgroundGradient = isDarkMode
    ? 'linear-gradient(135deg, #0d1117, #161b22)'
    : 'linear-gradient(135deg, #f5f7fa, #e6edf7)';
    
  const pulseGradient = isDarkMode
    ? 'radial-gradient(circle, rgba(96, 165, 250, 0.7), rgba(96, 165, 250, 0))'
    : 'radial-gradient(circle, rgba(66, 133, 244, 0.7), rgba(66, 133, 244, 0))';
  
  // Return background element with dynamic gradient
  return (
    <>
      <div 
        ref={gradientRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-gradient-to-br bg-[length:200%_200%] duration-3000 transition-all ease-in-out opacity-40 dark:opacity-20"
        style={{
          backgroundImage: backgroundGradient,
          backgroundPosition: '50% 50%'
        }}
      />
      
      {/* Pulse effect container - only renders when clicked */}
      <div
        ref={pulseRef}
        className="fixed w-1 h-1 z-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 duration-700 ease-out"
        style={{
          background: pulseGradient,
          borderRadius: '50%',
          boxShadow: `0 0 40px 20px ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
          opacity: 0,
          transform: 'scale(0)'
        }}
      />
    </>
  );
}