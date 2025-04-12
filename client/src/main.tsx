import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import App from "./App";
import "./index.css";
import { queryClient } from "./lib/queryClient";
import "./i18n"; // Import i18n configuration

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  </QueryClientProvider>
);
