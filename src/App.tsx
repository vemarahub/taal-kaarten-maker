import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionRenewalPrompt from "./components/SessionRenewalPrompt";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthErrorBoundary from "./components/AuthErrorBoundary";
import Index from "./pages/Index";
import Vragenlijst from "./pages/Vragenlijst";
import Vocabulary from "./pages/Vocabulary";
import Grammar from "./pages/Grammar";
import Youtube from "./pages/Youtube";
import Culture from "./pages/Culture";
import Misc from "./pages/Misc";
import PracticeA2 from "./pages/PracticeA2";
import ReadingGame from "./pages/ReadingGame";
import KnmGame from "./pages/KnmGame";
import WritingGame from "./pages/WritingGame";
import SpeakingGame from "./pages/SpeakingGame";
import ListeningGame from "./pages/ListeningGame";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthErrorBoundary>
            <AuthProvider>
              <SessionRenewalPrompt />
              <Routes>
              {/* Public route - Login page */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Protected routes - All existing functionality */}
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/vragenlijst" element={<ProtectedRoute><Vragenlijst /></ProtectedRoute>} />
              <Route path="/vocabulary" element={<ProtectedRoute><Vocabulary /></ProtectedRoute>} />
              <Route path="/grammar" element={<ProtectedRoute><Grammar /></ProtectedRoute>} />
              <Route path="/youtube" element={<ProtectedRoute><Youtube /></ProtectedRoute>} />
              <Route path="/culture" element={<ProtectedRoute><Culture /></ProtectedRoute>} />
              <Route path="/misc" element={<ProtectedRoute><Misc /></ProtectedRoute>} />
              <Route path="/practice-a2" element={<ProtectedRoute><PracticeA2 /></ProtectedRoute>} />
              <Route path="/reading-game" element={<ProtectedRoute><ReadingGame /></ProtectedRoute>} />
              <Route path="/knm-game" element={<ProtectedRoute><KnmGame /></ProtectedRoute>} />
              <Route path="/writing-game" element={<ProtectedRoute><WritingGame /></ProtectedRoute>} />
              <Route path="/speaking-game" element={<ProtectedRoute><SpeakingGame /></ProtectedRoute>} />
              <Route path="/listening-game" element={<ProtectedRoute><ListeningGame /></ProtectedRoute>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
            </Routes>
            </AuthProvider>
          </AuthErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
