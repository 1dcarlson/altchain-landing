import { useTranslation } from 'react-i18next';
import ContactForm from '@/components/ContactForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';

export default function ContactPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollProgressIndicator />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have questions, feedback, or partnership ideas—reach out any time.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-2">{t('contact.office')}</h3>
              <address className="not-italic">
                AltChain Inc.<br />
                Phoenix, AZ<br />
                United States
              </address>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">{t('contact.email')}</h3>
              <p><a href="mailto:daniel@altchain.app" className="text-primary hover:underline">daniel@altchain.app</a></p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">{t('contact.hours')}</h3>
              <p>{t('contact.businessHours')}</p>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden">
            <ContactForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}