import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, Target, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery';

const Recommendations = () => {
  const { user } = useAuth();
  const { overviewStats, platformStats, insights, loading } = useAnalyticsData();

  // Fetch user onboarding data
  const { data: userData } = useSupabaseQuery({
    table: 'users',
    filter: user?.id ? { id: user.id } : undefined,
    enabled: !!user?.id,
  });

  const onboardingGoal = userData?.[0]?.goal || '';
  const experienceLevel = userData?.[0]?.experience_level || '';

  // Generate recommendations based on real data
  const recommendations = useMemo(() => {
    const recs = [];

    // Content recommendation based on best platform
    if (platformStats.length > 0) {
      const bestPlatform = platformStats[0];
      recs.push({
        id: 1,
        type: 'platform',
        priority: 'high',
        title: `Focus more on ${bestPlatform.platform}`,
        description: `Your ${bestPlatform.platform} engagement rate is ${bestPlatform.engagement.toFixed(1)}%`,
        impact: `${bestPlatform.growth} growth`,
        icon: TrendingUp,
        color: '#7CFFB2',
      });
    }

    // Timing recommendation
    if (insights.bestTime !== 'N/A') {
      recs.push({
        id: 2,
        type: 'timing',
        priority: 'high',
        title: `Post during ${insights.bestTime}`,
        description: 'Your audience is most active during this time window',
        impact: 'Maximize engagement',
        icon: Clock,
        color: '#5CE1E6',
      });
    }

    // Duration recommendation
    if (insights.avgDuration !== 'N/A') {
      recs.push({
        id: 3,
        type: 'format',
        priority: 'medium',
        title: `Optimal video length: ${insights.avgDuration}`,
        description: 'Based on your best performing videos',
        impact: 'Higher completion rate',
        icon: Target,
        color: '#A8FFE0',
      });
    }

    // Goal-based recommendation
    if (onboardingGoal === 'monetization' || onboardingGoal === 'both') {
      recs.push({
        id: 4,
        type: 'content',
        priority: 'high',
        title: 'Create more revenue-focused content',
        description: 'Based on your monetization goal',
        impact: `Current: $${overviewStats.estimatedRevenue.toFixed(0)}/month`,
        icon: Sparkles,
        color: '#7CFFB2',
      });
    }

    // Experience-based recommendation
    if (experienceLevel === 'beginner') {
      recs.push({
        id: 5,
        type: 'content',
        priority: 'medium',
        title: 'Start with simple video formats',
        description: 'Build consistency before complexity',
        impact: 'Faster learning curve',
        icon: Lightbulb,
        color: '#5CE1E6',
      });
    }

    // If no data yet, provide generic recommendations
    if (recs.length === 0) {
      return [
        {
          id: 1,
          type: 'content',
          priority: 'high',
          title: 'Create your first video',
          description: 'Start building your content library',
          impact: 'Begin your journey',
          icon: Sparkles,
          color: '#7CFFB2',
        },
        {
          id: 2,
          type: 'platform',
          priority: 'medium',
          title: 'Connect your platforms',
          description: 'Link your social media accounts to start posting',
          impact: 'Enable auto-posting',
          icon: TrendingUp,
          color: '#5CE1E6',
        },
      ];
    }

    return recs;
  }, [platformStats, insights, onboardingGoal, experienceLevel, overviewStats]);

  // Quick insights
  const quickInsights = [
    {
      title: 'Best Performing Platform',
      value: insights.bestPlatform,
      description: 'Highest engagement rate',
    },
    {
      title: 'Optimal Video Length',
      value: insights.avgDuration,
      description: 'Based on your data',
    },
    {
      title: 'Peak Posting Time',
      value: insights.bestTime,
      description: 'Highest engagement window',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#7CFFB2';
      case 'medium':
        return '#5CE1E6';
      case 'low':
        return '#A8FFE0';
      default:
        return '#7CFFB2';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-white/60">Loading recommendations...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-white">AI RECOMMENDATIONS</h1>
          <p className="text-white/60 mt-1">
            Personalized insights based on your data and goals
          </p>
        </div>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickInsights.map((insight, index) => (
            <motion.div
              key={index}
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
              <p className="text-sm text-white/60 mb-2">{insight.title}</p>
              <p className="text-3xl font-bold text-white mb-1 capitalize">{insight.value}</p>
              <p className="text-xs text-white/40">{insight.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">RECOMMENDED ACTIONS</h2>
          <div className="space-y-4">
            {recommendations.map((rec, index) => {
              const Icon = rec.icon;
              return (
                <motion.div
                  key={rec.id}
                  className="p-6 rounded-2xl backdrop-blur-xl"
                  style={{
                    background: 'rgba(124, 255, 178, 0.08)',
                    border: '1px solid rgba(124, 255, 178, 0.2)',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{
                    backgroundColor: 'rgba(124, 255, 178, 0.12)',
                    borderColor: 'rgba(124, 255, 178, 0.3)',
                    x: 4,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${rec.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: rec.color }} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{rec.title}</h3>
                          <p className="text-white/60 text-sm">{rec.description}</p>
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold uppercase"
                          style={{
                            background: `${getPriorityColor(rec.priority)}20`,
                            color: getPriorityColor(rec.priority),
                          }}
                        >
                          {rec.priority}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm font-medium" style={{ color: rec.color }}>
                          {rec.impact}
                        </span>
                        <Link to="/dashboard/create">
                          <motion.button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                            style={{
                              background: `${rec.color}20`,
                              color: rec.color,
                            }}
                            whileHover={{
                              backgroundColor: `${rec.color}30`,
                              gap: '12px',
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Take Action
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="p-8 rounded-2xl backdrop-blur-xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(124, 255, 178, 0.15), rgba(92, 225, 230, 0.15))',
            border: '1px solid rgba(124, 255, 178, 0.3)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Sparkles className="w-12 h-12 text-[#7CFFB2] mx-auto mb-4" />
          <h3 className="text-2xl font-black text-white mb-2">
            READY TO IMPLEMENT THESE INSIGHTS?
          </h3>
          <p className="text-white/60 mb-6">
            Start creating content based on AI recommendations
          </p>
          <Link to="/dashboard/create">
            <motion.button
              className="px-8 py-3 rounded-xl font-semibold"
              style={{
                background: 'linear-gradient(135deg, #7CFFB2, #5CE1E6)',
                color: '#000',
                boxShadow: '0 4px 20px rgba(124, 255, 178, 0.4)',
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 8px 32px rgba(124, 255, 178, 0.6)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              Create Video Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Recommendations;
