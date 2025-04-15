import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useConfetti } from "@/hooks/use-confetti";

export default function ContactForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { triggerConfetti } = useConfetti();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t('contact.error'),
        description: t('contact.validationError'),
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Clear form
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        
        // Show success toast
        toast({
          title: t('contact.success'),
          description: t('contact.successMessage'),
        });
        
        // Trigger confetti celebration
        triggerConfetti();
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: t('contact.error'),
        description: typeof error === 'string' ? error : t('contact.errorMessage'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-card rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-center mb-6">{t('contact.title')}</h3>
      
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          {t('contact.name')}
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t('contact.namePlaceholder')}
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          {t('contact.email')}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t('contact.emailPlaceholder')}
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          {t('contact.message')}
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t('contact.messagePlaceholder')}
          rows={5}
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="mr-2">{t('contact.sending')}</span>
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
          </>
        ) : (
          t('contact.submit')
        )}
      </Button>
    </form>
  );
}