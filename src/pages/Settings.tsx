import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Lock, CreditCard, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/layouts/DashboardLayout';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'billing', name: 'Billing', icon: CreditCard },
  ];

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-white">SETTINGS</h1>
          <p className="text-white/60 mt-1">Manage your account and preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap"
                style={{
                  background: isActive
                    ? 'rgba(124, 255, 178, 0.15)'
                    : 'rgba(124, 255, 178, 0.08)',
                  border: isActive
                    ? '1px solid rgba(124, 255, 178, 0.3)'
                    : '1px solid rgba(124, 255, 178, 0.2)',
                }}
                whileHover={{ backgroundColor: 'rgba(124, 255, 178, 0.12)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{ color: isActive ? '#7CFFB2' : 'rgba(255, 255, 255, 0.6)' }}
                />
                <span
                  className="font-medium"
                  style={{ color: isActive ? '#7CFFB2' : 'rgba(255, 255, 255, 0.8)' }}
                >
                  {tab.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Content */}
        <div
          className="p-6 rounded-2xl backdrop-blur-xl"
          style={{
            background: 'rgba(124, 255, 178, 0.08)',
            border: '1px solid rgba(124, 255, 178, 0.2)',
          }}
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-24 h-24 rounded-full ring-4 ring-[#7CFFB2]/30"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7CFFB2] to-[#5CE1E6] flex items-center justify-center">
                      <User className="w-12 h-12 text-black" />
                    </div>
                  )}
                  <motion.button
                    className="absolute bottom-0 right-0 p-2 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #7CFFB2, #5CE1E6)',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <User className="w-4 h-4 text-black" />
                  </motion.button>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{user?.displayName || 'User'}</h3>
                  <p className="text-white/60">{user?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.displayName || ''}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#7CFFB2]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="@username"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#7CFFB2]/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Bio</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#7CFFB2]/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Niche</label>
                <input
                  type="text"
                  placeholder="e.g., AI, Finance, Lifestyle"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#7CFFB2]/50"
                />
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              {[
                { name: 'Video Generation Complete', description: 'Get notified when videos are ready' },
                { name: 'Post Published', description: 'Alerts when content goes live' },
                { name: 'Analytics Updates', description: 'Weekly performance summaries' },
                { name: 'Platform Disconnections', description: 'Alerts for connection issues' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <div>
                    <h4 className="text-white font-medium">{item.name}</h4>
                    <p className="text-white/60 text-sm">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7CFFB2]"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#7CFFB2]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#7CFFB2]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#7CFFB2]/50"
                />
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-white font-bold mb-4">Danger Zone</h4>
                <motion.button
                  className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium"
                  style={{
                    background: 'rgba(255, 68, 68, 0.15)',
                    color: '#FF4444',
                  }}
                  whileHover={{ backgroundColor: 'rgba(255, 68, 68, 0.25)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Account
                </motion.button>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(124, 255, 178, 0.15), rgba(92, 225, 230, 0.15))',
                  border: '1px solid rgba(124, 255, 178, 0.3)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Free Plan</h3>
                    <p className="text-white/60">10 videos per month</p>
                  </div>
                  <motion.button
                    className="px-6 py-3 rounded-xl font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, #7CFFB2, #5CE1E6)',
                      color: '#000',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Upgrade
                  </motion.button>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span>5 / 10 videos used</span>
                  <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #7CFFB2, #5CE1E6)',
                        width: '50%',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">Billing History</h4>
                <div className="space-y-2">
                  <div
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <div>
                      <p className="text-white font-medium">Free Plan</p>
                      <p className="text-white/60 text-sm">Current plan</p>
                    </div>
                    <span className="text-[#7CFFB2] font-semibold">$0.00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-white/10 mt-6">
            <motion.button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
              style={{
                background: 'linear-gradient(135deg, #7CFFB2, #5CE1E6)',
                color: '#000',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-5 h-5" />
              Save Changes
            </motion.button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
