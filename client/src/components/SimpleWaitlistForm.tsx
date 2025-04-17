import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useConfetti } from '@/hooks/use-confetti';

export default function SimpleWaitlistForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  const { triggerCelebration } = useConfetti();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      const response = await apiRequest('POST', '/api/waitlist', { email });
      
      if (response.ok) {
        setFormState('success');
        setEmail('');
        
        // Delay the confetti slightly to let the success message appear first
        setTimeout(() => {
          triggerCelebration();
        }, 300);
      } else {
        setFormState('error');
        toast({
          title: t('waitlist.error'),
          description: t('waitlist.errorDetail'),
          variant: 'destructive'
        });
      }
    } catch (error) {
      setFormState('error');
      toast({
        title: t('waitlist.error'),
        description: t('waitlist.errorDetail'),
        variant: 'destructive'
      });
      console.error('Waitlist submission error:', error);
    }
  };

  return (
    <div className="waitlist-form-container">
      {formState === 'success' ? (
        <div className="success-message text-center p-4 bg-green-50 text-green-700 rounded-lg">
          <p className="font-medium">{t('waitlist.success')}</p>
          <p className="text-sm mt-2">{t('waitlist.successDetail')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('waitlist.placeholder')}
            required
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={formState === 'submitting'}
          />
          
          <button 
            type="submit" 
            disabled={formState === 'submitting'}
            className="px-4 py-2 bg-primary text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70"
          >
            {formState === 'submitting' ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('waitlist.submitting')}
              </span>
            ) : (
              t('waitlist.button')
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