import { useTranslation } from "react-i18next"; 
import { Activity, Shield, BarChart3 } from "lucide-react";

export default function Features() {
  const { t } = useTranslation();
  
  // Simple features array with no complex types
  const features = [
    {
      icon: <Activity className="h-6 w-6 text-primary" />,
      title: t('features.riskAnalysis.title') || "Risk Analysis",
      description: t('features.riskAnalysis.description') || "Analyze and mitigate risks in your global supply chain with AI insights."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: t('features.compliance.title') || "Compliance Management",
      description: t('features.compliance.description') || "Stay compliant with changing trade regulations and requirements worldwide."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: t('features.costOptimization.title') || "Cost Optimization",
      description: t('features.costOptimization.description') || "Identify cost-saving opportunities and optimize your sourcing strategy."
    }
  ];

  return (
    <section className="bg-white py-16 z-10 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{t('features.title') || 'Why choose AltChain?'}</h3>
          <p className="text-gray-800 font-medium mt-4 max-w-2xl mx-auto">{t('features.description') || 'Our AI-powered platform helps you navigate global sourcing with confidence.'}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 text-center relative">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h4>
              <p className="text-gray-800 text-sm font-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
