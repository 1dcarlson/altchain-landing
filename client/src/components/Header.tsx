import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useMemo } from 'react';
import LanguageSelector from './LanguageSelector';
import LogoIcon from './LogoIcon';
import NavLink from './NavLink';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/theme-provider';

export default function Header() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  
  // Create dynamic header style
  const headerStyle = useMemo(() => {
    return {
      backgroundImage: 'var(--gradientPrimary)',
      boxShadow: isDarkMode ? '0 2px 12px rgba(0, 0, 0, 0.15)' : '0 2px 12px rgba(0, 0, 0, 0.08)'
    };
  }, [isDarkMode]);
  
  return (
    <header 
      className="py-5 px-6 sticky top-0 z-50 transition-gradient"
      style={headerStyle}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <LogoIcon />
            <span className="text-white font-bold text-2xl">AltChain</span>
          </motion.div>
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink 
            href="/" 
            className="text-blue-100 hover:text-white text-sm font-medium transition-colors"
            activeClassName="text-white font-medium"
          >
            {t('about')}
          </NavLink>
          <NavLink 
            href="/contact" 
            className="text-blue-100 hover:text-white text-sm font-medium transition-colors"
            activeClassName="text-white font-bold"
          >
            {t('contact.navLink') || "Contact"}
          </NavLink>
          <LanguageSelector />
        </nav>
      </div>
    </header>
  );
}
