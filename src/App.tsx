import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import SubscriptionExpiryBanner from '@/components/SubscriptionExpiryBanner';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import AdminDocuments from './pages/AdminDocuments';
import AdminReports from './pages/AdminReports';
import NotificationPreferences from './pages/NotificationPreferences';
import Subscription from './pages/Subscription';
import SearchResults from './pages/SearchResults';
import InstitutionPage from './pages/InstitutionPage';
import GeneratorPage from './pages/GeneratorPage';
import FAQ from './pages/FAQ';
import Impressum from './pages/Impressum';
import Cookies from './pages/Cookies';
import Laws from './pages/Laws';
import MunicipalityForms from './pages/MunicipalityForms';
import FormDetail from './pages/FormDetail';
import Guide from './pages/Guide';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Support from './pages/Support';
import AuditLog from './pages/AuditLog';
import DeleteAccount from './pages/DeleteAccount';
import Dashboard from './pages/Dashboard';
import AIChatbot from './components/AIChatbot';

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            {/* Subscription Expiry Notification Banner */}
            <SubscriptionExpiryBanner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/documents" element={<AdminDocuments />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/pricing" element={<Subscription />} />
              <Route path="/pretplata" element={<Subscription />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/municipality/:slug" element={<MunicipalityForms />} />
              <Route path="/institucija/:slug" element={<InstitutionPage />} />
              <Route path="/generator" element={<GeneratorPage />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/zakoni" element={<Laws />} />
              <Route path="/form/:formId" element={<FormDetail />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/support" element={<Support />} />
              <Route path="/audit-log" element={<AuditLog />} />
              <Route path="/delete-account" element={<DeleteAccount />} />
              <Route path="/notifications/preferences" element={<NotificationPreferences />} />
              {/* BH PapirFinder subpath - maps to search */}
              <Route path="/bhpapirfinder" element={<Index />} />
              <Route path="/bhpapirfinder/search" element={<SearchResults />} />
              {/* Redirect all unknown routes to homepage instead of 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {/* Floating AI Chatbot — available on all pages */}
            <AIChatbot />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;