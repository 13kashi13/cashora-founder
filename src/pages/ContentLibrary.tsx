import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Video,
  Download,
  Trash2,
  Edit,
  Share2,
  Search,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';
import DashboardLayout from '@/layouts/DashboardLayout';
import SchedulePostModal from '@/components/SchedulePostModal';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useSupabaseQuery, useSupabaseMutation } from '@/hooks/useSupabaseQuery';

interface VideoData {
  id: string;
  title: string;
  thumbnail_url: string;
  status: string;
  views: number;
  created_at: string;
  duration: number;
}

const ContentLibrary = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);

  const { data: videos, loading, refetch } = useSupabaseQuery<VideoData>({
    table: 'videos',
    filter: user?.id ? { user_id: user.id } : undefined,
    orderBy: { column: 'created_at', ascending: false },
    enabled: !!user?.id,
  });

  const { data: posts } = useSupabaseQuery({
    table: 'posts',
    filter: user?.id ? { user_id: user.id } : undefined,
    enabled: !!user?.id,
  });

  const { remove } = useSupabaseMutation();

  const formatDuration = (seconds: number) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Get platforms for each video
  const getVideoPlatforms = (videoId: string) => {
    if (!posts) return [];
    return posts
      .filter((p: any) => p.video_id === videoId && p.status === 'posted')
      .map((p: any) => p.platform);
  };

  // Get total views for each video
  const getVideoViews = (videoId: string) => {
    if (!posts) return 0;
    return posts
      .filter((p: any) => p.video_id === videoId)
      .reduce((sum: number, p: any) => sum + (p.views || 0), 0);
  };

  // Filter videos
  const filteredVideos = videos?.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || video.status === filterStatus;
    
    let matchesPlatform = true;
    if (filterPlatform !== 'all') {
      const platforms = getVideoPlatforms(video.id);
      matchesPlatform = platforms.includes(filterPlatform);
    }

    return matchesSearch && matchesStatus && matchesPlatform;
  }) || [];

  const statusColors: Record<string, string> = {
    posted: '#7CFFB2',
    ready: '#5CE1E6',
    generating: '#FFA500',
    failed: '#FF4444',
    draft: '#A8FFE0',
  };

  const handleSchedulePost = (videoId: string, videoTitle: string) => {
    setSelectedVideo({ id: videoId, title: videoTitle });
    setScheduleModalOpen(true);
  };

  const handleDownload = (videoId: string) => {
    // TODO: Implement download
    toast.success('Download started');
  };

  const handleDelete = async (videoId: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    
    const { error } = await remove('videos', videoId);
    if (error) {
      toast.error('Failed to delete video');
    } else {
      toast.success('Video deleted');
      refetch();
    }
  };

  const handleEdit = (videoId: string) => {
    // TODO: Navigate to generator with pre-filled data
    toast.info('Edit functionality coming soon');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">CONTENT LIBRARY</h1>
            <p className="text-white/60 mt-1">Manage all your generated videos</p>
          </div>

          <Link to="/dashboard/create">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
              style={{
                background: 'linear-gradient(135deg, #7CFFB2, #5CE1E6)',
                color: '#000',
                boxShadow: '0 4px 20px rgba(124, 255, 178, 0.4)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-5 h-5" />
              Create New
            </motion.button>
          </Link>
        </div>

        {/* Filters */}
        <div
          className="p-6 rounded-2xl backdrop-blur-xl"
          style={{
            background: 'rgba(124, 255, 178, 0.08)',
            border: '1px solid rgba(124, 255, 178, 0.2)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#7CFFB2]/50"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#7CFFB2]/50"
            >
              <option value="all">All Status</option>
              <option value="posted">Posted</option>
              <option value="ready">Ready</option>
              <option value="generating">Generating</option>
              <option value="failed">Failed</option>
            </select>

            {/* Platform Filter */}
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#7CFFB2]/50"
            >
              <option value="all">All Platforms</option>
              <option value="youtube">YouTube</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-white/60">Loading videos...</p>
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="col-span-full">
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Video className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No videos found</h3>
                <p className="text-white/60 mb-6">
                  {videos && videos.length > 0
                    ? 'Try adjusting your filters'
                    : 'Create your first video to get started'}
                </p>
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
                    Create Video
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          ) : (
            filteredVideos.map((video, index) => {
              const platforms = getVideoPlatforms(video.id);
              const totalViews = getVideoViews(video.id);

              return (
                <motion.div
                  key={video.id}
                  className="rounded-2xl overflow-hidden backdrop-blur-xl"
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
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-[#7CFFB2]/20 to-[#5CE1E6]/20">
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
                          background: statusColors[video.status as keyof typeof statusColors] || '#A8FFE0',
                          color: '#000',
                        }}
                      >
                        {video.status}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-1 rounded bg-black/60 text-white text-xs font-medium">
                        {formatDuration(video.duration)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2 line-clamp-2">
                      {video.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-white/60">
                        {totalViews > 0 ? `${totalViews.toLocaleString()} views` : 'Not posted'}
                      </span>
                      <span className="text-white/40 text-xs">{formatDate(video.created_at)}</span>
                    </div>

                    {/* Platforms */}
                    {platforms.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {platforms.map((platform) => (
                          <span
                            key={platform}
                            className="px-2 py-1 rounded text-xs font-medium capitalize"
                            style={{
                              background: 'rgba(124, 255, 178, 0.2)',
                              color: '#7CFFB2',
                            }}
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => handleSchedulePost(video.id, video.title)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
                        style={{
                          background: 'rgba(124, 255, 178, 0.15)',
                          color: '#7CFFB2',
                        }}
                        whileHover={{ backgroundColor: 'rgba(124, 255, 178, 0.25)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Share2 className="w-4 h-4" />
                        Post
                      </motion.button>

                      <motion.button
                        onClick={() => handleDownload(video.id)}
                        className="p-2 rounded-lg"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                        }}
                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="w-4 h-4 text-white/60" />
                      </motion.button>

                      <motion.button
                        onClick={() => handleEdit(video.id)}
                        className="p-2 rounded-lg"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                        }}
                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Edit className="w-4 h-4 text-white/60" />
                      </motion.button>

                      <motion.button
                        onClick={() => handleDelete(video.id)}
                        className="p-2 rounded-lg"
                        style={{
                          background: 'rgba(255, 68, 68, 0.15)',
                        }}
                        whileHover={{ backgroundColor: 'rgba(255, 68, 68, 0.25)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Schedule Post Modal */}
      {selectedVideo && (
        <SchedulePostModal
          isOpen={scheduleModalOpen}
          onClose={() => {
            setScheduleModalOpen(false);
            setSelectedVideo(null);
          }}
          videoId={selectedVideo.id}
          videoTitle={selectedVideo.title}
        />
      )}
    </DashboardLayout>
  );
};

export default ContentLibrary;
