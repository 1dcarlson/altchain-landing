import { useTranslation } from "react-i18next"; 
import { Activity, Shield, BarChart3, HelpCircle } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface Feature {
  icon: JSX.Element;
  key: string;
}

export default function Features() {
  const { t } = useTranslation();
  
  const features: Feature[] = [
    {
      icon: <Activity className="h-6 w-6 text-primary" />,
      key: "riskAnalysis"
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      key: "compliance"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      key: "costOptimization"
    }
  ];

  return (
    <TooltipProvider>
      <section className="bg-white py-16 z-10 relative"> {/* Added "relative" to fix z-index issues */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold">{t('features.title') || 'Why choose AltChain?'}</h3>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{t('features.description') || 'Our AI-powered platform helps you navigate global sourcing with confidence.'}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              // Fallback text in case translations are missing
              type FeatureKey = 'riskAnalysis' | 'compliance' | 'costOptimization';
              
              const fallbackTitles: Record<FeatureKey, string> = {
                riskAnalysis: 'Risk Analysis',
                compliance: 'Compliance Management',
                costOptimization: 'Cost Optimization'
              };
              
              const fallbackDescriptions: Record<FeatureKey, string> = {
                riskAnalysis: 'Analyze and mitigate risks in your global supply chain with AI insights.',
                compliance: 'Stay compliant with changing trade regulations and requirements worldwide.',
                costOptimization: 'Identify cost-saving opportunities and optimize your sourcing strategy.'
              };
              
              const fallbackTooltips: Record<FeatureKey, string> = {
                riskAnalysis: 'Our AI analyzes thousands of data points to identify potential supply chain disruptions before they affect your business.',
                compliance: 'Automatically check compliance with international trade regulations, tariffs, and country-specific requirements.',
                costOptimization: 'Compare suppliers, shipping routes, and total landed costs to maximize savings.'
              };
              
              // Type safety for feature key
              const featureKey = feature.key as FeatureKey;
              
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center relative group">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <div className="relative mb-2">
                    <h4 className="text-lg font-semibold inline-block">
                      {t(`features.${feature.key}.title`) || fallbackTitles[featureKey] || feature.key}
                    </h4>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <button className="inline-flex items-center justify-center ml-1 opacity-60 hover:opacity-100">
                          <HelpCircle className="h-4 w-4 text-primary/70" />
                          <span className="sr-only">More information</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" sideOffset={5} className="max-w-xs p-3 text-left bg-gray-50 border border-gray-100">
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {t(`features.${feature.key}.tooltip`) || fallbackTooltips[featureKey] || 'Learn more about this feature'}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {t(`features.${feature.key}.description`) || fallbackDescriptions[featureKey] || 'Feature description coming soon.'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
