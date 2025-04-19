import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/theme-provider';

/**
 * Optimized interactive background component that creates a subtle gradient shift effect
 * based on mouse movements and interactions and time-based gradient themes
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
  
  // Get theme context for time-based gradients
  const { colors, isDark, progress } = useTheme();
  
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
        const pos = `${Math.min(Math.max(smoothX - 10, 25), 75)}% ${Math.min(Math.max(smoothY - 10, 25), 75)}%`;
        
        // Get primary color from current theme
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        
        // Apply interactive radial gradient overlay based on mouse position
        // with less intense gradient for better performance
        const gradientOverlay = `radial-gradient(circle at ${pos}, 
          ${primaryColor.replace(')', ', 0.05)')}, 
          ${primaryColor.replace(')', ', 0.02)')} 60%, 
          transparent 100%)`;
          
        // Combine with the background gradient from theme
        gradientRef.current.style.backgroundImage = gradientOverlay;
      }
      
      // Active state handling
      isActiveRef.current = true;
      
      // Clear any existing timeout
      if (activeTimeoutRef.current) {
        clearTimeout(activeTimeoutRef.current);
      }
      
      // Set new timeout with longer duration
      activeTimeoutRef.current = setTimeout(() => {
        isActiveRef.current = false;
        
        // Gentle inactive state
        if (gradientRef.current) {
          const pos = `${Math.min(Math.max(lastMoveRef.current.x - 10, 25), 75)}% ${Math.min(Math.max(lastMoveRef.current.y - 10, 25), 75)}%`;
          const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
          
          // Even gentler gradient when inactive
          const gradientOverlay = `radial-gradient(circle at ${pos}, 
            ${primaryColor.replace(')', ', 0.03)')}, 
            ${primaryColor.replace(')', ', 0.01)')} 60%, 
            transparent 100%)`;
            
          gradientRef.current.style.backgroundImage = gradientOverlay;
        }
      }, 6000);
    };
    
    // Click handler with reduced visual intensity
    const handleClick = (event: MouseEvent) => {
      // Skip if already showing an effect or not left click
      if (clickEffectActiveRef.current || event.button !== 0) return;
      
      clickEffectActiveRef.current = true;
      
      // Only continue if we have the ref
      if (!pulseRef.current) {
        clickEffectActiveRef.current = false;
        return;
      }
      
      // Get primary color from current theme
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      
      // Set up the pulse effect
      pulseRef.current.style.left = `${event.clientX}px`;
      pulseRef.current.style.top = `${event.clientY}px`;
      pulseRef.current.style.opacity = '1';
      pulseRef.current.style.transform = 'translate(-50%, -50%) scale(0)';
      pulseRef.current.style.background = `radial-gradient(circle, ${primaryColor.replace(')', ', 0.12)')} 0%, ${primaryColor.replace(')', ', 0)')} 70%)`;
      
      // Trigger the animation with RAF for better performance
      requestAnimationFrame(() => {
        if (pulseRef.current) {
          pulseRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
          pulseRef.current.style.opacity = '0';
        }
        
        // Clear effect after animation completes
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current);
        }
        
        clickTimeoutRef.current = setTimeout(() => {
          clickEffectActiveRef.current = false;
        }, 1500);
      });
    };
    
    // Only add listeners if device supports hover
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleClick, { passive: true });
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      
      if (activeTimeoutRef.current) {
        clearTimeout(activeTimeoutRef.current);
      }
      
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);
  
  // Update background when theme changes
  useEffect(() => {
    if (gradientRef.current) {
      // Apply background gradient from theme that shifts based on time
      gradientRef.current.style.background = 'var(--gradientBackground)';
    }
  }, [colors, isDark, progress]);
  
  return (
    <>
      <div 
        ref={gradientRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-gradient"
        style={{ 
          willChange: 'background',
          backfaceVisibility: 'hidden',
        }}
      />
      {/* Click pulse effect */}
      <div 
        ref={pulseRef}
        className="fixed w-[250px] h-[250px] rounded-full pointer-events-none z-0"
        style={{
          transition: 'transform 1.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 1.5s cubic-bezier(0.19, 1, 0.22, 1)',
          opacity: 0,
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          transform: 'translate(-50%, -50%) scale(0)',
        }}
      />
    </>
  );
}