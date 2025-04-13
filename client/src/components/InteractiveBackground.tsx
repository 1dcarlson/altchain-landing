import React, { useEffect, useState, useRef } from 'react';

/**
 * Interactive background component that creates a subtle gradient shift effect
 * based on mouse movements and interactions
 */
export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isActive, setIsActive] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  
  // Use refs to avoid excessive re-renders and improve performance
  const requestRef = useRef<number>();
  const throttleRef = useRef<boolean>(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout>();
  const gradientRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const lastMoveRef = useRef<{ x: number, y: number }>({ x: 50, y: 50 });
  
  // Handle mouse movement with throttling to reduce glitchiness
  const handleMouseMove = (event: MouseEvent) => {
    // Throttle the mouse move events to reduce jitter
    if (throttleRef.current) return;
    
    throttleRef.current = true;
    setTimeout(() => {
      throttleRef.current = false;
    }, 50); // Throttle to a maximum of 20 updates per second
    
    // Calculate relative position within the window (0-100%)
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    
    // Smooth transition by limiting the maximum change per update
    const smoothX = lastMoveRef.current.x + (x - lastMoveRef.current.x) * 0.2;
    const smoothY = lastMoveRef.current.y + (y - lastMoveRef.current.y) * 0.2;
    
    lastMoveRef.current = { x: smoothX, y: smoothY };
    setMousePosition({ x: smoothX, y: smoothY });
    
    // Only activate if not already active
    if (!isActive) {
      setIsActive(true);
    }
    
    // Reset the active state after delay for subtle fade effect
    if (requestRef.current) {
      window.cancelAnimationFrame(requestRef.current);
    }
    
    requestRef.current = window.requestAnimationFrame(() => {
      setTimeout(() => setIsActive(false), 5000); // Slower fade-out for smoother transitions
    });
  };
  
  // Handle click events to create ripple effects (only respond every 500ms max)
  const handleClick = (event: MouseEvent) => {
    // Only respond to primary button clicks and limit frequency
    if (event.button !== 0 || clickEffect) return;
    
    // Calculate position for the click effect
    const x = event.clientX;
    const y = event.clientY;
    
    setClickPosition({ x, y });
    setClickEffect(true);
    
    // Clear any existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    // Set timeout to remove click effect
    clickTimeoutRef.current = setTimeout(() => {
      setClickEffect(false);
    }, 1200); // Longer duration for smoother animation
  };
  
  // Apply the gradient effect
  useEffect(() => {
    if (gradientRef.current) {
      // Create dynamic gradient positions based on mouse movement
      const x = mousePosition.x;
      const y = mousePosition.y;
      
      // Calculate gradient positions with subtle limits
      const pos1 = `${Math.min(Math.max(x - 15, 20), 80)}% ${Math.min(Math.max(y - 15, 20), 80)}%`;
      
      // Apply gradient with primary color variations - with less intensity to reduce visual noise
      gradientRef.current.style.background = `radial-gradient(circle at ${pos1}, 
        rgba(76, 134, 249, ${isActive ? 0.10 : 0.05}) 0%, 
        rgba(76, 134, 249, ${isActive ? 0.04 : 0.02}) 50%, 
        rgba(239, 246, 255, 0) 100%)`;
    }
  }, [mousePosition, isActive]);
  
  // Apply click pulse effect
  useEffect(() => {
    if (clickEffect && pulseRef.current) {
      pulseRef.current.style.left = `${clickPosition.x}px`;
      pulseRef.current.style.top = `${clickPosition.y}px`;
      pulseRef.current.style.opacity = '1';
      pulseRef.current.style.transform = 'translate(-50%, -50%) scale(0)';
      
      // Trigger animation
      setTimeout(() => {
        if (pulseRef.current) {
          pulseRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
          pulseRef.current.style.opacity = '0';
        }
      }, 10);
    }
  }, [clickEffect, clickPosition]);
  
  // Set up event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    
    // Initial subtle gradient
    if (gradientRef.current) {
      gradientRef.current.style.background = 'radial-gradient(circle at 50% 50%, rgba(76, 134, 249, 0.05) 0%, rgba(76, 134, 249, 0.02) 50%, rgba(239, 246, 255, 0) 100%)';
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      if (requestRef.current) {
        window.cancelAnimationFrame(requestRef.current);
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
          transition: 'background 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'background'
        }}
      />
      {/* Click pulse effect */}
      <div 
        ref={pulseRef}
        className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(76, 134, 249, 0.15) 0%, rgba(76, 134, 249, 0) 70%)',
          transition: 'transform 1.2s cubic-bezier(0.19, 1, 0.22, 1), opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1)',
          opacity: 0,
          willChange: 'transform, opacity'
        }}
      />
    </>
  );
}