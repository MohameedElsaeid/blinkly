
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import MyLinks from "./pages/MyLinks";
import Analytics from "./pages/Analytics";
import QRCodes from "./pages/QRCodes";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import CreateDynamicLink from "./pages/CreateDynamicLink";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ApiDocs from "./pages/ApiDocs";
import Pricing from "./pages/Pricing";
import CookieConsent from "./components/CookieConsent";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import SitemapXML from "./components/SitemapXML";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <CookieConsent />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/links" element={<MyLinks />} />
              <Route path="/dashboard/links/create" element={<CreateDynamicLink />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/dashboard/qr-codes" element={<QRCodes />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/sitemap.xml" element={<SitemapXML />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
