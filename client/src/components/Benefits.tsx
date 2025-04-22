import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function Benefits() {
  const { t } = useTranslation();

  // Simple predefined benefits
  const benefitItems = [
    {
      title: t('detailedBenefits.reducedTime.title') || "Reduced Time",
      description: t('detailedBenefits.reducedTime.description') || "Save time with AI-powered sourcing recommendations.",
      items: [
        t('detailedBenefits.reducedTime.items.0') || "Automated supplier discovery",
        t('detailedBenefits.reducedTime.items.1') || "Quick risk assessment",
        t('detailedBenefits.reducedTime.items.2') || "Streamlined compliance checks"
      ]
    },
    {
      title: t('detailedBenefits.riskMitigation.title') || "Risk Mitigation",
      description: t('detailedBenefits.riskMitigation.description') || "Identify and mitigate supply chain risks proactively.",
      items: [
        t('detailedBenefits.riskMitigation.items.0') || "Real-time disruption alerts",
        t('detailedBenefits.riskMitigation.items.1') || "Alternative supplier recommendations",
        t('detailedBenefits.riskMitigation.items.2') || "Comprehensive risk scoring"
      ]
    },
    {
      title: t('detailedBenefits.costSavings.title') || "Cost Savings",
      description: t('detailedBenefits.costSavings.description') || "Optimize spending and identify savings opportunities.",
      items: [
        t('detailedBenefits.costSavings.items.0') || "Total landed cost calculation",
        t('detailedBenefits.costSavings.items.1') || "Automated price benchmarking",
        t('detailedBenefits.costSavings.items.2') || "Duty and tariff optimization"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{t('benefits.title') || "Detailed Benefits"}</h2>
          <p className="text-gray-800 font-medium mt-4 max-w-2xl mx-auto">
            {t('benefits.description') || "AltChain provides a comprehensive solution for global sourcing challenges."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefitItems.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-3 text-primary">
                {t(`detailedBenefits.${index === 0 ? 'reducedTime' : index === 1 ? 'riskMitigation' : 'costSavings'}.title`) || benefit.title}
              </h3>
              <p className="text-gray-800 font-medium mb-6">
                {t(`detailedBenefits.${index === 0 ? 'reducedTime' : index === 1 ? 'riskMitigation' : 'costSavings'}.description`) || benefit.description}
              </p>
              
              <ul className="space-y-3">
                {benefit.items.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-800 font-medium">{item}</span>
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
            {t('cta.button') || "Join Now"}
            <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}