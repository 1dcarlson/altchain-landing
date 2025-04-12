import { Brain, Database, Globe, LineChart, Network } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: "Data Collection",
      description: "Our AI continuously gathers data from thousands of global sources, including trade publications, government databases, and industry reports."
    },
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "AI Analysis",
      description: "Advanced machine learning algorithms analyze the data to identify patterns, risks, and opportunities specific to your industry and needs."
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Global Matching",
      description: "We connect you with verified suppliers and manufacturing partners across different regions that match your specific requirements."
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Optimization",
      description: "Compare scenarios and options with real-time cost analysis, risk assessment, and compliance verification."
    },
    {
      icon: <Network className="h-10 w-10 text-primary" />,
      title: "Continuous Monitoring",
      description: "Our platform continuously monitors your supply chain for potential disruptions and recommends alternative strategies when needed."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold">How AltChain Works</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our advanced AI technology transforms complex global sourcing into a streamlined, data-driven process.
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
          <h3 className="text-xl font-semibold mb-4 text-center">AI-Powered Insights</h3>
          <p className="text-center text-gray-700">
            AltChain's proprietary algorithms process over 10 million data points daily to provide you with the most accurate and up-to-date sourcing intelligence. Our AI identifies opportunities and risks that would be impossible to discover through traditional research methods.
          </p>
        </div>
      </div>
    </section>
  );
}