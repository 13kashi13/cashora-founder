import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Video,
  Library,
  BarChart3,
  Settings,
  Sparkles,
  LogOut,
  Menu,
  X,
  Lightbulb,
  Link as LinkIcon,
  Home,
} from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from 'sonner';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Create Video', href: '/dashboard/create', icon: Video },
    { name: 'Content Library', href: '/dashboard/library', icon: Library },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Platforms', href: '/dashboard/platforms', icon: LinkIcon },
    { name: 'Recommendations', href: '/dashboard/recommendations', icon: Lightbulb },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-[#050a0a] flex">
      {/* Sidebar - Desktop */}
      <motion.aside
        className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 z-50"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col flex-1 min-h-0 backdrop-blur-xl"
          style={{
            background: 'rgba(5, 10, 10, 0.8)',
            borderRight: '1px solid rgba(124, 255, 178, 0.2)',
          }}
        >
          {/* Logo */}
          <div className="flex items-center h-20 px-6 border-b border-[#7CFFB2]/20">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#7CFFB2] to-[#5CE1E6] rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div 
                  className="relative w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #7CFFB2 0%, #5CE1E6 100%)',
                  }}
                >
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
              </div>
              <span
                className="text-xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #7CFFB2 0%, #5CE1E6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                CASHORA
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link key={item.name} to={item.href}>
                  <motion.div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer relative"
                    style={{
                      background: active ? 'rgba(124, 255, 178, 0.15)' : 'transparent',
                      border: active ? '1px solid rgba(124, 255, 178, 0.3)' : '1px solid transparent',
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(124, 255, 178, 0.1)',
                      borderColor: 'rgba(124, 255, 178, 0.2)',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon 
                      className="w-5 h-5" 
                      style={{ color: active ? '#7CFFB2' : 'rgba(255, 255, 255, 0.6)' }}
                    />
                    <span 
                      className="text-sm font-medium"
                      style={{ color: active ? '#7CFFB2' : 'rgba(255, 255, 255, 0.8)' }}
                    >
                      {item.name}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-[#7CFFB2]/20">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: 'rgba(124, 255, 178, 0.08)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
              }}
            >
              {user?.user_metadata?.avatar_url && (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt={user.user_metadata?.full_name || user.user_metadata?.name || 'User'} 
                  className="w-10 h-10 rounded-full ring-2 ring-[#7CFFB2]/30"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.user_metadata?.full_name || user?.user_metadata?.name || 'User'}
                </p>
                <p className="text-xs text-white/60 truncate">
                  {user?.email}
                </p>
              </div>
              <motion.button
                onClick={handleSignOut}
                className="p-2 rounded-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                whileTap={{ scale: 0.9 }}
              >
                <LogOut className="w-4 h-4 text-white/60" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden"
              initial={{ x: -264 }}
              animate={{ x: 0 }}
              exit={{ x: -264 }}
              transition={{ type: 'spring', damping: 25 }}
              style={{
                background: 'rgba(5, 10, 10, 0.95)',
                borderRight: '1px solid rgba(124, 255, 178, 0.2)',
                backdropFilter: 'blur(40px)',
              }}
            >
              {/* Same content as desktop sidebar */}
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between h-20 px-6 border-b border-[#7CFFB2]/20">
                  <Link to="/dashboard" className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-[#7CFFB2]" />
                    <span className="text-xl font-black text-[#7CFFB2]">CASHORA</span>
                  </Link>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="w-6 h-6 text-white/60" />
                  </button>
                </div>
                
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    
                    return (
                      <Link key={item.name} to={item.href} onClick={() => setSidebarOpen(false)}>
                        <div
                          className="flex items-center gap-3 px-4 py-3 rounded-xl"
                          style={{
                            background: active ? 'rgba(124, 255, 178, 0.15)' : 'transparent',
                            border: active ? '1px solid rgba(124, 255, 178, 0.3)' : '1px solid transparent',
                          }}
                        >
                          <Icon className="w-5 h-5" style={{ color: active ? '#7CFFB2' : 'rgba(255, 255, 255, 0.6)' }} />
                          <span className="text-sm font-medium" style={{ color: active ? '#7CFFB2' : 'rgba(255, 255, 255, 0.8)' }}>
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 backdrop-blur-xl"
          style={{
            background: 'rgba(5, 10, 10, 0.8)',
            borderBottom: '1px solid rgba(124, 255, 178, 0.2)',
          }}
        >
          <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
            <button
              className="lg:hidden p-2 rounded-lg"
              style={{
                background: 'rgba(124, 255, 178, 0.12)',
                border: '1px solid rgba(124, 255, 178, 0.3)',
              }}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 text-[#7CFFB2]" />
            </button>
            
            <div className="flex-1" />
            
            {/* Quick actions or notifications can go here */}
          </div>
        </header>

        {/* Page content with smooth scroll */}
        <main 
          className="p-4 sm:p-6 lg:p-8 overflow-y-auto"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
