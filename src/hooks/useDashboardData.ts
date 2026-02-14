import { useMemo } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useSupabaseQuery } from './useSupabaseQuery';

interface Video {
  id: string;
  title: string;
  status: string;
  views: number;
  thumbnail_url: string;
  created_at: string;
  duration: number;
}

interface Post {
  id: string;
  video_id: string;
  platform: string;
  status: string;
  views: number;
  likes: number;
  shares: number;
  posted_at: string;
}

export function useDashboardData() {
  const { user } = useAuth();

  // Fetch videos
  const { data: videos, loading: videosLoading } = useSupabaseQuery<Video>({
    table: 'videos',
    filter: user?.id ? { user_id: user.id } : undefined,
    orderBy: { column: 'created_at', ascending: false },
    enabled: !!user?.id,
  });

  // Fetch posts
  const { data: posts, loading: postsLoading } = useSupabaseQuery<Post>({
    table: 'posts',
    filter: user?.id ? { user_id: user.id } : undefined,
    orderBy: { column: 'created_at', ascending: false },
    enabled: !!user?.id,
  });

  // Fetch platform connections
  const { data: platforms, loading: platformsLoading } = useSupabaseQuery({
    table: 'platform_connections',
    filter: user?.id ? { user_id: user.id, is_active: true } : undefined,
    enabled: !!user?.id,
  });

  // Calculate stats
  const stats = useMemo(() => {
    if (!videos || !posts) {
      return {
        totalVideos: 0,
        postsPublished: 0,
        totalViews: 0,
        estimatedRevenue: 0,
        weeklyVideos: 0,
        weeklyPosts: 0,
        weeklyViews: 0,
        weeklyRevenue: 0,
      };
    }

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const weeklyVideos = videos.filter(
      (v) => new Date(v.created_at) > weekAgo
    ).length;

    const postedPosts = posts.filter((p) => p.status === 'posted');
    const weeklyPosts = postedPosts.filter(
      (p) => p.posted_at && new Date(p.posted_at) > weekAgo
    ).length;

    const totalViews = postedPosts.reduce((sum, p) => sum + (p.views || 0), 0);
    const weeklyViews = postedPosts
      .filter((p) => p.posted_at && new Date(p.posted_at) > weekAgo)
      .reduce((sum, p) => sum + (p.views || 0), 0);

    // Estimate revenue: $1 per 1000 views (CPM)
    const estimatedRevenue = totalViews / 1000;
    const weeklyRevenue = weeklyViews / 1000;

    return {
      totalVideos: videos.length,
      postsPublished: postedPosts.length,
      totalViews,
      estimatedRevenue,
      weeklyVideos,
      weeklyPosts,
      weeklyViews,
      weeklyRevenue,
    };
  }, [videos, posts]);

  // Get recent videos with post info
  const recentVideos = useMemo(() => {
    if (!videos || !posts) return [];

    return videos.slice(0, 3).map((video) => {
      const videoPosts = posts.filter((p) => p.video_id === video.id);
      const postedPlatforms = videoPosts
        .filter((p) => p.status === 'posted')
        .map((p) => p.platform);

      return {
        ...video,
        platforms: postedPlatforms,
        totalViews: videoPosts.reduce((sum, p) => sum + (p.views || 0), 0),
      };
    });
  }, [videos, posts]);

  return {
    stats,
    recentVideos,
    connectedPlatforms: platforms || [],
    loading: videosLoading || postsLoading || platformsLoading,
  };
}
