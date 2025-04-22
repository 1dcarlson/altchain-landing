import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-primary font-bold text-lg">AltChain</h2>
            <p className="text-gray-700 text-sm mt-1 font-medium">{t('hero.title')}</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <Link href="/privacy-policy">
              <a className="text-gray-800 hover:text-primary text-sm font-medium">{t('footer.privacy')}</a>
            </Link>
            <Link href="/terms-of-service">
              <a className="text-gray-800 hover:text-primary text-sm font-medium">{t('footer.terms')}</a>
            </Link>
            <Link href="/contact">
              <a className="text-gray-800 hover:text-primary text-sm font-medium">{t('footer.contact')}</a>
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-700 text-sm font-medium">
          &copy; {new Date().getFullYear()} AltChain. {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
