import { useMemo } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useSupabaseQuery } from './useSupabaseQuery';

interface Post {
  id: string;
  platform: string;
  status: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  engagement_rate: number;
  posted_at: string;
  video_id: string;
}

interface Video {
  id: string;
  title: string;
  views: number;
  duration: number;
}

interface User {
  id: string;
  goal: string;
  experience_level: string;
  selected_platforms: string[];
}

export function useAnalyticsData() {
  const { user } = useAuth();

  // Fetch user data for onboarding info
  const { data: userData } = useSupabaseQuery<User>({
    table: 'users',
    filter: user?.id ? { id: user.id } : undefined,
    enabled: !!user?.id,
  });

  // Fetch platform connections
  const { data: connectedPlatforms } = useSupabaseQuery({
    table: 'platform_connections',
    filter: user?.id ? { user_id: user.id, is_active: true } : undefined,
    enabled: !!user?.id,
  });

  // Fetch all posted posts
  const { data: posts, loading: postsLoading } = useSupabaseQuery<Post>({
    table: 'posts',
    filter: user?.id ? { user_id: user.id, status: 'posted' } : undefined,
    orderBy: { column: 'posted_at', ascending: false },
    enabled: !!user?.id,
  });

  // Fetch videos for top performers
  const { data: videos, loading: videosLoading } = useSupabaseQuery<Video>({
    table: 'videos',
    filter: user?.id ? { user_id: user.id } : undefined,
    enabled: !!user?.id,
  });

  // Get selected platforms from onboarding or connections
  const selectedPlatforms = useMemo(() => {
    const onboardingPlatforms = userData?.[0]?.selected_platforms || [];
    const connectedPlatformNames = connectedPlatforms?.map((p: any) => p.platform) || [];
    return [...new Set([...onboardingPlatforms, ...connectedPlatformNames])];
  }, [userData, connectedPlatforms]);

  // Filter posts by selected platforms
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (selectedPlatforms.length === 0) return posts;
    return posts.filter((p) => selectedPlatforms.includes(p.platform));
  }, [posts, selectedPlatforms]);

  // Calculate overview stats
  const overviewStats = useMemo(() => {
    if (!filteredPosts) {
      return {
        totalViews: 0,
        totalLikes: 0,
        totalShares: 0,
        estimatedRevenue: 0,
        weeklyChange: { views: 0, likes: 0, shares: 0, revenue: 0 },
      };
    }

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const thisWeekPosts = filteredPosts.filter(
      (p) => p.posted_at && new Date(p.posted_at) > weekAgo
    );
    const lastWeekPosts = filteredPosts.filter(
      (p) =>
        p.posted_at &&
        new Date(p.posted_at) > twoWeeksAgo &&
        new Date(p.posted_at) <= weekAgo
    );

    const totalViews = filteredPosts.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalLikes = filteredPosts.reduce((sum, p) => sum + (p.likes || 0), 0);
    const totalShares = filteredPosts.reduce((sum, p) => sum + (p.shares || 0), 0);

    const thisWeekViews = thisWeekPosts.reduce((sum, p) => sum + (p.views || 0), 0);
    const lastWeekViews = lastWeekPosts.reduce((sum, p) => sum + (p.views || 0), 0);

    const thisWeekLikes = thisWeekPosts.reduce((sum, p) => sum + (p.likes || 0), 0);
    const lastWeekLikes = lastWeekPosts.reduce((sum, p) => sum + (p.likes || 0), 0);

    const thisWeekShares = thisWeekPosts.reduce((sum, p) => sum + (p.shares || 0), 0);
    const lastWeekShares = lastWeekPosts.reduce((sum, p) => sum + (p.shares || 0), 0);

    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const estimatedRevenue = totalViews / 1000; // $1 per 1000 views
    const thisWeekRevenue = thisWeekViews / 1000;
    const lastWeekRevenue = lastWeekViews / 1000;

    return {
      totalViews,
      totalLikes,
      totalShares,
      estimatedRevenue,
      weeklyChange: {
        views: calculateChange(thisWeekViews, lastWeekViews),
        likes: calculateChange(thisWeekLikes, lastWeekLikes),
        shares: calculateChange(thisWeekShares, lastWeekShares),
        revenue: calculateChange(thisWeekRevenue, lastWeekRevenue),
      },
    };
  }, [filteredPosts]);

  // Calculate platform stats
  const platformStats = useMemo(() => {
    if (!filteredPosts) return [];

    const platformMap = new Map<
      string,
      { views: number; engagement: number; postCount: number }
    >();

    filteredPosts.forEach((post) => {
      const existing = platformMap.get(post.platform) || {
        views: 0,
        engagement: 0,
        postCount: 0,
      };

      platformMap.set(post.platform, {
        views: existing.views + (post.views || 0),
        engagement: existing.engagement + (post.engagement_rate || 0),
        postCount: existing.postCount + 1,
      });
    });

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return Array.from(platformMap.entries())
      .map(([platform, data]) => {
        const platformPosts = filteredPosts.filter((p) => p.platform === platform);
        const weeklyPosts = platformPosts.filter(
          (p) => p.posted_at && new Date(p.posted_at) > weekAgo
        );
        const weeklyViews = weeklyPosts.reduce((sum, p) => sum + (p.views || 0), 0);
        const lastWeekViews = data.views - weeklyViews;
        const growth =
          lastWeekViews > 0 ? ((weeklyViews - lastWeekViews) / lastWeekViews) * 100 : 0;

        return {
          platform,
          views: data.views,
          engagement: data.postCount > 0 ? data.engagement / data.postCount : 0,
          growth: `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`,
        };
      })
      .sort((a, b) => b.views - a.views);
  }, [filteredPosts]);

  // Get top performing videos
  const topVideos = useMemo(() => {
    if (!videos || !filteredPosts) return [];

    const videoViewsMap = new Map<string, number>();
    const videoPlatformMap = new Map<string, string>();

    filteredPosts.forEach((post) => {
      const currentViews = videoViewsMap.get(post.video_id) || 0;
      videoViewsMap.set(post.video_id, currentViews + (post.views || 0));
      if (!videoPlatformMap.has(post.video_id)) {
        videoPlatformMap.set(post.video_id, post.platform);
      }
    });

    return videos
      .map((video) => ({
        title: video.title,
        views: videoViewsMap.get(video.id) || 0,
        platform: videoPlatformMap.get(video.id) || 'unknown',
      }))
      .filter((v) => v.views > 0)
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);
  }, [videos, filteredPosts]);

  // Calculate best insights
  const insights = useMemo(() => {
    if (!filteredPosts || filteredPosts.length === 0) {
      return {
        bestPlatform: 'N/A',
        bestTime: 'N/A',
        avgDuration: 'N/A',
      };
    }

    // Best platform by engagement
    const bestPlatform =
      platformStats.length > 0
        ? platformStats.reduce((best, current) =>
            current.engagement > best.engagement ? current : best
          ).platform
        : 'N/A';

    // Best posting time (hour of day)
    const hourCounts = new Map<number, { views: number; count: number }>();
    filteredPosts.forEach((post) => {
      if (post.posted_at) {
        const hour = new Date(post.posted_at).getHours();
        const existing = hourCounts.get(hour) || { views: 0, count: 0 };
        hourCounts.set(hour, {
          views: existing.views + (post.views || 0),
          count: existing.count + 1,
        });
      }
    });

    let bestHour = 0;
    let maxAvgViews = 0;
    hourCounts.forEach((data, hour) => {
      const avgViews = data.views / data.count;
      if (avgViews > maxAvgViews) {
        maxAvgViews = avgViews;
        bestHour = hour;
      }
    });

    const bestTime =
      hourCounts.size > 0
        ? `${bestHour}:00 - ${(bestHour + 2) % 24}:00`
        : 'N/A';

    // Average video duration
    const videosWithDuration = videos?.filter((v) => v.duration > 0) || [];
    const avgDuration =
      videosWithDuration.length > 0
        ? videosWithDuration.reduce((sum, v) => sum + v.duration, 0) /
          videosWithDuration.length
        : 0;

    const formatDuration = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return {
      bestPlatform,
      bestTime,
      avgDuration: avgDuration > 0 ? formatDuration(Math.round(avgDuration)) : 'N/A',
    };
  }, [filteredPosts, platformStats, videos]);

  return {
    overviewStats,
    platformStats,
    topVideos,
    insights,
    selectedPlatforms,
    loading: postsLoading || videosLoading,
  };
}
