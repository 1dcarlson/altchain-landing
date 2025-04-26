import { Link, useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

/**
 * NavLink component with smooth transition effects
 * Uses Framer Motion for animations and automatically detects active state
 */
export default function NavLink({ href, children, className = '', activeClassName = 'active' }: NavLinkProps) {
  const [isActive] = useRoute(href);
  
  // Enhanced animation variants for smoother feel
  const variants = {
    initial: { y: 0 },
    hover: { 
      y: -2,
      scale: 1.03,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 17,
        mass: 0.8  // Lower mass for quicker response
      }
    },
    tap: { 
      y: 1,
      scale: 0.98,
      transition: { 
        duration: 0.15,
        ease: [0.3, 0.7, 0.4, 1]
      }
    }
  };
  
  return (
    <Link href={href}>
      <motion.span
        className={`${className} ${isActive ? activeClassName : ''} cursor-pointer`}
        variants={variants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        transition={{ duration: 0.1 }}
      >
        {children}
      </motion.span>
    </Link>
  );
}