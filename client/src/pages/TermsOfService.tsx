import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsOfService() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-6">
        <div className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-3xl font-bold text-primary mb-8">{t('legal.termsOfService.title')}</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold">{t('legal.termsOfService.intro.title')}</h2>
              <p>
                {t('legal.termsOfService.intro.p1')}
              </p>
              <p>
                {t('legal.termsOfService.intro.p2')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.termsOfService.waitlist.title')}</h2>
              <p>
                {t('legal.termsOfService.waitlist.content')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.termsOfService.communications.title')}</h2>
              <p>
                {t('legal.termsOfService.communications.content')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.termsOfService.ip.title')}</h2>
              <p>
                {t('legal.termsOfService.ip.p1')}
              </p>
              <p>
                {t('legal.termsOfService.ip.p2')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.termsOfService.links.title')}</h2>
              <p>
                {t('legal.termsOfService.links.p1')}
              </p>
              <p>
                {t('legal.termsOfService.links.p2')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.termsOfService.termination.title')}</h2>
              <p>
                {t('legal.termsOfService.termination.p1')}
              </p>
              <p>
                {t('legal.termsOfService.termination.p2')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.termsOfService.disclaimer.title')}</h2>
              <p>
                {t('legal.termsOfService.disclaimer.content')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.termsOfService.liability.title')}</h2>
              <p>
                {t('legal.termsOfService.liability.content')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.termsOfService.law.title')}</h2>
              <p>
                {t('legal.termsOfService.law.p1')}
              </p>
              <p>
                {t('legal.termsOfService.law.p2')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.termsOfService.changes.title')}</h2>
              <p>
                {t('legal.termsOfService.changes.p1')}
              </p>
              <p>
                {t('legal.termsOfService.changes.p2')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.termsOfService.contact.title')}</h2>
              <p>
                {t('legal.termsOfService.contact.inquiry')}
              </p>
              <p>
                {t('legal.termsOfService.contact.email')}
              </p>
            </section>
          </div>
          
          <p className="mt-10 text-sm text-gray-500">
            {t('legal.lastUpdated')}: {t('legal.date')}
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}