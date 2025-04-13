import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Animation variants for indicator
const flagVariants = {
  initial: { scale: 0.8, opacity: 0, rotate: -10 },
  animate: { scale: 1, opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 20 } },
  exit: { scale: 0.8, opacity: 0, rotate: 10, transition: { duration: 0.2 } },
  hover: { scale: 1.1, rotate: 5, transition: { type: "spring", stiffness: 400, damping: 10 } }
};

// Animation for menu items
const menuItemVariants = {
  initial: { opacity: 0, y: 5 },
  animate: (i: number) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { 
      delay: i * 0.05,
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    } 
  }),
  exit: { opacity: 0, y: -5 },
  hover: { scale: 1.05, x: 5, transition: { type: "spring", stiffness: 300, damping: 10 } }
};

// Flag SVG definitions directly embedded
const flagSvgs = {
  en: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="#ffffff" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 13.8462H22V12.0001H2V13.8462ZM2 17.5385H22V15.6923H2V17.5385ZM2 21.2308H22V19.3846H2V21.2308ZM2 10.1539H22V8.30774H2V10.1539ZM2 6.46158H22V4.61543H2V6.46158Z" fill="#F93939"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 4.61536C2 3.17158 3.17158 2 4.61536 2H11.9999V10.1538H2V4.61536Z" fill="#1A47B8"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.69238 3.69238L4.00007 4.61546L4.92315 4.30777L4.61546 5.23085L5.53853 5.53854L4.61546 5.84623L4.92315 6.76931L4.00007 6.46162L3.69238 7.38469L3.38469 6.46162L2.46161 6.76931L2.7693 5.84623L1.84622 5.53854L2.7693 5.23085L2.46161 4.30777L3.38469 4.61546L3.69238 3.69238Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.38452 6.46154L7.69221 7.38461L8.61529 7.07692L8.3076 8.00L9.23067 8.30769L8.3076 8.61538L8.61529 9.53846L7.69221 9.23077L7.38452 10.1538L7.07683 9.23077L6.15375 9.53846L6.46144 8.61538L5.53836 8.30769L6.46144 8.00L6.15375 7.07692L7.07683 7.38461L7.38452 6.46154Z" fill="white"/>
    </svg>
  ),
  es: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="#ffffff" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="#F93939"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.3916 2.64129V21.3587C10.2107 21.7688 11.0894 22 12.0003 22C12.9112 22 13.7899 21.7688 14.609 21.3587V2.64129C13.7899 2.23116 12.9112 2 12.0003 2C11.0894 2 10.2107 2.23116 9.3916 2.64129Z" fill="#FFDA2C"/>
      <path d="M7.30469 10.087H8.35295V10.9131H7.30469V10.087Z" fill="#D7280F"/>
    </svg>
  ),
  zh: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="#ffffff" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="#F93939"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.7825 8.43475L7.47337 6.29045L8.1642 8.43475L6.26074 7.12695H8.68604L6.7825 8.43475Z" fill="#FFDA2C"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.91299 5.73911L10.2584 6.9569L10.6038 5.73911L9.65207 6.43694H11.0556L9.91299 5.73911Z" fill="#FFDA2C"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.6087 8.56519L11.3821 7.32343L11.8956 8.64H10.7391L12.0608 7.83825L10.6087 8.56519Z" fill="#FFDA2C"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.56522 10.7825L10.6071 10.0217L10.666 11.3282L11.3043 10.1478L11.4047 11.4631L9.56522 10.7825Z" fill="#FFDA2C"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.30444 11.8261L8.67063 11.4903L8.21281 12.6956L9.09765 11.7912L8.59204 12.9909L7.30444 11.8261Z" fill="#FFDA2C"/>
    </svg>
  ),
  fr: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="#ffffff" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 16.4026 5.17475 20.0919 9.39131 21.3587V2.64129C5.17475 3.90817 2 7.59743 2 12Z" fill="#1A47B8"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M21.9996 12C21.9996 16.4026 18.8249 20.0919 14.6083 21.3587V2.64129C18.8249 3.90817 21.9996 7.59743 21.9996 12Z" fill="#F93939"/>
    </svg>
  ),
  ru: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="#ffffff" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 9.45048 3.01204 7.13815 4.66715 5.478C6.32226 3.81786 8.62805 2.8 12 2.8C15.372 2.8 17.6777 3.81786 19.3328 5.478C20.988 7.13815 22 9.45048 22 12H2Z" fill="#1A47B8"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 14.5495 3.01204 16.8618 4.66715 18.522C6.32226 20.1821 8.62805 21.2 12 21.2C15.372 21.2 17.6777 20.1821 19.3328 18.522C20.988 16.8618 22 14.5495 22 12H2Z" fill="#F93939"/>
    </svg>
  )
};

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>(i18n.language || 'en');

  // Update the selected language when language changes
  useEffect(() => {
    setSelectedLang(i18n.language);
  }, [i18n.language]);

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
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLang) || languages[0];
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center gap-2 text-sm focus:outline-none text-blue-100 hover:text-white transition-colors p-1 rounded-full">
        <div className="relative flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLang}
              variants={flagVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center shadow-sm"
            >
              {flagSvgs[selectedLang as keyof typeof flagSvgs] || 
               <div className="bg-blue-500 w-full h-full flex items-center justify-center">
                 <Globe className="w-4 h-4 text-white" />
               </div>
              }
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="hidden md:inline font-medium">{currentLanguage.name}</span>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="min-w-[180px] p-1 rounded-xl">
        <AnimatePresence>
          {languages.map((language, index) => (
            <motion.div
              key={language.code}
              variants={menuItemVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={index}
              whileHover="hover"
            >
              <DropdownMenuItem 
                onClick={() => changeLanguage(language.code)}
                className={`cursor-pointer group flex items-center gap-3 rounded-lg transition-all ${
                  i18n.language === language.code ? 'bg-blue-50 text-blue-900 font-medium' : ''
                }`}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center shadow-sm">
                  {flagSvgs[language.code as keyof typeof flagSvgs] || 
                   <div className="bg-blue-500 w-full h-full flex items-center justify-center">
                     <Globe className="w-4 h-4 text-white" />
                   </div>
                  }
                </div>
                <span>{language.name}</span>
              </DropdownMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;