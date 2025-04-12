import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const faqs: FAQItem[] = [
    {
      question: "How does AltChain's AI technology work?",
      answer: "AltChain's AI analyzes millions of data points from global trade databases, news sources, and industry reports to identify optimal sourcing opportunities. Our machine learning algorithms continually improve by learning from real-world outcomes, providing increasingly accurate recommendations over time."
    },
    {
      question: "How long does it take to implement AltChain?",
      answer: "Most companies can get started with AltChain in less than a week. Our onboarding team will help you set up your account, import your existing supplier data, and configure your specific requirements and preferences. Full integration with your existing procurement systems typically takes 2-4 weeks."
    },
    {
      question: "Can AltChain integrate with our existing procurement software?",
      answer: "Yes, AltChain is designed to integrate seamlessly with popular procurement and ERP systems including SAP, Oracle, NetSuite, and Coupa. We offer standardized APIs and pre-built connectors to ensure smooth data flow between systems."
    },
    {
      question: "What industries does AltChain serve?",
      answer: "AltChain supports global sourcing across multiple industries including manufacturing, electronics, consumer goods, automotive, pharmaceuticals, and textiles. Our platform is customizable to address the specific sourcing challenges in each industry."
    },
    {
      question: "How does AltChain keep our sourcing data secure?",
      answer: "We implement bank-level security measures including encryption at rest and in transit, regular security audits, and strict access controls. Our platform complies with GDPR, CCPA, and other major data protection regulations. We never share your proprietary sourcing data with other customers."
    },
    {
      question: "What kind of support does AltChain provide?",
      answer: "All customers receive dedicated onboarding support and ongoing technical assistance. Our Premium and Enterprise plans include a dedicated sourcing advisor who provides strategic guidance and helps you maximize the value of our platform."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-4">
            Find answers to common questions about AltChain's AI-powered sourcing platform.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Have more questions? <a href="#" className="text-primary hover:underline">Contact our team</a>
          </p>
        </div>
      </div>
    </section>
  );
}