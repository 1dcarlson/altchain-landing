import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: t('language.en') },
    { code: 'es', name: t('language.es') },
    { code: 'zh', name: t('language.zh') },
    { code: 'fr', name: t('language.fr') }
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-sm focus:outline-none">
        <Globe className="h-4 w-4" />
        <span className="hidden md:inline">{languages.find(lang => lang.code === i18n.language)?.name || 'English'}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem 
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`cursor-pointer ${i18n.language === language.code ? 'font-medium text-primary' : ''}`}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;