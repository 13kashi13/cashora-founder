import { motion } from 'framer-motion';
import { Video, TrendingUp, Users, DollarSign, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useDashboardData } from '@/hooks/useDashboardData';

const Dashboard = () => {
  const statsAnimation = useScrollAnimation({ threshold: 0.2 });
  const videosAnimation = useScrollAnimation({ threshold: 0.1 });
  const actionsAnimation = useScrollAnimation({ threshold: 0.1 });

  const { stats: dashboardStats, recentVideos, loading } = useDashboardData();

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const stats = [
    {
      name: 'Total Videos',
      value: dashboardStats.totalVideos.toString(),
      change: `+${dashboardStats.weeklyVideos} this week`,
      icon: Video,
      color: '#7CFFB2',
    },
    {
      name: 'Posts Published',
      value: dashboardStats.postsPublished.toString(),
      change: `+${dashboardStats.weeklyPosts} this week`,
      icon: TrendingUp,
      color: '#5CE1E6',
    },
    {
      name: 'Total Views',
      value: formatNumber(dashboardStats.totalViews),
      change: `+${formatNumber(dashboardStats.weeklyViews)} this week`,
      icon: Users,
      color: '#A8FFE0',
    },
    {
      name: 'Est. Revenue',
      value: `$${dashboardStats.estimatedRevenue.toFixed(0)}`,
      change: `+$${dashboardStats.weeklyRevenue.toFixed(0)} this week`,
      icon: DollarSign,
      color: '#7CFFB2',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">Dashboard</h1>
            <p className="text-white/60 mt-1">Welcome back! Here's your overview.</p>
          </div>
          
          <Link to="/dashboard/create">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
              style={{
                background: 'linear-gradient(135deg, #1ED760, #5CE1E6)',
                color: '#000',
                boxShadow: '0 4px 20px rgba(30, 215, 96, 0.4)',
              }}
              whileHover={{
                boxShadow: '0 8px 32px rgba(30, 215, 96, 0.6)',
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-5 h-5" />
              Create Video
            </motion.button>
          </Link>
        </div>

        {/* Stats Grid */}
        <motion.div
          ref={statsAnimation.ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={statsAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {stats.map((stat, index) => {
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
                animate={statsAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                whileHover={{
                  backgroundColor: 'rgba(124, 255, 178, 0.12)',
                  borderColor: 'rgba(124, 255, 178, 0.3)',
                  y: -4,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: `${stat.color}20`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs" style={{ color: stat.color }}>{stat.change}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Recent Videos */}
        <motion.div
          ref={videosAnimation.ref}
          initial={{ opacity: 0, y: 30 }}
          animate={videosAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Videos</h2>
            <Link to="/dashboard/library">
              <motion.button
                className="flex items-center gap-2 text-sm font-medium text-[#7CFFB2]"
                whileHover={{ gap: '12px' }}
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <p className="text-white/60">Loading videos...</p>
              </div>
            ) : recentVideos.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <Video className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/60 mb-4">No videos yet</p>
                <Link to="/dashboard/create">
                  <motion.button
                    className="px-6 py-3 rounded-xl font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, #7CFFB2, #5CE1E6)',
                      color: '#000',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create Your First Video
                  </motion.button>
                </Link>
              </div>
            ) : (
              recentVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  className="rounded-2xl overflow-hidden backdrop-blur-xl"
                  style={{
                    background: 'rgba(124, 255, 178, 0.08)',
                    border: '1px solid rgba(124, 255, 178, 0.2)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={videosAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5, ease: 'easeOut' }}
                  whileHover={{
                    backgroundColor: 'rgba(124, 255, 178, 0.12)',
                    borderColor: 'rgba(124, 255, 178, 0.3)',
                    scale: 1.02,
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="aspect-video bg-gradient-to-br from-[#7CFFB2]/20 to-[#5CE1E6]/20 relative">
                    {video.thumbnail_url ? (
                      <img 
                        src={video.thumbnail_url} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="w-12 h-12 text-white/40" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: video.status === 'posted' ? '#7CFFB2' : 
                                     video.status === 'generating' ? '#FFA500' : '#5CE1E6',
                          color: '#000',
                        }}
                      >
                        {video.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">
                        {video.totalViews > 0 ? `${formatNumber(video.totalViews)} views` : 'No views yet'}
                      </span>
                      <div className="flex gap-2">
                        {video.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="px-2 py-1 rounded text-xs"
                            style={{
                              background: 'rgba(124, 255, 178, 0.2)',
                              color: '#7CFFB2',
                            }}
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          ref={actionsAnimation.ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={actionsAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        >
          <Link to="/dashboard/platforms">
            <motion.div
              className="p-6 rounded-2xl backdrop-blur-xl cursor-pointer"
              style={{
                background: 'rgba(124, 255, 178, 0.08)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
              }}
              whileHover={{
                backgroundColor: 'rgba(124, 255, 178, 0.12)',
                borderColor: 'rgba(124, 255, 178, 0.3)',
                scale: 1.02,
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              <h3 className="text-lg font-bold text-white mb-2">Connect Platforms</h3>
              <p className="text-white/60 text-sm">
                Link your social media accounts to start auto-posting
              </p>
            </motion.div>
          </Link>

          <Link to="/dashboard/analytics">
            <motion.div
              className="p-6 rounded-2xl backdrop-blur-xl cursor-pointer"
              style={{
                background: 'rgba(124, 255, 178, 0.08)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
              }}
              whileHover={{
                backgroundColor: 'rgba(124, 255, 178, 0.12)',
                borderColor: 'rgba(124, 255, 178, 0.3)',
                scale: 1.02,
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              <h3 className="text-lg font-bold text-white mb-2">View Analytics</h3>
              <p className="text-white/60 text-sm">
                Track your performance across all platforms
              </p>
            </motion.div>
          </Link>

          <Link to="/dashboard/recommendations">
            <motion.div
              className="p-6 rounded-2xl backdrop-blur-xl cursor-pointer"
              style={{
                background: 'rgba(124, 255, 178, 0.08)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
              }}
              whileHover={{
                backgroundColor: 'rgba(124, 255, 178, 0.12)',
                borderColor: 'rgba(124, 255, 178, 0.3)',
                scale: 1.02,
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              <h3 className="text-lg font-bold text-white mb-2">AI Recommendations</h3>
              <p className="text-white/60 text-sm">
                Get personalized suggestions to grow faster
              </p>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
