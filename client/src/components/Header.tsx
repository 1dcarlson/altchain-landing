import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const { t } = useTranslation();
  
  return (
    <header className="bg-white py-5 px-6 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-primary font-bold text-2xl">AltChain</h1>
        <nav className="flex items-center gap-6">
          <a href="#" className="text-gray-600 hover:text-primary text-sm font-medium hidden sm:inline-block transition-colors">About</a>
          <LanguageSelector />
        </nav>
      </div>
    </header>
  );
}
