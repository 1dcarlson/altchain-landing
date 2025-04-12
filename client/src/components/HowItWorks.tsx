import { Brain, Database, Globe, LineChart, Network } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { t } = useTranslation();
  
  const stepIcons = [
    { key: "dataCollection", icon: <Database className="h-10 w-10 text-primary" /> },
    { key: "aiAnalysis", icon: <Brain className="h-10 w-10 text-primary" /> },
    { key: "globalMatching", icon: <Globe className="h-10 w-10 text-primary" /> },
    { key: "optimization", icon: <LineChart className="h-10 w-10 text-primary" /> },
    { key: "monitoring", icon: <Network className="h-10 w-10 text-primary" /> }
  ];
  
  // Create steps with translations
  const steps = stepIcons.map(item => ({
    ...item,
    title: t(`howItWorks.steps.${item.key}.title`),
    description: t(`howItWorks.steps.${item.key}.description`)
  }));

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold">{t('howItWorks.title')}</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {t('howItWorks.description')}
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white rounded-full border-2 border-primary shadow-sm">
                  {step.icon}
                </div>
                
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 bg-primary/5 p-8 rounded-xl border border-primary/10">
          <h3 className="text-xl font-semibold mb-4 text-center">{t('howItWorks.aiInsights.title')}</h3>
          <p className="text-center text-gray-700">
            {t('howItWorks.aiInsights.description')}
          </p>
        </div>
      </div>
    </section>
  );
}