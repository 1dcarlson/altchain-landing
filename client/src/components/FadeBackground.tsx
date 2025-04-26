import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useMemo } from 'react';

/**
 * FadeBackground component that provides a subtle transition effect
 * for the background when navigating between pages
 */
export default function FadeBackground() {
  const [location] = useLocation();
  
  // Generate a unique key for each route to trigger the animation
  const backgroundKey = useMemo(() => `background-${location}`, [location]);
  
  return (
    <motion.div 
      key={backgroundKey}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 0.15,
        transition: { duration: 0.8, ease: 'easeOut' }
      }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeIn' }
      }}
    />
  );
}