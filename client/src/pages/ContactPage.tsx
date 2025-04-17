import { useTranslation } from 'react-i18next';
import SimpleContactForm from '@/components/SimpleContactForm';
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
        <section className="contact max-w-4xl mx-auto bg-white/5 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
          <p className="text-lg mb-8 text-center">
            We'd love to hear from you. Whether you have questions, feedback, or partnership ideas—reach out any time.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="rounded-xl overflow-hidden">
              <SimpleContactForm />
            </div>
            
            <div className="contact-info space-y-6 mt-8 md:mt-0">
              <div>
                <p className="text-xl font-bold mb-2">Location:</p>
                <p>Phoenix, AZ</p>
              </div>
              
              <div>
                <p className="text-xl font-bold mb-2">Email:</p>
                <p>
                  <a href="mailto:daniel@altchain.app" className="text-primary hover:underline">
                    daniel@altchain.app
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}