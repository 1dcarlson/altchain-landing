import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import InteractiveBackground from "@/components/InteractiveBackground";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";
import ScrollToTop from "@/components/ScrollToTop";
import LanguageSuggestion from "@/components/LanguageSuggestion";
import PageTransition from "@/components/PageTransition";
import FadeBackground from "@/components/FadeBackground";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import ContactPage from "@/pages/ContactPage";
import { useTheme } from "@/hooks/theme-provider";
import { useMemo, useEffect } from "react";

function Router() {
  return (
    <PageTransition>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route component={NotFound} />
      </Switch>
    </PageTransition>
  );
}

function App() {
  const { isDarkMode } = useTheme();
  
  // Apply dark mode at the App level
  useEffect(() => {
    // Apply dark mode class and data-theme attribute for broader CSS targeting
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-mode');
    }
    
    // Force a body class for Tailwind dark: variants
    // Add or remove dark class while preserving other classes
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Apply background color based on dark mode preference
  const bgColorClass = useMemo(() => {
    return isDarkMode ? 'bg-slate-900 dark' : 'bg-white';
  }, [isDarkMode]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <div 
        className={`${bgColorClass} min-h-screen will-change-auto relative`}
        style={{ 
          transition: 'background-color 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <InteractiveBackground />
        <FadeBackground />
        <ScrollProgressIndicator />
        <ScrollToTop />
        <Router />
        <LanguageSuggestion />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
