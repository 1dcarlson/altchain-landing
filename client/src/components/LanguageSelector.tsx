import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  // Hard-code language names instead of using translations to avoid circular reference
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'zh', name: '中文' },
    { code: 'fr', name: 'Français' },
    { code: 'ru', name: 'Русский' }
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-sm focus:outline-none text-blue-100 hover:text-white transition-colors">
        <Globe className="h-4 w-4" />
        <span className="hidden md:inline">{languages.find(lang => lang.code === i18n.language)?.name || 'English'}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem 
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`cursor-pointer ${i18n.language === language.code ? 'font-medium text-blue-900' : ''}`}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;