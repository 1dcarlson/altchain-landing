import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useConfetti } from '@/hooks/use-confetti';

export default function SimpleWaitlistForm() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  const { triggerWaitlistCelebration } = useConfetti();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for name if provided
    if (name && name.trim().length < 2) {
      toast({
        title: "Invalid Name",
        description: "Name must be at least 2 characters long",
        variant: "destructive"
      });
      return;
    }
    
    setFormState('submitting');
    
    try {
      // Get current language and include it in the request
      const currentLanguage = i18n.language.split('-')[0]; // Get base language code (e.g., 'en' from 'en-US')
      const response = await apiRequest('POST', '/api/waitlist', { 
        email, 
        name: name.trim() || undefined,
        language: currentLanguage
      });
      
      // Always mark as success if we reached this point
      setFormState('success');
      setEmail('');
      setName('');
      
      // Delay the confetti slightly to let the success message appear first
      setTimeout(() => {
        triggerWaitlistCelebration();
      }, 300);
      
      // Log the successful response
      const responseData = await response.json().catch(() => ({}));
      console.log('Waitlist submission successful:', responseData);
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setFormState('error');
      let errorMessage = t('waitlist.errorDetail');
      
      // Try to get a more specific error message if possible
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }
      
      toast({
        title: t('waitlist.error'),
        description: errorMessage,
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="waitlist-form-container w-full">
      {formState === 'success' ? (
        <div className="success-message text-center p-4 bg-green-50 text-green-700 rounded-lg">
          <p className="font-medium">{t('waitlist.success')}</p>
          <p className="text-sm mt-2">{t('waitlist.successDetail')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('waitlist.namePlaceholder') || "Your name (optional)"}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 transition-all duration-300 hover:border-primary/70 focus:border-primary/70 hover:shadow-sm"
              disabled={formState === 'submitting'}
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('waitlist.placeholder')}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 transition-all duration-300 hover:border-primary/70 focus:border-primary/70 hover:shadow-sm"
              disabled={formState === 'submitting'}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={formState === 'submitting'}
            className="w-full sm:w-auto sm:mx-auto px-6 py-2 bg-primary text-white font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70 hover-lift hover-glow relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            {formState === 'submitting' ? (
              <span className="flex items-center justify-center relative z-10">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('waitlist.submitting')}
              </span>
            ) : (
              <span className="relative z-10">{t('waitlist.button')}</span>
            )}
          </button>
        </form>
      )}
      
      {formState === 'error' && (
        <div className="error-message mt-2 text-red-600 text-sm">
          {t('waitlist.errorDetail')}
        </div>
      )}
    </div>
  );
}