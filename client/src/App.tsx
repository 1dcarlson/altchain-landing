import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import InteractiveBackground from "./components/InteractiveBackground";
import ScrollProgressIndicator from "./components/ScrollProgressIndicator";
import ScrollToTop from "./components/ScrollToTop";
import LanguageSuggestion from "./components/LanguageSuggestion";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/not-found";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ThemeProvider } from "./hooks/theme-provider";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <ScrollToTop />
          <ScrollProgressIndicator />
          <InteractiveBackground />
          <LanguageSuggestion />
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;
