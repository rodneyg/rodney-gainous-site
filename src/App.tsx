
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const HeroDemo = lazy(() =>
  import("./pages/HeroDemo").then((module) => ({ default: module.HeroDemo }))
);
const demoHosts = new Set(["localhost", "127.0.0.1"]);
const isDemoHost = demoHosts.has(window.location.hostname) || window.location.hostname.endsWith(".vercel.app");
const isHeroDemo = isDemoHost && new URLSearchParams(window.location.search).get("demo") === "hero";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
    >
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route
              path="/"
              element={
                isHeroDemo ? (
                  <Suspense
                    fallback={
                      <div className="flex min-h-dvh items-center justify-center text-sm text-muted-foreground">
                        Loading preview...
                      </div>
                    }
                  >
                    <HeroDemo />
                  </Suspense>
                ) : (
                  <Index />
                )
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
