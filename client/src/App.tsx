import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import InteractiveBackground from "@/components/InteractiveBackground";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";
import SmartLanguageSuggestion from "@/components/SmartLanguageSuggestion";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import ContactPage from "@/pages/ContactPage";
import { useTheme } from "@/hooks/theme-provider";
import { useMemo } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { isDark, timeTheme } = useTheme();
  
  // Apply consistent background color regardless of time theme
  const bgColorClass = useMemo(() => {
    if (isDark) {
      return 'bg-slate-900';
    }
    
    // Use the same bg color for all daytime themes for consistency
    return 'bg-white';
  }, [isDark]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <div 
        className={`${bgColorClass} min-h-screen will-change-auto`}
        style={{ 
          transition: 'background-color 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <InteractiveBackground />
        <ScrollProgressIndicator />
        <Router />
        <SmartLanguageSuggestion />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
