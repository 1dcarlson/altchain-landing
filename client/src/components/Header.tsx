import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const { t } = useTranslation();
  
  return (
    <header className="bg-white py-5 px-6 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-primary font-bold text-2xl cursor-pointer">AltChain</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/">
            <span className="text-gray-600 hover:text-primary text-sm font-medium hidden sm:inline-block transition-colors cursor-pointer">About</span>
          </Link>
          <LanguageSelector />
        </nav>
      </div>
    </header>
  );
}
