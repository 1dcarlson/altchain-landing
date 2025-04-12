import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

interface FAQItem {
  key: string;
}

export default function FAQ() {
  const { t } = useTranslation();
  
  // Using question keys from translation files
  const faqKeys: FAQItem[] = [
    { key: "aiTechnology" },
    { key: "implementation" },
    { key: "integration" },
    { key: "industries" },
    { key: "security" },
    { key: "support" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">{t('faq.title')}</h2>
          <p className="text-gray-600 mt-4">
            {t('faq.description')}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqKeys.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium py-4">
                {t(`faq.questions.${faq.key}.question`)}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                {t(`faq.questions.${faq.key}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            {t('faq.moreQuestions')} <a href="#" className="text-primary hover:underline">{t('faq.contactTeam')}</a>
          </p>
        </div>
      </div>
    </section>
  );
}