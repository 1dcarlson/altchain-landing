import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Benefits() {
  const benefits = [
    {
      title: "Reduced Sourcing Time",
      description: "Cut research time by up to 70% with AI-powered supplier discovery and intelligent recommendations.",
      items: [
        "AI-driven supplier matching based on your specific requirements",
        "Automated background checks on potential suppliers",
        "Smart filters to quickly identify the most viable options"
      ]
    },
    {
      title: "Risk Mitigation",
      description: "Identify and avoid potential supply chain disruptions before they impact your operations.",
      items: [
        "Real-time monitoring of geopolitical factors affecting supply chains",
        "Supplier financial stability assessments",
        "Diversification recommendations to reduce single-source risks"
      ]
    },
    {
      title: "Cost Savings",
      description: "Optimize sourcing decisions to significantly lower costs while maintaining quality standards.",
      items: [
        "Comparative pricing across multiple regions and suppliers",
        "Hidden cost analysis (shipping, tariffs, compliance)",
        "Negotiation assistance with data-backed insights"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold">Transform Your Sourcing Strategy</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            AltChain delivers measurable improvements to your global sourcing operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-3 text-primary">{benefit.title}</h3>
              <p className="text-gray-600 mb-6">{benefit.description}</p>
              
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
            className="group"
            onClick={() => {
              // Smooth scroll to waitlist form
              const el = document.getElementById('waitlist-form');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Join Waitlist
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}