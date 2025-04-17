import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfetti } from "@/hooks/use-confetti";

export default function SimpleContactForm() {
  const { t } = useTranslation();
  const { triggerConfetti } = useConfetti();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to reset the form completely
  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setSubmitted(false);
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
    <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-md p-6">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-medium">
          {t('contact.name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
            submitted && !formData.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium">
          {t('contact.email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
            submitted && !formData.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="message" className="block mb-2 font-medium">
          {t('contact.message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
            submitted && !formData.message ? 'border-red-500' : 'border-gray-300'
          }`}
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded
                 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50
                 disabled:opacity-70 relative overflow-hidden group"
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
          text-center mt-4 p-3 rounded-md
          ${status.includes('❌') ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}
        `}>
          <p className="font-medium">{status}</p>
        </div>
      )}
    </form>
  );
}