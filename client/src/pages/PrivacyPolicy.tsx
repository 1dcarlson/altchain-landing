import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-6">
        <div className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-3xl font-bold text-primary mb-8">{t('legal.privacyPolicy.title')}</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.intro.title')}</h2>
              <p>
                {t('legal.privacyPolicy.intro.p1')}
              </p>
              <p>
                {t('legal.privacyPolicy.intro.p2')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.infoCollect.title')}</h2>
              <p>
                <strong>{t('legal.privacyPolicy.infoCollect.personalData.title')}:</strong> {t('legal.privacyPolicy.infoCollect.personalData.content')}
              </p>
              <p>
                <strong>{t('legal.privacyPolicy.infoCollect.usageData.title')}:</strong> {t('legal.privacyPolicy.infoCollect.usageData.content')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.infoUse.title')}</h2>
              <p>{t('legal.privacyPolicy.infoUse.intro')}</p>
              <ul>
                <li>{t('legal.privacyPolicy.infoUse.purposes.provide')}</li>
                <li>{t('legal.privacyPolicy.infoUse.purposes.notify')}</li>
                <li>{t('legal.privacyPolicy.infoUse.purposes.support')}</li>
                <li>{t('legal.privacyPolicy.infoUse.purposes.monitor')}</li>
                <li>{t('legal.privacyPolicy.infoUse.purposes.technical')}</li>
                <li>{t('legal.privacyPolicy.infoUse.purposes.marketing')}</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.email.title')}</h2>
              <p>
                {t('legal.privacyPolicy.email.content')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.cookies.title')}</h2>
              <p>
                {t('legal.privacyPolicy.cookies.p1')}
              </p>
              <p>
                {t('legal.privacyPolicy.cookies.p2')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.security.title')}</h2>
              <p>
                {t('legal.privacyPolicy.security.content')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.providers.title')}</h2>
              <p>
                {t('legal.privacyPolicy.providers.p1')}
              </p>
              <p>
                {t('legal.privacyPolicy.providers.p2')}
              </p>
              <ul>
                <li>{t('legal.privacyPolicy.providers.sendgrid')}</li>
                <li>{t('legal.privacyPolicy.providers.database')}</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.rights.title')}</h2>
              <p>
                {t('legal.privacyPolicy.rights.intro')}
              </p>
              <ul>
                <li>{t('legal.privacyPolicy.rights.list.access')}</li>
                <li>{t('legal.privacyPolicy.rights.list.rectification')}</li>
                <li>{t('legal.privacyPolicy.rights.list.object')}</li>
                <li>{t('legal.privacyPolicy.rights.list.restriction')}</li>
                <li>{t('legal.privacyPolicy.rights.list.portability')}</li>
                <li>{t('legal.privacyPolicy.rights.list.withdraw')}</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.changes.title')}</h2>
              <p>
                {t('legal.privacyPolicy.changes.p1')}
              </p>
              <p>
                {t('legal.privacyPolicy.changes.p2')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.contact.title')}</h2>
              <p>
                {t('legal.privacyPolicy.contact.inquiry')}
              </p>
              <p>
                {t('legal.privacyPolicy.contact.email')}
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