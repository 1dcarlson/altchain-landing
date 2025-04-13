import { useTranslation } from "react-i18next"; 
import { Activity, Shield, BarChart3, Info } from "lucide-react";
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
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold">{t('features.title')}</h3>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{t('features.description')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center relative group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h4 className="text-lg font-semibold">
                    {t(`features.${feature.key}.title`)}
                  </h4>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="inline-flex items-center justify-center p-1 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                        <Info className="h-4 w-4 text-primary" />
                        <span className="sr-only">More information</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs p-4 text-left bg-white border-primary/10 shadow-lg">
                      <p className="text-sm text-gray-700">
                        {t(`features.${feature.key}.tooltip`)}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-gray-600 text-sm">
                  {t(`features.${feature.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
