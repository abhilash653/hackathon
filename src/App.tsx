import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import ExplorePage from "./pages/ExplorePage.tsx";
import LanguageTranslation from "./pages/LanguageTranslation.tsx";
import Bookings from "./pages/Bookings.tsx";
import GuideRegistration from "./pages/GuideRegistration.tsx";
import StreetFood from "./pages/StreetFood.tsx";
import LocalBusinessRegistration from "./pages/LocalBusinessRegistration.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/translate" element={<LanguageTranslation />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/guide-registration" element={<GuideRegistration />} />
            <Route path="/street-food" element={<StreetFood />} />
            <Route path="/local-business" element={<LocalBusinessRegistration />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
