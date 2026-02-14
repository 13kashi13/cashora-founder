import { motion } from 'framer-motion';
import { Link2, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react';
import { toast } from 'sonner';
import DashboardLayout from '@/layouts/DashboardLayout';

const Platforms = () => {
  // Mock data - in production, this would come from your database
  const platforms = [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: '▶',
      color: '#FF0000',
      connected: false,
      accountName: '',
      followers: '',
      status: 'disconnected',
      description: 'Connect your YouTube channel to auto-publish videos',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📷',
      color: '#E4405F',
      connected: false,
      accountName: '',
      followers: '',
      status: 'disconnected',
      description: 'Connect your Instagram account to post reels and stories',
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
      description: 'Connect your TikTok account to publish short videos',
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      icon: '𝕏',
      color: '#1DA1F2',
      connected: false,
      accountName: '',
      followers: '',
      status: 'disconnected',
      description: 'Connect your X account to post tweets and threads',
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
      description: 'Connect your LinkedIn profile to share professional content',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: '👥',
      color: '#1877F2',
      connected: false,
      accountName: '',
      followers: '',
      status: 'disconnected',
      description: 'Connect your Facebook page to publish posts',
    },
    {
      id: 'threads',
      name: 'Threads',
      icon: '@',
      color: '#000000',
      connected: false,
      accountName: '',
      followers: '',
      status: 'disconnected',
      description: 'Connect your Threads account to share text updates',
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      icon: '📌',
      color: '#E60023',
      connected: false,
      accountName: '',
      followers: '',
      status: 'disconnected',
      description: 'Connect your Pinterest account to create pins',
    },
    {
      id: 'bluesky',
      name: 'Bluesky',
      icon: '🦋',
      color: '#1185FE',
      connected: false,
      accountName: '',
      followers: '',
      status: 'disconnected',
      description: 'Connect your Bluesky account to post updates',
    },
  ];

  const handleConnect = (platformId: string, platformName: string) => {
    // TODO: Implement actual OAuth flow with backend
    // For now, show instructions to user
    toast.info(`To connect ${platformName}:
1. Log into your ${platformName} account first
2. Click the connect button
3. Authorize Cashora to access your account`, {
      duration: 5000,
    });
    
    // In production, this would redirect to OAuth flow:
    // window.location.href = `/api/auth/${platformId}/connect`;
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
          
          {/* Important Notice */}
          <motion.div
            className="mt-6 p-4 rounded-xl"
            style={{
              background: 'rgba(255, 165, 0, 0.1)',
              border: '1px solid rgba(255, 165, 0, 0.3)',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-orange-300 font-semibold mb-2">⚠️ Important</p>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Log into your social account BEFORE connecting</li>
              <li>• Facebook: select each Page individually, do not select "connect all pages"</li>
              <li>• Make sure you have the necessary permissions on your accounts</li>
            </ul>
          </motion.div>
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
            <p className="text-sm text-white/60 mb-1">Available Platforms</p>
            <p className="text-3xl font-bold text-white">{platforms.length}</p>
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
            <p className="text-sm text-white/60 mb-1">Ready to Post</p>
            <p className="text-3xl font-bold text-white">
              {platforms.filter((p) => p.connected).length > 0 ? 'Yes' : 'No'}
            </p>
          </motion.div>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{
                backgroundColor: 'rgba(124, 255, 178, 0.12)',
                borderColor: 'rgba(124, 255, 178, 0.3)',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{
                      background: platform.connected
                        ? `${platform.color}20`
                        : 'rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{platform.name}</h3>
                    {platform.connected && (
                      <p className="text-white/60 text-xs">{platform.accountName}</p>
                    )}
                  </div>
                </div>
                {platform.connected && getStatusIcon(platform.status)}
              </div>

              <p className="text-white/50 text-sm mb-4">{platform.description}</p>

              {platform.connected ? (
                <>
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center justify-between">
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

                  <div className="flex gap-2">
                    <motion.button
                      className="flex-1 px-3 py-2 rounded-xl font-medium text-xs"
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
                      className="px-3 py-2 rounded-xl font-medium text-xs"
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
                  onClick={() => handleConnect(platform.id, platform.name)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #7CFFB2, #5CE1E6)',
                    color: '#000',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link2 className="w-4 h-4" />
                  Login with {platform.name}
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
