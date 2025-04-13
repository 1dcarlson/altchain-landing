import React, { useEffect, useRef } from 'react';

/**
 * Optimized interactive background component that creates a subtle gradient shift effect
 * based on mouse movements and interactions with minimal performance impact
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
  
  // Set up mouse tracking and click effects only once on mount
  useEffect(() => {
    // Only track mouse on devices that support hover
    const hasHoverSupport = window.matchMedia('(hover: hover)').matches;
    
    // Initial subtle gradient (less intense for better performance)
    if (gradientRef.current) {
      gradientRef.current.style.background = 'radial-gradient(circle at 50% 50%, rgba(76, 134, 249, 0.04) 0%, rgba(76, 134, 249, 0.02) 50%, rgba(239, 246, 255, 0) 100%)';
    }

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
        
        // Less intense gradient for better performance
        gradientRef.current.style.background = `radial-gradient(circle at ${pos}, 
          rgba(76, 134, 249, 0.06) 0%, 
          rgba(76, 134, 249, 0.03) 50%, 
          rgba(239, 246, 255, 0) 100%)`;
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
          gradientRef.current.style.background = `radial-gradient(circle at ${pos}, 
            rgba(76, 134, 249, 0.04) 0%, 
            rgba(76, 134, 249, 0.02) 50%, 
            rgba(239, 246, 255, 0) 100%)`;
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
      
      // Set up the pulse effect
      pulseRef.current.style.left = `${event.clientX}px`;
      pulseRef.current.style.top = `${event.clientY}px`;
      pulseRef.current.style.opacity = '1';
      pulseRef.current.style.transform = 'translate(-50%, -50%) scale(0)';
      
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
  
  return (
    <>
      <div 
        ref={gradientRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ 
          transition: 'background 2s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'background',
          backfaceVisibility: 'hidden',
        }}
      />
      {/* Click pulse effect - much more subtle */}
      <div 
        ref={pulseRef}
        className="fixed w-[250px] h-[250px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(76, 134, 249, 0.12) 0%, rgba(76, 134, 249, 0) 70%)',
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