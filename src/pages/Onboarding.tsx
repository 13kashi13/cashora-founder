import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, DollarSign, Target, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/supabase';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [formData, setFormData] = useState({
    goal: '',
    experienceLevel: '',
    platforms: [] as string[],
  });

  // Check if user has already completed onboarding
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user?.id) {
        setCheckingOnboarding(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('users')
          .select('goal, experience_level, selected_platforms')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          // If user has completed onboarding (has goal set), redirect to dashboard
          if (data.goal && data.experience_level && data.selected_platforms?.length > 0) {
            console.log('User has already completed onboarding, redirecting to dashboard');
            navigate('/dashboard', { replace: true });
            return;
          }
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      } finally {
        setCheckingOnboarding(false);
      }
    };

    checkOnboardingStatus();
  }, [user, navigate]);

  const goals = [
    {
      id: 'growth',
      name: 'Audience Growth',
      description: 'Build a larger following across platforms',
      icon: TrendingUp,
      color: '#7CFFB2',
    },
    {
      id: 'monetization',
      name: 'Monetization',
      description: 'Generate revenue from your content',
      icon: DollarSign,
      color: '#5CE1E6',
    },
    {
      id: 'both',
      name: 'Both',
      description: 'Grow audience and maximize earnings',
      icon: Target,
      color: '#A8FFE0',
    },
  ];

  const experienceLevels = [
    {
      id: 'beginner',
      name: 'Beginner',
      description: 'Just getting started with content creation',
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      description: 'Have some experience, looking to scale',
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'Experienced creator, want to optimize',
    },
  ];

  const platforms = [
    { id: 'youtube', name: 'YouTube', color: '#FF0000' },
    { id: 'instagram', name: 'Instagram', color: '#E4405F' },
    { id: 'tiktok', name: 'TikTok', color: '#000000' },
    { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2' },
  ];

  const handleGoalSelect = (goalId: string) => {
    setFormData({ ...formData, goal: goalId });
  };

  const handleExperienceSelect = (level: string) => {
    setFormData({ ...formData, experienceLevel: level });
  };

  const handlePlatformToggle = (platformId: string) => {
    const newPlatforms = formData.platforms.includes(platformId)
      ? formData.platforms.filter((p) => p !== platformId)
      : [...formData.platforms, platformId];
    setFormData({ ...formData, platforms: newPlatforms });
  };

  const handleNext = () => {
    if (step === 1 && !formData.goal) {
      toast.error('Please select your goal');
      return;
    }
    if (step === 2 && !formData.experienceLevel) {
      toast.error('Please select your experience level');
      return;
    }
    if (step === 3 && formData.platforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    if (!user?.id) {
      console.error('Onboarding error: User not authenticated', { user });
      toast.error('User not authenticated');
      return;
    }

    setSaving(true);
    
    try {
      console.log('Attempting to save onboarding data:', {
        userId: user.id,
        email: user.email,
        formData,
      });

      // Save to proper columns (not JSON blob)
      const { data: upsertedUser, error: upsertError } = await supabase
        .from('users')
        .upsert(
          {
            id: user.id,
            email: user.email || '',
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
            avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
            goal: formData.goal,
            experience_level: formData.experienceLevel,
            selected_platforms: formData.platforms,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: 'id',
            ignoreDuplicates: false,
          }
        )
        .select()
        .single();

      if (upsertError) {
        console.error('Onboarding upsert error:', {
          error: upsertError,
          message: upsertError.message,
          details: upsertError.details,
          hint: upsertError.hint,
          code: upsertError.code,
        });
        toast.error(`Failed to save: ${upsertError.message || 'Unknown error'}`);
      } else {
        console.log('Onboarding data saved successfully:', upsertedUser);
        toast.success('Welcome to Cashora!');
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Unexpected onboarding error:', {
        error,
        message: error?.message,
        stack: error?.stack,
      });
      toast.error(`Error: ${error?.message || 'Something went wrong'}`);
    } finally {
      setSaving(false);
    }
  };

  // Show loading while checking onboarding status
  if (checkingOnboarding) {
    return (
      <div className="min-h-screen bg-[#050a0a] flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative w-16 h-16">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #7CFFB2, #5CE1E6)',
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
              }}
            />
          </div>
          <p className="text-white/60 text-sm">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="/logo-new.png" 
            alt="Cashora Logo" 
            className="h-16 w-auto"
          />
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Step {step} of 3</span>
            <span className="text-sm text-white/60">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #7CFFB2, #5CE1E6)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Goal Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-white mb-3">
                  WHAT'S YOUR MAIN GOAL?
                </h1>
                <p className="text-white/60">
                  Help us personalize your experience
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {goals.map((goal) => {
                  const Icon = goal.icon;
                  const isSelected = formData.goal === goal.id;

                  return (
                    <motion.button
                      key={goal.id}
                      onClick={() => handleGoalSelect(goal.id)}
                      className="p-6 rounded-2xl text-left"
                      style={{
                        background: isSelected
                          ? 'rgba(124, 255, 178, 0.15)'
                          : 'rgba(124, 255, 178, 0.08)',
                        border: isSelected
                          ? '2px solid rgba(124, 255, 178, 0.5)'
                          : '1px solid rgba(124, 255, 178, 0.2)',
                      }}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: 'rgba(124, 255, 178, 0.12)',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{
                          background: `${goal.color}20`,
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: goal.color }} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {goal.name}
                      </h3>
                      <p className="text-sm text-white/60">{goal.description}</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Experience Level */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-white mb-3">
                  YOUR EXPERIENCE LEVEL?
                </h1>
                <p className="text-white/60">
                  We'll tailor recommendations to your skill level
                </p>
              </div>

              <div className="space-y-4 max-w-2xl mx-auto">
                {experienceLevels.map((level) => {
                  const isSelected = formData.experienceLevel === level.id;

                  return (
                    <motion.button
                      key={level.id}
                      onClick={() => handleExperienceSelect(level.id)}
                      className="w-full p-6 rounded-2xl text-left flex items-center gap-4"
                      style={{
                        background: isSelected
                          ? 'rgba(124, 255, 178, 0.15)'
                          : 'rgba(124, 255, 178, 0.08)',
                        border: isSelected
                          ? '2px solid rgba(124, 255, 178, 0.5)'
                          : '1px solid rgba(124, 255, 178, 0.2)',
                      }}
                      whileHover={{
                        scale: 1.01,
                        backgroundColor: 'rgba(124, 255, 178, 0.12)',
                      }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isSelected
                            ? 'linear-gradient(135deg, #7CFFB2, #5CE1E6)'
                            : 'rgba(124, 255, 178, 0.2)',
                        }}
                      >
                        <Sparkles
                          className="w-6 h-6"
                          style={{ color: isSelected ? '#000' : '#7CFFB2' }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {level.name}
                        </h3>
                        <p className="text-sm text-white/60">{level.description}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Platform Selection */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-white mb-3">
                  SELECT YOUR PLATFORMS
                </h1>
                <p className="text-white/60">
                  Choose where you want to publish content
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                {platforms.map((platform) => {
                  const isSelected = formData.platforms.includes(platform.id);

                  return (
                    <motion.button
                      key={platform.id}
                      onClick={() => handlePlatformToggle(platform.id)}
                      className="aspect-square p-6 rounded-2xl flex flex-col items-center justify-center gap-3"
                      style={{
                        background: isSelected
                          ? 'rgba(124, 255, 178, 0.15)'
                          : 'rgba(124, 255, 178, 0.08)',
                        border: isSelected
                          ? '2px solid rgba(124, 255, 178, 0.5)'
                          : '1px solid rgba(124, 255, 178, 0.2)',
                      }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: 'rgba(124, 255, 178, 0.12)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center"
                        style={{
                          background: isSelected
                            ? 'linear-gradient(135deg, #7CFFB2, #5CE1E6)'
                            : 'rgba(124, 255, 178, 0.2)',
                        }}
                      >
                        <span className="text-2xl font-black" style={{ color: isSelected ? '#000' : '#7CFFB2' }}>
                          {platform.name[0]}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-white">
                        {platform.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-12">
          <motion.button
            onClick={() => setStep(Math.max(1, step - 1))}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
            style={{
              background: step === 1 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(124, 255, 178, 0.12)',
              border: '1px solid rgba(124, 255, 178, 0.2)',
              color: step === 1 ? 'rgba(255, 255, 255, 0.3)' : '#7CFFB2',
            }}
            disabled={step === 1}
            whileHover={step > 1 ? { scale: 1.02 } : {}}
            whileTap={step > 1 ? { scale: 0.98 } : {}}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold"
            style={{
              background: saving 
                ? 'rgba(124, 255, 178, 0.3)'
                : 'linear-gradient(135deg, #7CFFB2, #5CE1E6)',
              color: '#000',
              boxShadow: saving 
                ? 'none'
                : '0 4px 20px rgba(124, 255, 178, 0.4)',
            }}
            whileHover={!saving ? {
              boxShadow: '0 8px 32px rgba(124, 255, 178, 0.6)',
              scale: 1.02,
            } : {}}
            whileTap={!saving ? { scale: 0.98 } : {}}
          >
            {saving ? 'Saving...' : step === 3 ? 'Complete' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
