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
import SupabaseTest from "./pages/SupabaseTest";
import DebugSupabase from "./pages/DebugSupabase";
import AuthDebug from "./pages/AuthDebug";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import VideoGenerator from "./pages/VideoGenerator";
import ContentLibrary from "./pages/ContentLibrary";
import Analytics from "./pages/Analytics";
import Platforms from "./pages/Platforms";
import Settings from "./pages/Settings";
import Recommendations from "./pages/Recommendations";
import ProtectedRoute from "./components/ProtectedRoute";
import AnimatedGradientBg from "./components/AnimatedGradientBg";
import ParticleBackground from "./components/ParticleBackground";
import LiquidScroll from "./components/LiquidScroll";
import Navbar from "./components/Navbar";
import RAFDebug from "./components/RAFDebug";
import { AuthProvider } from "./contexts/SupabaseAuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <RAFDebug />
        <BrowserRouter>
          <Routes>
            {/* Public routes with landing page styling */}
            <Route
              path="/"
              element={
                <LiquidScroll>
                  <AnimatedGradientBg />
                  <ParticleBackground />
                  <Navbar />
                  <Index />
                </LiquidScroll>
              }
            />
            <Route
              path="/login"
              element={
                <LiquidScroll>
                  <AnimatedGradientBg />
                  <ParticleBackground />
                  <Navbar />
                  <Login />
                </LiquidScroll>
              }
            />
            <Route
              path="/signup"
              element={
                <LiquidScroll>
                  <AnimatedGradientBg />
                  <ParticleBackground />
                  <Navbar />
                  <Signup />
                </LiquidScroll>
              }
            />

            {/* Protected dashboard routes (no landing page styling) */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/create"
              element={
                <ProtectedRoute>
                  <VideoGenerator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/library"
              element={
                <ProtectedRoute>
                  <ContentLibrary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/platforms"
              element={
                <ProtectedRoute>
                  <Platforms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/recommendations"
              element={
                <ProtectedRoute>
                  <Recommendations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Legacy routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/firebase-test" element={<FirebaseTest />} />
            <Route path="/supabase-test" element={<SupabaseTest />} />
            <Route path="/debug" element={<DebugSupabase />} />
            <Route path="/auth-debug" element={<AuthDebug />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
