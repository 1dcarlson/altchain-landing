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
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{t('faq.title')}</h2>
          <p className="text-gray-800 dark:text-gray-300 mt-4 font-medium">
            {t('faq.description')}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqKeys.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4 dark:border-gray-700">
              <AccordionTrigger className="text-left font-medium py-4 text-gray-800 dark:text-white">
                {t(`faq.questions.${faq.key}.question`)}
              </AccordionTrigger>
              <AccordionContent className="text-gray-800 dark:text-gray-300 font-medium pb-4 leading-relaxed">
                {t(`faq.questions.${faq.key}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 text-center">
          <p className="text-gray-800 dark:text-gray-300 font-medium">
            {t('faq.moreQuestions')} <a href="/contact" className="text-primary hover:underline font-semibold">{t('faq.contactTeam')}</a>
          </p>
        </div>
      </div>
    </section>
  );
}