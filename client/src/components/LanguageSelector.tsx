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
const indicatorVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
  hover: { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 10 } }
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
    { code: 'en', name: 'English', color: '#1A47B8' },
    { code: 'es', name: 'Español', color: '#F93939' },
    { code: 'zh', name: '中文', color: '#DE2910' },
    { code: 'fr', name: 'Français', color: '#0055A4' },
    { code: 'ru', name: 'Русский', color: '#0039A6' }
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
              variants={indicatorVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center shadow-sm"
              style={{ backgroundColor: currentLanguage.color }}
            >
              <span className="text-white font-bold text-xs">
                {currentLanguage.code.toUpperCase().substring(0, 2)}
              </span>
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
                <div 
                  className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: language.color }}
                >
                  <span className="text-white font-bold text-xs">
                    {language.code.toUpperCase().substring(0, 2)}
                  </span>
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