import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import LanguageSelector from './LanguageSelector';
import LogoIcon from './LogoIcon';
import TimeThemeIndicator from './TimeThemeIndicator';
import { useTheme } from '@/hooks/theme-provider';
import Tooltip from './ui/custom-tooltip';

export default function Header() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  
  return (
    <header 
      className={`
        py-5 px-6 shadow-md sticky top-0 z-50 transition-colors duration-700
        ${isDark 
          ? 'bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800' 
          : 'bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700'}
      `}
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
            <span className="text-blue-100 hover:text-white text-sm font-medium hidden sm:inline-block transition-colors cursor-pointer">
              {t('about')}
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-blue-100 hover:text-white text-sm font-medium hidden sm:inline-block transition-colors cursor-pointer">
              {t('contact.navLink')}
            </span>
          </Link>
          <Tooltip content={t('timeTheme.adaptiveTheme')}>
            <div className="hidden md:block">
              <TimeThemeIndicator />
            </div>
          </Tooltip>
          <LanguageSelector />
        </nav>
      </div>
    </header>
  );
}
