import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfetti } from "@/hooks/use-confetti";
import ValidationInput from './ValidationInput';
import ValidationTextarea from './ValidationTextarea';

export default function ContactForm() {
  const { t } = useTranslation();
  const { triggerConfetti } = useConfetti();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Check if all required fields have values
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    const isValid = updatedData.name.trim() !== '' && 
                   updatedData.email.trim() !== '' &&
                   updatedData.message.trim() !== '';
    setFormValid(isValid);
  };

  // Function to reset the form completely
  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setSubmitted(false);
    setFormValid(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(t('contact.sending'));
    setSubmitted(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus(t('contact.success') + ' ✅');
        // Reset the form completely
        resetForm();
        // After a successful submission, show the confetti
        triggerConfetti();
        
        // After 5 seconds, clear the success message
        setTimeout(() => {
          setStatus('');
        }, 5000);
      } else {
        setStatus(result.error || t('contact.error') + ' ❌');
      }
    } catch (error) {
      setStatus(t('contact.errorMessage') + ' ❌');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6 animate-slide-down">{t('contact.title')}</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4">
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 mb-1 animate-slide-down">
            {t('contact.name')}
          </label>
          <ValidationInput
            type="text"
            name="name"
            placeholder={t('contact.namePlaceholder')}
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={50}
            autoComplete="name"
            className={`py-3 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 dark:border-gray-700 bg-white shadow-sm border border-gray-200 rounded-md px-4 ${submitted && !formData.name && formData.name !== '' ? 'animate-shake border-red-500' : ''}`}
          />
        </div>
        
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 mb-1 animate-slide-down">
            {t('contact.email')}
          </label>
          <ValidationInput
            type="email"
            name="email"
            placeholder={t('contact.emailPlaceholder')}
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className={`py-3 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 dark:border-gray-700 bg-white shadow-sm border border-gray-200 rounded-md px-4 ${submitted && !formData.email && formData.email !== '' ? 'animate-shake border-red-500' : ''}`}
          />
        </div>
        
        <div className="flex flex-col space-y-1">
          <label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 mb-1 animate-slide-down">
            {t('contact.message')}
          </label>
          <ValidationTextarea
            name="message"
            placeholder={t('contact.messagePlaceholder')}
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={500}
            className={`py-3 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 dark:border-gray-700 bg-white shadow-sm border border-gray-200 rounded-md px-4 ${submitted && !formData.message && formData.message !== '' ? 'animate-shake border-red-500' : ''}`}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`
            w-full py-3 px-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg 
            transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0
            focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2
            disabled:opacity-70 relative overflow-hidden hover:shadow-lg hover:shadow-primary/30 group
            ${formValid ? 'animate-pulse-once' : ''}
          `}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('contact.sending')}
            </span>
          ) : (
            t('contact.submit')
          )}
        </button>
        
        {status && (
          <div className={`
            text-center mt-3 p-3 rounded-md animate-slide-up
            ${status.includes('❌') ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}
          `}>
            <p className="font-medium">{status}</p>
          </div>
        )}
      </form>
    </section>
  );
}