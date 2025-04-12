import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      const response = await apiRequest('POST', '/api/waitlist', { email });
      
      if (response.ok) {
        setFormState('success');
        setEmail('');
      } else {
        setFormState('error');
        toast({
          title: 'Error',
          description: 'Failed to join waitlist. Please try again.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      setFormState('error');
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive'
      });
      console.error('Waitlist submission error:', error);
    }
  };

  const resetForm = () => {
    setEmail('');
    setFormState('idle');
  };

  return (
    <div id="waitlist-form" className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold mb-4">Join our waitlist</h3>
      <p className="text-gray-600 mb-6 text-sm">Be among the first to access our AI-powered sourcing platform.</p>
      
      {formState === 'idle' || formState === 'submitting' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors text-gray-800 placeholder-gray-400"
              disabled={formState === 'submitting'}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={formState === 'submitting'}
            className="w-full py-3 px-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 disabled:opacity-70"
          >
            {formState === 'submitting' ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Join Waitlist"
            )}
          </button>
        </form>
      ) : formState === 'success' ? (
        <div className="animate-in fade-in py-6 text-center">
          <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-4">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <p className="font-medium">Thank you for joining our waitlist!</p>
            <p className="text-sm mt-1">We'll be in touch when we're ready to onboard new users.</p>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in py-6">
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
            <p className="font-medium">Something went wrong!</p>
            <p className="text-sm mt-1">Please try again or contact support if the problem persists.</p>
          </div>
          <button 
            onClick={resetForm}
            className="text-primary hover:text-primary/90 font-medium text-sm"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
