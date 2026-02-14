import { motion } from 'framer-motion';
import { Link2, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react';
import { toast } from 'sonner';
import DashboardLayout from '@/layouts/DashboardLayout';

const Platforms = () => {
  // Mock data
  const platforms = [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: '▶',
      color: '#FF0000',
      connected: true,
      accountName: '@johndoe',
      followers: '12.5K',
      status: 'active',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📷',
      color: '#E4405F',
      connected: true,
      accountName: '@johndoe',
      followers: '8.2K',
      status: 'active',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: '🎵',
      color: '#000000',
      connected: false,
      accountName: '',
      followers: '',
      status: 'disconnected',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      color: '#0A66C2',
      connected: false,
      accountName: '',
      followers: '',
      status: 'disconnected',
    },
  ];

  const handleConnect = (platformId: string) => {
    // TODO: Implement OAuth flow
    toast.success(`Connecting to ${platformId}...`);
  };

  const handleDisconnect = (platformId: string) => {
    // TODO: Implement disconnect logic
    toast.success(`Disconnected from ${platformId}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-[#7CFFB2]" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'expired':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-white">PLATFORM CONNECTIONS</h1>
          <p className="text-white/60 mt-1">
            Connect your social media accounts to start auto-posting
          </p>
        </div>

        {/* Connection Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="p-6 rounded-2xl backdrop-blur-xl"
            style={{
              background: 'rgba(124, 255, 178, 0.08)',
              border: '1px solid rgba(124, 255, 178, 0.2)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-white/60 mb-1">Connected Platforms</p>
            <p className="text-3xl font-bold text-white">
              {platforms.filter((p) => p.connected).length} / {platforms.length}
            </p>
          </motion.div>

          <motion.div
            className="p-6 rounded-2xl backdrop-blur-xl"
            style={{
              background: 'rgba(124, 255, 178, 0.08)',
              border: '1px solid rgba(124, 255, 178, 0.2)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-sm text-white/60 mb-1">Total Reach</p>
            <p className="text-3xl font-bold text-white">20.7K</p>
          </motion.div>

          <motion.div
            className="p-6 rounded-2xl backdrop-blur-xl"
            style={{
              background: 'rgba(124, 255, 178, 0.08)',
              border: '1px solid rgba(124, 255, 178, 0.2)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-white/60 mb-1">Active Posts</p>
            <p className="text-3xl font-bold text-white">48</p>
          </motion.div>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              className="p-6 rounded-2xl backdrop-blur-xl"
              style={{
                background: 'rgba(124, 255, 178, 0.08)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{
                backgroundColor: 'rgba(124, 255, 178, 0.12)',
                borderColor: 'rgba(124, 255, 178, 0.3)',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{
                      background: platform.connected
                        ? `${platform.color}20`
                        : 'rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{platform.name}</h3>
                    {platform.connected && (
                      <p className="text-white/60 text-sm">{platform.accountName}</p>
                    )}
                  </div>
                </div>
                {platform.connected && getStatusIcon(platform.status)}
              </div>

              {platform.connected ? (
                <>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/60 text-sm">Followers</span>
                      <span className="text-white font-semibold">{platform.followers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Status</span>
                      <span className="text-[#7CFFB2] font-semibold capitalize">
                        {platform.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      className="flex-1 px-4 py-2 rounded-xl font-medium text-sm"
                      style={{
                        background: 'rgba(124, 255, 178, 0.15)',
                        color: '#7CFFB2',
                      }}
                      whileHover={{ backgroundColor: 'rgba(124, 255, 178, 0.25)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Posts
                    </motion.button>
                    <motion.button
                      onClick={() => handleDisconnect(platform.id)}
                      className="px-4 py-2 rounded-xl font-medium text-sm"
                      style={{
                        background: 'rgba(255, 68, 68, 0.15)',
                        color: '#FF4444',
                      }}
                      whileHover={{ backgroundColor: 'rgba(255, 68, 68, 0.25)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Disconnect
                    </motion.button>
                  </div>
                </>
              ) : (
                <motion.button
                  onClick={() => handleConnect(platform.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #7CFFB2, #5CE1E6)',
                    color: '#000',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link2 className="w-5 h-5" />
                  Connect {platform.name}
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Help Section */}
        <motion.div
          className="p-6 rounded-2xl backdrop-blur-xl"
          style={{
            background: 'rgba(124, 255, 178, 0.08)',
            border: '1px solid rgba(124, 255, 178, 0.2)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-lg font-bold text-white mb-3">Need Help?</h3>
          <p className="text-white/60 text-sm mb-4">
            Having trouble connecting your accounts? Check out our setup guides or contact
            support.
          </p>
          <div className="flex gap-3">
            <motion.button
              className="px-4 py-2 rounded-xl font-medium text-sm"
              style={{
                background: 'rgba(124, 255, 178, 0.15)',
                color: '#7CFFB2',
              }}
              whileHover={{ backgroundColor: 'rgba(124, 255, 178, 0.25)' }}
              whileTap={{ scale: 0.98 }}
            >
              View Guides
            </motion.button>
            <motion.button
              className="px-4 py-2 rounded-xl font-medium text-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Platforms;
