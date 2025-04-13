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

// Animation variants for flag
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

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>(i18n.language || 'en');

  // Update the selected flag when language changes
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
              className="w-6 h-6 rounded-full overflow-hidden"
            >
              {/* Globe icon as fallback if flag loading fails */}
              <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center bg-white/10">
                  <Globe className="w-4 h-4 text-blue-500" />
                </div>
                <img 
                  src={`/flags/${currentLanguage.code}.svg`}
                  alt={currentLanguage.name} 
                  className="relative z-10 w-full h-full object-cover shadow-sm"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
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
                <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe className="w-3 h-3 text-blue-300" />
                    </div>
                    <img 
                      src={`/flags/${language.code}.svg`}
                      alt={language.name} 
                      className="relative z-10 w-full h-full object-cover group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
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