import { useCallback } from 'react';
import confetti, { Options } from 'canvas-confetti';

// Use the Options type from canvas-confetti
interface ConfettiOptions extends Partial<Options> {}

/**
 * Hook for creating confetti celebrations
 * @returns functions to trigger different confetti effects
 */
export function useConfetti() {
  
  /**
   * Trigger a basic confetti celebration
   */
  const triggerBasic = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  /**
   * Trigger a realistic confetti celebration with custom options
   */
  const triggerConfetti = useCallback((options: ConfettiOptions = {}) => {
    const defaults = {
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#1E40AF', '#0EA5E9', '#22D3EE', '#2563EB', '#FFFFFF'] as string[],
      startVelocity: 30,
      gravity: 1.2,
      ticks: 100
    };

    confetti({
      ...defaults,
      ...options
    });
  }, []);

  /**
   * Trigger a confetti cannon from a specific position
   */
  const triggerCannon = useCallback((x = 0.5, y = 0.5) => {
    confetti({
      particleCount: 200,
      startVelocity: 45,
      spread: 80,
      origin: { x, y },
      gravity: 1,
      colors: ['#1E40AF', '#0EA5E9', '#22D3EE', '#2563EB', '#FFFFFF', '#7DD3FC'] as string[]
    });
  }, []);

  /**
   * Trigger a burst of confetti from multiple sides
   */
  const triggerMultipleSides = useCallback(() => {
    // Left side
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ['#1E40AF', '#0EA5E9', '#22D3EE', '#2563EB'] as string[]
    });
    
    // Right side
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ['#1E40AF', '#0EA5E9', '#22D3EE', '#2563EB'] as string[]
    });
  }, []);

  /**
   * Trigger a realistic celebration sequence with multiple effects
   */
  const triggerCelebration = useCallback(() => {
    // Initial burst from the bottom
    triggerConfetti();
    
    // Side bursts after a small delay
    setTimeout(() => {
      triggerMultipleSides();
    }, 250);
    
    // Final burst from the center
    setTimeout(() => {
      triggerCannon(0.5, 0.5);
    }, 500);
  }, [triggerConfetti, triggerMultipleSides, triggerCannon]);

  /**
   * Trigger an enhanced waitlist signup celebration with multiple waves
   * This is a special celebration for when users successfully join the waitlist
   */
  const triggerWaitlistCelebration = useCallback(() => {
    // Initial celebratory burst from the bottom
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.7 },
      colors: ['#1E40AF', '#0EA5E9', '#22D3EE', '#2563EB', '#FFFFFF', '#7DD3FC'],
      startVelocity: 40,
      gravity: 1,
      scalar: 1.2,
      ticks: 100
    });
    
    // Side bursts after a small delay - left side
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.65 },
        colors: ['#1E40AF', '#0EA5E9', '#22D3EE', '#2563EB', '#38BDF8'],
        startVelocity: 35
      });
    }, 300);
    
    // Side bursts after a small delay - right side
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.65 },
        colors: ['#1E40AF', '#0EA5E9', '#22D3EE', '#2563EB', '#38BDF8'],
        startVelocity: 35
      });
    }, 300);
    
    // Shower effect from the top
    setTimeout(() => {
      const end = Date.now() + 1000;
      
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 140,
          spread: 80,
          origin: { x: Math.random(), y: 0 },
          colors: ['#1E40AF', '#0EA5E9', '#22D3EE', '#2563EB', '#FFFFFF'],
          ticks: 300
        });
        
        confetti({
          particleCount: 3,
          angle: 40,
          spread: 80,
          origin: { x: Math.random(), y: 0 },
          colors: ['#1E40AF', '#0EA5E9', '#22D3EE', '#2563EB', '#FFFFFF'],
          ticks: 300
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      frame();
    }, 800);
    
    // Final celebratory burst
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.55, x: 0.5 },
        startVelocity: 35,
        gravity: 1,
        scalar: 1.2,
        drift: 0,
        ticks: 300
      });
    }, 1500);
  }, []);

  return {
    triggerBasic,
    triggerConfetti,
    triggerCannon,
    triggerMultipleSides,
    triggerCelebration,
    triggerWaitlistCelebration
  };
}