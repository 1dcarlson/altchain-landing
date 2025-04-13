import React, { useEffect, useState, useRef } from 'react';

/**
 * Interactive background component that creates a subtle gradient shift effect
 * based on mouse movements and interactions
 */
export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number>();
  const clickTimeoutRef = useRef<NodeJS.Timeout>();
  const gradientRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse movement to track position for gradient shifts
  const handleMouseMove = (event: MouseEvent) => {
    // Calculate relative position within the window (0-100%)
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    
    setMousePosition({ x, y });
    setIsActive(true);
    
    // Reset the active state after delay for subtle fade effect
    if (requestRef.current) {
      window.cancelAnimationFrame(requestRef.current);
    }
    
    requestRef.current = window.requestAnimationFrame(() => {
      setTimeout(() => setIsActive(false), 3000);
    });
  };
  
  // Handle click events to create ripple effects
  const handleClick = (event: MouseEvent) => {
    // Only respond to primary button clicks
    if (event.button !== 0) return;
    
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
    }, 800);
  };
  
  // Apply the gradient effect
  useEffect(() => {
    if (gradientRef.current) {
      // Create dynamic gradient positions based on mouse movement
      const x = mousePosition.x;
      const y = mousePosition.y;
      
      // Calculate gradient positions with subtle limits
      const pos1 = `${Math.min(Math.max(x - 20, 10), 90)}% ${Math.min(Math.max(y - 20, 10), 90)}%`;
      const pos2 = `${Math.min(Math.max(x + 20, 10), 90)}% ${Math.min(Math.max(y + 20, 10), 90)}%`;
      
      // Apply gradient with primary color variations
      gradientRef.current.style.background = `radial-gradient(circle at ${pos1}, 
        rgba(76, 134, 249, ${isActive ? 0.15 : 0.08}) 0%, 
        rgba(76, 134, 249, ${isActive ? 0.05 : 0.02}) 50%, 
        rgba(239, 246, 255, ${isActive ? 0.02 : 0}) 100%)`;
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
        className="fixed inset-0 w-full h-full pointer-events-none transition-all duration-1000 z-0"
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      />
      {/* Click pulse effect */}
      <div 
        ref={pulseRef}
        className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(76, 134, 249, 0.2) 0%, rgba(76, 134, 249, 0) 70%)',
          transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
          opacity: 0,
        }}
      />
    </>
  );
}