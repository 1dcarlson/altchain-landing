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

  return {
    triggerBasic,
    triggerConfetti,
    triggerCannon,
    triggerMultipleSides,
    triggerCelebration
  };
}