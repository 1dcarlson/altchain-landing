import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import NavLink from './NavLink';
import { motion } from 'framer-motion';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-4 md:mb-0"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-primary font-bold text-lg">AltChain</h2>
            <p className="text-gray-700 text-sm mt-1 font-medium">{t('hero.title')}</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-4 md:gap-8 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NavLink href="/privacy-policy" className="text-gray-800 hover:text-primary text-sm font-medium">
              {t('footer.privacy')}
            </NavLink>
            <NavLink href="/terms-of-service" className="text-gray-800 hover:text-primary text-sm font-medium">
              {t('footer.terms')}
            </NavLink>
            <NavLink href="/contact" className="text-gray-800 hover:text-primary text-sm font-medium">
              {t('footer.contact')}
            </NavLink>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 text-center text-gray-700 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          &copy; {new Date().getFullYear()} AltChain. {t('footer.copyright')}
        </motion.div>
      </div>
    </footer>
  );
}
