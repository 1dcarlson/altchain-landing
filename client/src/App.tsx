import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import InteractiveBackground from "./components/InteractiveBackground";
import ScrollProgressIndicator from "./components/ScrollProgressIndicator";
import ScrollToTop from "./components/ScrollToTop";
import LanguageSuggestion from "./components/LanguageSuggestion";
import PageTransition from "./components/PageTransition";
import FadeBackground from "./components/FadeBackground";
import NotFound from "./pages/not-found";
import HomePage from "./pages/HomePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactPage from "./pages/ContactPage";
import { useTheme } from "./hooks/theme-provider";
import React from "react";

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
  
  // Theme provider now handles applying all dark mode classes
  // No need for additional useEffect here
  
  return (
    <QueryClientProvider client={queryClient}>
      <div 
        className="min-h-screen will-change-auto relative"
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
