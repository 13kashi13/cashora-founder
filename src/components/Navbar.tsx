import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { toast } from "sonner";
import { useState } from "react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  // Transform scroll to navbar background opacity
  const navbarBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(5, 10, 10, 0.3)', 'rgba(5, 10, 10, 0.8)']
  );
  
  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    [0.2, 0.5]
  );

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully!");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: navbarBg,
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        borderBottom: `1px solid rgba(124, 255, 178, ${borderOpacity})`,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 80px rgba(124, 255, 178, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        willChange: 'background-color, border-color',
        transform: 'translateZ(0)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glass texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)',
          mixBlendMode: 'overlay',
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section - Clickable */}
          <motion.div 
            onClick={handleLogoClick}
            className="flex items-center group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="relative flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="/logo-new.png" 
                alt="Cashora Logo" 
                className="relative h-14 w-auto"
              />
            </motion.div>
            <div>
              <motion.span
                className="text-2xl font-black tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #7CFFB2 0%, #A8FFE0 50%, #5CE1E6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 20px rgba(124, 255, 178, 0.3))',
                }}
              >
                CASHORA
              </motion.span>
              <div className="text-[10px] tracking-widest text-[#7CFFB2] opacity-70">
                CREATOR PLATFORM
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { label: 'HOW IT WORKS', href: '#how-it-works' },
              { label: 'ABOUT', href: '#about' },
              { label: 'PRICING', href: '#pricing' },
              { label: 'TEAM', href: '#team' },
            ].map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  // If not on home page, navigate to home first
                  if (window.location.pathname !== '/') {
                    window.location.href = '/' + link.href;
                  } else {
                    // Smooth scroll to section
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className="relative px-5 py-2.5 text-sm font-black group uppercase cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 text-white/80 group-hover:text-white transition-colors">
                  {link.label}
                </span>
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(135deg, rgba(124, 255, 178, 0.15), rgba(92, 225, 230, 0.15))',
                    border: '1px solid rgba(124, 255, 178, 0.3)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 4px 16px rgba(124, 255, 178, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                />
              </motion.a>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard">
                  <motion.button
                    className="px-6 py-2.5 text-sm font-black rounded-xl uppercase"
                    style={{
                      background: 'linear-gradient(135deg, #1ED760, #5CE1E6)',
                      color: '#000',
                      boxShadow: '0 4px 20px rgba(30, 215, 96, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    }}
                    whileHover={{
                      boxShadow: '0 8px 32px rgba(30, 215, 96, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Go to Dashboard
                  </motion.button>
                </Link>
                <Link to="/profile">
                  <motion.div 
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer" 
                    style={{
                      background: 'linear-gradient(135deg, rgba(124, 255, 178, 0.15), rgba(92, 225, 230, 0.15))',
                      border: '1px solid rgba(124, 255, 178, 0.3)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 4px 16px rgba(124, 255, 178, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 8px 24px rgba(124, 255, 178, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {(user.user_metadata?.avatar_url || user.user_metadata?.picture) && (
                      <img 
                        src={user.user_metadata?.avatar_url || user.user_metadata?.picture} 
                        alt={user.user_metadata?.full_name || user.user_metadata?.name || 'User'} 
                        className="w-8 h-8 rounded-full ring-2 ring-[#7CFFB2]/30"
                      />
                    )}
                    <span className="text-sm font-medium text-white/90 hidden sm:block">
                      {user.user_metadata?.full_name || user.user_metadata?.name || user.email}
                    </span>
                  </motion.div>
                </Link>
                <motion.button
                  onClick={handleSignOut}
                  className="px-4 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-2"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(20px)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    scale: 1.05,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block">
                  <motion.button
                    className="px-6 py-2.5 text-sm font-black rounded-xl uppercase"
                    style={{
                      background: 'rgba(124, 255, 178, 0.12)',
                      border: '1px solid rgba(124, 255, 178, 0.4)',
                      backdropFilter: 'blur(20px)',
                      color: '#7CFFB2',
                      boxShadow: '0 4px 16px rgba(124, 255, 178, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(124, 255, 178, 0.2)',
                      boxShadow: '0 8px 24px rgba(124, 255, 178, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    className="px-6 py-2.5 text-sm font-black rounded-xl relative overflow-hidden uppercase"
                    style={{
                      background: 'linear-gradient(135deg, #1ED760, #5CE1E6)',
                      color: '#000',
                      boxShadow: '0 4px 20px rgba(30, 215, 96, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    }}
                    whileHover={{
                      boxShadow: '0 8px 32px rgba(30, 215, 96, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">GET STARTED</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-lg"
              style={{
                background: 'rgba(124, 255, 178, 0.12)',
                border: '1px solid rgba(124, 255, 178, 0.3)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 4px 16px rgba(124, 255, 178, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#7CFFB2]" />
              ) : (
                <Menu className="w-6 h-6 text-[#7CFFB2]" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="lg:hidden overflow-hidden"
        initial={false}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className="px-4 py-6 space-y-3"
          style={{
            background: 'rgba(5, 10, 10, 0.95)',
            backdropFilter: 'blur(40px)',
            borderTop: '1px solid rgba(124, 255, 178, 0.2)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
        >
          {[
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'About', href: '#about' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Team', href: '#team' },
          ].map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                // If not on home page, navigate to home first
                if (window.location.pathname !== '/') {
                  window.location.href = '/' + link.href;
                } else {
                  // Smooth scroll to section
                  const element = document.querySelector(link.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
              className="block px-4 py-3 text-base font-medium rounded-lg cursor-pointer"
              style={{
                background: 'rgba(124, 255, 178, 0.08)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
                backdropFilter: 'blur(20px)',
                color: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 2px 8px rgba(124, 255, 178, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              {link.label}
            </motion.a>
          ))}
          {!user && (
            <Link to="/login" className="block sm:hidden">
              <motion.button
                className="w-full px-4 py-3 text-base font-semibold rounded-lg"
                style={{
                  background: 'rgba(124, 255, 178, 0.12)',
                  border: '1px solid rgba(124, 255, 178, 0.4)',
                  backdropFilter: 'blur(20px)',
                  color: '#7CFFB2',
                  boxShadow: '0 4px 16px rgba(124, 255, 178, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.button>
            </Link>
          )}
        </div>
      </motion.div>

      {/* Animated bottom glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #7CFFB2, #5CE1E6, transparent)',
          opacity: 0.4,
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.nav>
  );
};

export default Navbar;
