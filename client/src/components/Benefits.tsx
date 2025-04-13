import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function Benefits() {
  const { t } = useTranslation();

  // Using translation namespaces for benefits
  const benefitKeys = ["reducedTime", "riskMitigation", "costSavings"];
  
  const benefits = benefitKeys.map(key => {
    // Safely handle items, providing a fallback empty array if translation fails
    const itemsKey = `detailedBenefits.${key}.items`;
    let items: string[] = [];
    try {
      const translatedItems = t(itemsKey, { returnObjects: true });
      items = Array.isArray(translatedItems) ? translatedItems : [];
    } catch (error) {
      console.error(`Error translating ${itemsKey}:`, error);
      items = [];
    }
    
    return {
      key,
      items
    };
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold">{t('detailedBenefits.title')}</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {t('detailedBenefits.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-3 text-primary">
                {t(`detailedBenefits.${benefit.key}.title`)}
              </h3>
              <p className="text-gray-600 mb-6">
                {t(`detailedBenefits.${benefit.key}.description`)}
              </p>
              
              <ul className="space-y-3">
                {benefit.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="default" 
            size="lg" 
            className="group relative overflow-hidden"
            onClick={() => {
              // Smooth scroll to waitlist form
              const el = document.getElementById('waitlist-form');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            {t('cta.button')}
            <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:animate-bounce-subtle" />
          </Button>
        </div>
      </div>
    </section>
  );
}