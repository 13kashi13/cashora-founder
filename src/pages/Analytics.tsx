import { motion } from 'framer-motion';
import { TrendingUp, Eye, Heart, Share2, DollarSign } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';

const Analytics = () => {
  const { overviewStats, platformStats, topVideos, insights, loading } = useAnalyticsData();

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  };

  const overviewStatsDisplay = [
    { 
      name: 'Total Views', 
      value: formatNumber(overviewStats.totalViews), 
      change: formatChange(overviewStats.weeklyChange.views), 
      icon: Eye, 
      color: '#7CFFB2' 
    },
    { 
      name: 'Total Likes', 
      value: formatNumber(overviewStats.totalLikes), 
      change: formatChange(overviewStats.weeklyChange.likes), 
      icon: Heart, 
      color: '#5CE1E6' 
    },
    { 
      name: 'Total Shares', 
      value: formatNumber(overviewStats.totalShares), 
      change: formatChange(overviewStats.weeklyChange.shares), 
      icon: Share2, 
      color: '#A8FFE0' 
    },
    { 
      name: 'Est. Revenue', 
      value: `$${overviewStats.estimatedRevenue.toFixed(0)}`, 
      change: formatChange(overviewStats.weeklyChange.revenue), 
      icon: DollarSign, 
      color: '#7CFFB2' 
    },
  ];

  const platformColors: Record<string, string> = {
    youtube: '#FF0000',
    tiktok: '#000000',
    instagram: '#E4405F',
    linkedin: '#0A66C2',
    twitter: '#1DA1F2',
    facebook: '#1877F2',
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-white/60">Loading analytics...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-white">ANALYTICS</h1>
          <p className="text-white/60 mt-1">Track your performance across all platforms</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStatsDisplay.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.name}
                className="p-6 rounded-2xl backdrop-blur-xl"
                style={{
                  background: 'rgba(124, 255, 178, 0.08)',
                  border: '1px solid rgba(124, 255, 178, 0.2)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  backgroundColor: 'rgba(124, 255, 178, 0.12)',
                  borderColor: 'rgba(124, 255, 178, 0.3)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{ background: `${stat.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: stat.change.startsWith('+') ? stat.color : '#FF4444' }}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-white/60 mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Platform Performance */}
        <div
          className="p-6 rounded-2xl backdrop-blur-xl"
          style={{
            background: 'rgba(124, 255, 178, 0.08)',
            border: '1px solid rgba(124, 255, 178, 0.2)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">PLATFORM PERFORMANCE</h2>
          {platformStats.length === 0 ? (
            <p className="text-white/60 text-center py-8">
              No platform data yet. Start posting to see analytics!
            </p>
          ) : (
            <div className="space-y-4">
              {platformStats.map((platform, index) => (
                <motion.div
                  key={platform.platform}
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `${platformColors[platform.platform] || '#7CFFB2'}20` }}
                      >
                        <span 
                          className="text-lg font-black uppercase" 
                          style={{ color: platformColors[platform.platform] || '#7CFFB2' }}
                        >
                          {platform.platform[0]}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold capitalize">{platform.platform}</h3>
                        <p className="text-white/60 text-sm">
                          {formatNumber(platform.views)} views
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#7CFFB2] font-semibold">{platform.growth}</p>
                      <p className="text-white/60 text-sm">{platform.engagement.toFixed(1)}% engagement</p>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #7CFFB2, #5CE1E6)',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(platform.engagement * 8, 100)}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Top Performing Videos */}
        <div
          className="p-6 rounded-2xl backdrop-blur-xl"
          style={{
            background: 'rgba(124, 255, 178, 0.08)',
            border: '1px solid rgba(124, 255, 178, 0.2)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">TOP PERFORMING VIDEOS</h2>
          {topVideos.length === 0 ? (
            <p className="text-white/60 text-center py-8">
              No video data yet. Create and post videos to see top performers!
            </p>
          ) : (
            <div className="space-y-3">
              {topVideos.map((video, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{video.title}</h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-white/60">{formatNumber(video.views)} views</span>
                      <span
                        className="px-2 py-0.5 rounded text-xs capitalize"
                        style={{
                          background: 'rgba(124, 255, 178, 0.2)',
                          color: '#7CFFB2',
                        }}
                      >
                        {video.platform}
                      </span>
                    </div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-[#7CFFB2]" />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Content Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="p-6 rounded-2xl backdrop-blur-xl"
            style={{
              background: 'rgba(124, 255, 178, 0.08)',
              border: '1px solid rgba(124, 255, 178, 0.2)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h3 className="text-lg font-bold text-white mb-2">Best Platform</h3>
            <p className="text-3xl font-black text-[#7CFFB2] mb-1 capitalize">{insights.bestPlatform}</p>
            <p className="text-white/60 text-sm">Highest engagement rate</p>
          </motion.div>

          <motion.div
            className="p-6 rounded-2xl backdrop-blur-xl"
            style={{
              background: 'rgba(124, 255, 178, 0.08)',
              border: '1px solid rgba(124, 255, 178, 0.2)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <h3 className="text-lg font-bold text-white mb-2">Best Time</h3>
            <p className="text-3xl font-black text-[#5CE1E6] mb-1">{insights.bestTime}</p>
            <p className="text-white/60 text-sm">Peak engagement window</p>
          </motion.div>

          <motion.div
            className="p-6 rounded-2xl backdrop-blur-xl"
            style={{
              background: 'rgba(124, 255, 178, 0.08)',
              border: '1px solid rgba(124, 255, 178, 0.2)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <h3 className="text-lg font-bold text-white mb-2">Avg. Duration</h3>
            <p className="text-3xl font-black text-[#A8FFE0] mb-1">{insights.avgDuration}</p>
            <p className="text-white/60 text-sm">Optimal video length</p>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
