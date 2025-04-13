import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import LanguageSelector from './LanguageSelector';
import LogoIcon from './LogoIcon';

export default function Header() {
  const { t } = useTranslation();
  
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 py-5 px-6 shadow-md sticky top-0 z-50">
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
          <LanguageSelector />
        </nav>
      </div>
    </header>
  );
}
