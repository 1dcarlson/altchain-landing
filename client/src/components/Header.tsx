import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useMemo } from 'react';
import LanguageSelector from './LanguageSelector';
import LogoIcon from './LogoIcon';
import { useTheme } from '@/hooks/theme-provider';

export default function Header() {
  const { t } = useTranslation();
  const { isDark, colors } = useTheme();
  
  // Create dynamic header style
  const headerStyle = useMemo(() => {
    return {
      backgroundImage: 'var(--gradientPrimary)',
      boxShadow: isDark ? '0 2px 12px rgba(0, 0, 0, 0.15)' : '0 2px 12px rgba(0, 0, 0, 0.08)'
    };
  }, [isDark]);
  
  return (
    <header 
      className="py-5 px-6 sticky top-0 z-50 transition-gradient"
      style={headerStyle}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <LogoIcon />
            <span className="text-white font-bold text-2xl">AltChain</span>
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/">
            <span className="text-blue-100 hover:text-white text-sm font-medium transition-colors cursor-pointer">
              {t('about')}
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-blue-100 hover:text-white text-sm font-medium transition-colors cursor-pointer font-bold">
              {t('contact.navLink') || "Contact"}
            </span>
          </Link>
          <LanguageSelector />
        </nav>
      </div>
    </header>
  );
}
