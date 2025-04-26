import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { useMemo } from 'react';

/**
 * Enhanced FadeBackground component that provides a very subtle and elegant
 * transition effect for the background when navigating between pages
 */
export default function FadeBackground() {
  const [location] = useLocation();
  
  // Generate a unique key for each route to trigger the animation
  const backgroundKey = useMemo(() => `background-${location}`, [location]);
  
  // Prepare gradient colors based on routes
  const gradient = useMemo(() => {
    // We could customize gradient based on route if desired
    return 'radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.02), transparent 70%)';
  }, [location]);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={backgroundKey}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: gradient,
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { 
            duration: 1.2, 
            ease: [0.2, 0.65, 0.3, 0.9] // Custom ease curve for subtle fade
          }
        }}
        exit={{ 
          opacity: 0,
          transition: { 
            duration: 0.4, 
            ease: [0.2, 0.65, 0.3, 0.9]
          }
        }}
      />
    </AnimatePresence>
  );
}