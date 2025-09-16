import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vragenlijst" element={<Vragenlijst />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/grammar" element={<Grammar />} />
          <Route path="/youtube" element={<Youtube />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/misc" element={<Misc />} />
          <Route path="/practice-a2" element={<PracticeA2 />} />
          <Route path="/reading-game" element={<ReadingGame />} />
          <Route path="/knm-game" element={<KnmGame />} />
          <Route path="/writing-game" element={<WritingGame />} />
          <Route path="/speaking-game" element={<SpeakingGame />} />
          <Route path="/listening-game" element={<ListeningGame />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
