import { useState, useEffect } from 'react';
import { apiRequest } from '../lib/queryClient';
import { useToast } from '../hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useConfetti } from '../hooks/use-confetti';
import ValidationInput from './ValidationInput';

export default function WaitlistForm() {
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
      const safeName = name.replace(/[^\w\s\-.,@']/gi, '').trim();
const response = await apiRequest('POST', '/api/waitlist', {
  email: email.trim(),
  name: safeName || undefined,
  language: currentLanguage
});
      
      // Always mark as success if we reached this point
      setFormState('success');
      setEmail('');
      setName('');
      
      // No need to call triggerConfetti here as we already have the useEffect below
      
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

  const resetForm = () => {
    setEmail('');
    setName('');
    setFormState('idle');
  };
  
  // Trigger confetti celebration when form submission is successful
  useEffect(() => {
    if (formState === 'success') {
      // Delay the confetti slightly to let the success message appear first
      setTimeout(() => {
        triggerWaitlistCelebration();
      }, 300);
    }
  }, [formState, triggerWaitlistCelebration]);

  return (
    <div id="waitlist-form" className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold mb-4">{t('waitlist.title') || "Join our waitlist"}</h3>
      <p className="text-gray-600 mb-6 text-sm">{t('waitlist.description') || "Be among the first to access AltChain's AI-powered sourcing platform."}</p>
      
      {formState === 'idle' || formState === 'submitting' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <ValidationInput 
              type="text" 
              name="name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder={t('waitlist.namePlaceholder') || "Your name (optional)"}
              autoComplete="name"
              className="py-3 text-gray-800 placeholder-gray-400 mb-3"
              disabled={formState === 'submitting'}
            />
          </div>
          <div className="relative">
            <ValidationInput 
              type="email" 
              name="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder={t('waitlist.placeholder') || "Your email address"}
              required
              autoComplete="email"
              className="py-3 text-gray-800 placeholder-gray-400"
              disabled={formState === 'submitting'}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={formState === 'submitting'}
            className="w-full py-3 px-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 disabled:opacity-70 relative overflow-hidden hover:shadow-lg hover:shadow-primary/30 group hover-lift hover-glow"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            {formState === 'submitting' ? (
              <span className="flex items-center justify-center relative z-10">
                <svg className="animate-spin h-5 w-5 text-white inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
      ) : formState === 'success' ? (
        <div className="animate-in fade-in py-6 text-center">
          <div className="bg-primary/10 text-primary-foreground p-6 rounded-lg mb-4 shadow-sm transition-all duration-500 hover-scale hover-glow cursor-default">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-bounce-subtle shadow-md">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h4 className="font-bold text-xl mb-2 text-gray-800">{t('waitlist.success')}</h4>
            <p className="text-sm mt-1 text-gray-700 font-medium">{t('waitlist.successDetail')}</p>
          </div>
          <div className="mt-3 text-center">
            <p className="text-primary font-medium animate-pulse-subtle">🎉 {t('waitlist.congratulations')}</p>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in py-6">
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
            <p className="font-medium">{t('waitlist.error')}</p>
            <p className="text-sm mt-1">{t('waitlist.errorDetail')}</p>
          </div>
          <button 
            onClick={resetForm}
            className="text-primary hover:text-primary/90 font-medium text-sm transition-all duration-300 py-2 px-3 rounded-md hover:bg-primary/5 hover-lift"
          >
            {t('waitlist.tryAgain')}
          </button>
        </div>
      )}
    </div>
  );
}
