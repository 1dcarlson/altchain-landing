import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * PageTransition component that provides smooth transitions between routes
 * Uses Framer Motion for high-quality animations
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const [location] = useLocation();
  
  // Animation variants for page transitions
  const variants = {
    initial: {
      opacity: 0,
      y: 8,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1], // Custom ease curve for smooth feel
      }
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className="min-h-[80vh]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}