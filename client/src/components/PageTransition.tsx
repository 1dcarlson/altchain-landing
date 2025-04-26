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
  
  // Animation variants for page transitions - refined for smoother feel
  const variants = {
    initial: {
      opacity: 0,
      y: 5,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier curve for smoother easing
        staggerChildren: 0.1, // Add stagger effect for child elements
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
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