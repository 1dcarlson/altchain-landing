import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const { t } = useTranslation();
  
  return (
    <header className="bg-blue-900 py-5 px-6 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.svg" alt="AltChain Logo" className="w-8 h-8" />
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
