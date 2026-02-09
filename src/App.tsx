import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import FirebaseTest from "./pages/FirebaseTest";
import Profile from "./pages/Profile";
import AnimatedGradientBg from "./components/AnimatedGradientBg";
import ParticleBackground from "./components/ParticleBackground";
import LiquidScroll from "./components/LiquidScroll";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LiquidScroll>
            <AnimatedGradientBg />
            <ParticleBackground />
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/firebase-test" element={<FirebaseTest />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LiquidScroll>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
