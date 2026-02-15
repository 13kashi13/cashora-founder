import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { useState, FormEvent, useEffect } from "react";
import { toast } from "sonner";
import ScrollingPlatforms from "@/components/OrbitingPlatforms";

const Login = () => {
  const { signInWithGoogle, signInWithGithub, signInWithEmail, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingGithub, setLoadingGithub] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setLoadingGoogle(true);
      await signInWithGoogle();
      // Don't navigate here - OAuth will handle the redirect
    } catch (error: any) {
      setLoadingGoogle(false);
      toast.error(error.message || "Failed to sign in with Google");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setLoadingGithub(true);
      await signInWithGithub();
      // Don't navigate here - OAuth will handle the redirect
    } catch (error: any) {
      setLoadingGithub(false);
      toast.error(error.message || "Failed to sign in with GitHub");
    }
  };

  const handleEmailSignIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoadingEmail(true);
      await signInWithEmail(email, password);
      toast.success("Successfully signed in!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 pt-32 relative z-10">
      <motion.div
        className="w-full max-w-md backdrop-blur-2xl rounded-3xl p-8 relative z-20"
        style={{
          background: 'rgba(5, 10, 10, 0.6)',
          border: '1px solid rgba(124, 255, 178, 0.3)',
          boxShadow: '0 0 60px rgba(124, 255, 178, 0.15), 0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/" className="inline-flex items-center gap-2 mb-8 text-sm" style={{ color: 'rgba(124, 255, 178, 0.8)' }}>
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <img 
            src="/logo-new.png" 
            alt="Cashora Logo" 
            className="h-16 w-auto"
          />
        </div>

        <h1 className="text-3xl font-bold mb-2" style={{
          background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Welcome Back
        </h1>
        <p className="text-sm mb-8" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Login to your Cashora account
        </p>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <motion.button
            onClick={handleGoogleSignIn}
            disabled={loadingGoogle}
            className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-3 backdrop-blur-xl relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
            whileHover={{
              background: 'rgba(255, 255, 255, 0.1)',
              scale: loadingGoogle ? 1 : 1.02,
            }}
            whileTap={{ scale: loadingGoogle ? 1 : 0.98 }}
          >
            {loadingGoogle ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Redirecting to Google...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                Continue with Google
              </>
            )}
          </motion.button>

          <motion.button
            onClick={handleGithubSignIn}
            disabled={loadingGithub}
            className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-3 backdrop-blur-xl relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
            whileHover={{
              background: 'rgba(255, 255, 255, 0.1)',
              scale: loadingGithub ? 1 : 1.02,
            }}
            whileTap={{ scale: loadingGithub ? 1 : 0.98 }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
            {loadingGithub ? "Signing in..." : "Continue with GitHub"}
          </motion.button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2" style={{ background: 'rgba(5, 10, 10, 0.6)', color: 'rgba(255, 255, 255, 0.5)' }}>
              Or continue with email
            </span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleEmailSignIn}>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loadingEmail}
              className="w-full px-4 py-3 rounded-xl backdrop-blur-xl outline-none transition-all disabled:opacity-50"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
                color: '#fff',
              }}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loadingEmail}
              className="w-full px-4 py-3 rounded-xl backdrop-blur-xl outline-none transition-all disabled:opacity-50"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
                color: '#fff',
              }}
              placeholder="••••••••"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loadingEmail}
            className="w-full py-3 rounded-xl font-semibold relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(90deg, #1ED760, #5CE1E6)',
              color: '#000',
              boxShadow: '0 0 30px rgba(30, 215, 96, 0.4)',
            }}
            whileHover={{ boxShadow: '0 0 40px rgba(30, 215, 96, 0.6)', scale: loadingEmail ? 1 : 1.02 }}
            whileTap={{ scale: loadingEmail ? 1 : 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
            {loadingEmail ? "Signing in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'rgba(124, 255, 178, 0.9)' }}>
            Sign up
          </Link>
        </p>
      </motion.div>

      {/* Scrolling Platform Icons */}
      <div className="w-full max-w-4xl mt-12">
        <ScrollingPlatforms duration={20} />
      </div>
    </div>
  );
};

export default Login;
