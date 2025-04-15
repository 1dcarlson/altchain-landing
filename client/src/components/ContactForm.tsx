import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfetti } from "@/hooks/use-confetti";

export default function ContactForm() {
  const { t } = useTranslation();
  const { triggerConfetti } = useConfetti();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(t('contact.sending'));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus(t('contact.success') + ' ✅');
        setFormData({ name: '', email: '', message: '' });
        triggerConfetti();
      } else {
        setStatus(result.error || t('contact.error') + ' ❌');
      }
    } catch (error) {
      setStatus(t('contact.errorMessage') + ' ❌');
    }
  };

  return (
    <section className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">{t('contact.title')}</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4">
        <div className="flex flex-col">
          <input
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            type="text"
            name="name"
            placeholder={t('contact.namePlaceholder')}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="flex flex-col">
          <input
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            type="email"
            name="email"
            placeholder={t('contact.emailPlaceholder')}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="flex flex-col">
          <textarea
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            name="message"
            placeholder={t('contact.messagePlaceholder')}
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          {t('contact.submit')}
        </button>
        
        {status && (
          <p className={`text-center mt-2 ${status.includes('❌') ? 'text-red-500' : 'text-green-500'}`}>
            {status}
          </p>
        )}
      </form>
    </section>
  );
}