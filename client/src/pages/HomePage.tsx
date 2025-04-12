import Header from "@/components/Header";
import WaitlistForm from "@/components/WaitlistForm";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center animate-pulse-once">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Smarter Global Sourcing <span className="text-primary">with AI</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              AltChain helps companies worldwide navigate the evolving landscape of trade wars, tariffs, and supply chain shifts — using AI to optimize sourcing, reduce risk, and save time.
            </p>

            <WaitlistForm />
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8">
              <div className="flex items-center gap-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Free for early access</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">No credit card required</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Value Proposition */}
        <Features />
        
        {/* Detailed Benefits */}
        <Benefits />
        
        {/* How It Works Process */}
        <HowItWorks />
        
        {/* FAQ */}
        <FAQ />
        
        {/* Final CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Global Sourcing?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Join the waitlist today and be among the first to leverage AltChain's AI-powered sourcing platform.
            </p>
            <button 
              className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
              onClick={() => {
                // Smooth scroll to waitlist form
                const el = document.getElementById('waitlist-form');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Join Waitlist
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
