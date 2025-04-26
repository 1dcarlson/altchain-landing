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
  
  // Animation variants
  const variants = {
    initial: { y: 0 },
    hover: { 
      y: -2,
      transition: { 
        type: 'spring', 
        stiffness: 500, 
        damping: 15 
      }
    },
    tap: { 
      y: 1,
      transition: { 
        duration: 0.1 
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