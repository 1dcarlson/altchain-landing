import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import WaitlistForm from "@/components/WaitlistForm";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import { CheckCircle } from "lucide-react";

export default function HomePage() {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center animate-pulse-once">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>

            <WaitlistForm />
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8">
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">{t('benefits.free')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">{t('benefits.noCard')}</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Value Proposition */}
        <Features />
        
        {/* Detailed Benefits */}
        <Benefits />
        
        {/* How It Works Process */}
        <HowItWorks />
        
        {/* FAQ */}
        <FAQ />
        
        {/* Final CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-lg text-gray-700 mb-8">
              {t('cta.description')}
            </p>
            <button 
              className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
              onClick={() => {
                // Smooth scroll to waitlist form
                const el = document.getElementById('waitlist-form');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t('cta.button')}
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
