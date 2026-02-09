import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Navbar = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully!");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <motion.nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-2xl rounded-full px-6 py-3"
      style={{
        backgroundColor: 'rgba(5, 10, 10, 0.4)',
        border: '1px solid rgba(124, 255, 178, 0.3)',
        boxShadow: '0 0 60px rgba(124, 255, 178, 0.2), 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        minWidth: 'fit-content',
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-8">
        {/* Logo with sparkle - LEFT */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles className="w-5 h-5" style={{ color: '#7CFFB2' }} />
          </motion.div>
          <motion.span
            className="text-xl font-bold whitespace-nowrap"
            style={{
              background: 'linear-gradient(90deg, #7CFFB2 0%, #A8FFE0 50%, #5CE1E6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            whileHover={{ scale: 1.05 }}
          >
            CASHORA
          </motion.span>
        </Link>

        {/* Navigation Links - CENTER */}
        <div className="flex items-center gap-6">
          {[
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'About Us', href: '#about' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Team', href: '#team' },
          ].map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-sm font-medium relative group whitespace-nowrap"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              whileHover={{ scale: 1.05 }}
            >
              {link.label}
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #7CFFB2, #5CE1E6)',
                  width: '0%',
                }}
                whileHover={{
                  width: '100%',
                  boxShadow: '0 0 10px rgba(124, 255, 178, 0.8)',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Auth Buttons - RIGHT */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {user ? (
            <>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-xl" style={{
                background: 'rgba(124, 255, 178, 0.08)',
                border: '1px solid rgba(124, 255, 178, 0.3)',
              }}>
                {user.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'User'} 
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {user.displayName || user.email}
                </span>
              </div>
              <motion.button
                onClick={handleSignOut}
                className="px-4 py-2.5 text-sm font-semibold rounded-full backdrop-blur-xl relative overflow-hidden flex items-center gap-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
                whileHover={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <Link to="/login">
                <motion.button
                  className="px-5 py-2 text-sm font-semibold rounded-full backdrop-blur-xl relative overflow-hidden whitespace-nowrap"
                  style={{
                    background: 'rgba(124, 255, 178, 0.08)',
                    border: '1px solid rgba(124, 255, 178, 0.4)',
                    color: 'rgba(124, 255, 178, 0.95)',
                    boxShadow: '0 0 20px rgba(124, 255, 178, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(124, 255, 178, 0.15)',
                    borderColor: 'rgba(124, 255, 178, 0.6)',
                    boxShadow: '0 0 30px rgba(124, 255, 178, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                  Login
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  className="px-5 py-2 text-sm font-semibold rounded-full backdrop-blur-xl relative overflow-hidden whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(135deg, #1ED760, #5CE1E6)',
                    color: '#000',
                    boxShadow: '0 0 40px rgba(30, 215, 96, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                  whileHover={{
                    boxShadow: '0 0 60px rgba(30, 215, 96, 0.7), 0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
                  Sign Up
                </motion.button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Floating glow effect underneath */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-8 rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(124, 255, 178, 0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
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
