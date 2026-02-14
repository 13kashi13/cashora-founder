import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Wand2,
  Video,
  Mic,
  Palette,
  Eye,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';
import DashboardLayout from '@/layouts/DashboardLayout';

const VideoGenerator = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    script: '',
    style: '',
    background: '',
    textAnimation: '',
    voice: '',
    logo: '',
    brandColors: [] as string[],
    cta: '',
    format: 'vertical' as 'vertical' | 'square' | 'horizontal',
  });

  const videoStyles = [
    { id: 'faceless-minimal', name: 'Minimal', description: 'Clean, simple design' },
    { id: 'faceless-dynamic', name: 'Dynamic', description: 'Energetic animations' },
    { id: 'faceless-professional', name: 'Professional', description: 'Business-ready' },
  ];

  const backgrounds = [
    { id: 'gradient', name: 'Gradient', preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'abstract', name: 'Abstract', preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 'nature', name: 'Nature', preview: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  ];

  const textAnimations = [
    { id: 'fade', name: 'Fade In' },
    { id: 'slide', name: 'Slide Up' },
    { id: 'typewriter', name: 'Typewriter' },
  ];

  const voices = [
    { id: 'voice-1', name: 'Alex', description: 'Professional male voice', preview: '' },
    { id: 'voice-2', name: 'Sarah', description: 'Friendly female voice', preview: '' },
    { id: 'voice-3', name: 'James', description: 'Deep authoritative voice', preview: '' },
  ];

  const formats = [
    { id: 'vertical', name: 'Vertical', ratio: '9:16', description: 'TikTok, Instagram Reels' },
    { id: 'square', name: 'Square', ratio: '1:1', description: 'Instagram Feed' },
    { id: 'horizontal', name: 'Horizontal', ratio: '16:9', description: 'YouTube' },
  ];

  const handleGenerateScript = async () => {
    if (!formData.topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setGenerating(true);
    // Simulate AI script generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const mockScript = `Hook: Did you know ${formData.topic} can change everything?\n\nMain Content: Here's what you need to know about ${formData.topic}...\n\nCall to Action: Follow for more tips!`;
    
    setFormData({ ...formData, script: mockScript });
    setGenerating(false);
    toast.success('Script generated!');
  };

  const handleNext = () => {
    if (step === 1 && !formData.script) {
      toast.error('Please generate a script first');
      return;
    }
    if (step === 2 && !formData.style) {
      toast.error('Please select a video style');
      return;
    }
    if (step === 3 && !formData.voice) {
      toast.error('Please select a voice');
      return;
    }

    if (step < 5) {
      setStep(step + 1);
    } else {
      handleGenerate();
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    // TODO: Call video generation API
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setGenerating(false);
    toast.success('Video generated successfully!');
    navigate('/dashboard/library');
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Step {step} of 5</span>
            <span className="text-sm text-white/60">{Math.round((step / 5) * 100)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #7CFFB2, #5CE1E6)',
              }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Topic & Script */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-white mb-3">
                  WHAT'S YOUR VIDEO ABOUT?
                </h1>
                <p className="text-white/60">Enter a topic and we'll generate a script</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Video Topic
                  </label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="e.g., 10 AI tools that will change your life"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#7CFFB2]/50"
                  />
                </div>

                <motion.button
                  onClick={handleGenerateScript}
                  disabled={generating}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #7CFFB2, #5CE1E6)',
                    color: '#000',
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Wand2 className="w-5 h-5" />
                  {generating ? 'Generating...' : 'Generate Script with AI'}
                </motion.button>

                {formData.script && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Generated Script (Editable)
                    </label>
                    <textarea
                      value={formData.script}
                      onChange={(e) => setFormData({ ...formData, script: e.target.value })}
                      rows={10}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#7CFFB2]/50 resize-none"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2: Style Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-white mb-3">
                  CHOOSE YOUR STYLE
                </h1>
                <p className="text-white/60">Select video style and background</p>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Video Style</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {videoStyles.map((style) => (
                      <motion.button
                        key={style.id}
                        onClick={() => setFormData({ ...formData, style: style.id })}
                        className="p-6 rounded-xl text-left"
                        style={{
                          background:
                            formData.style === style.id
                              ? 'rgba(124, 255, 178, 0.15)'
                              : 'rgba(124, 255, 178, 0.08)',
                          border:
                            formData.style === style.id
                              ? '2px solid rgba(124, 255, 178, 0.5)'
                              : '1px solid rgba(124, 255, 178, 0.2)',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h4 className="text-white font-bold mb-1">{style.name}</h4>
                        <p className="text-sm text-white/60">{style.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Background</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {backgrounds.map((bg) => (
                      <motion.button
                        key={bg.id}
                        onClick={() => setFormData({ ...formData, background: bg.id })}
                        className="p-4 rounded-xl"
                        style={{
                          background:
                            formData.background === bg.id
                              ? 'rgba(124, 255, 178, 0.15)'
                              : 'rgba(124, 255, 178, 0.08)',
                          border:
                            formData.background === bg.id
                              ? '2px solid rgba(124, 255, 178, 0.5)'
                              : '1px solid rgba(124, 255, 178, 0.2)',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className="w-full h-24 rounded-lg mb-3"
                          style={{ background: bg.preview }}
                        />
                        <p className="text-white font-medium text-center">{bg.name}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Text Animation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {textAnimations.map((anim) => (
                      <motion.button
                        key={anim.id}
                        onClick={() => setFormData({ ...formData, textAnimation: anim.id })}
                        className="p-4 rounded-xl"
                        style={{
                          background:
                            formData.textAnimation === anim.id
                              ? 'rgba(124, 255, 178, 0.15)'
                              : 'rgba(124, 255, 178, 0.08)',
                          border:
                            formData.textAnimation === anim.id
                              ? '2px solid rgba(124, 255, 178, 0.5)'
                              : '1px solid rgba(124, 255, 178, 0.2)',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <p className="text-white font-medium text-center">{anim.name}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Voice Selection */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-white mb-3">
                  SELECT AI VOICE
                </h1>
                <p className="text-white/60">Choose the voice for your video</p>
              </div>

              <div className="space-y-4 max-w-2xl mx-auto">
                {voices.map((voice) => (
                  <motion.button
                    key={voice.id}
                    onClick={() => setFormData({ ...formData, voice: voice.id })}
                    className="w-full p-6 rounded-xl flex items-center gap-4"
                    style={{
                      background:
                        formData.voice === voice.id
                          ? 'rgba(124, 255, 178, 0.15)'
                          : 'rgba(124, 255, 178, 0.08)',
                      border:
                        formData.voice === voice.id
                          ? '2px solid rgba(124, 255, 178, 0.5)'
                          : '1px solid rgba(124, 255, 178, 0.2)',
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background:
                          formData.voice === voice.id
                            ? 'linear-gradient(135deg, #7CFFB2, #5CE1E6)'
                            : 'rgba(124, 255, 178, 0.2)',
                      }}
                    >
                      <Mic
                        className="w-6 h-6"
                        style={{ color: formData.voice === voice.id ? '#000' : '#7CFFB2' }}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-bold text-white">{voice.name}</h3>
                      <p className="text-sm text-white/60">{voice.description}</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-white/10 text-white/80 text-sm hover:bg-white/20">
                      Preview
                    </button>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Branding */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-white mb-3">
                  ADD YOUR BRANDING
                </h1>
                <p className="text-white/60">Optional: Customize with your brand</p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Call to Action (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.cta}
                    onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                    placeholder="e.g., Follow for more tips!"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#7CFFB2]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Video Format
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {formats.map((format) => (
                      <motion.button
                        key={format.id}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            format: format.id as 'vertical' | 'square' | 'horizontal',
                          })
                        }
                        className="p-4 rounded-xl"
                        style={{
                          background:
                            formData.format === format.id
                              ? 'rgba(124, 255, 178, 0.15)'
                              : 'rgba(124, 255, 178, 0.08)',
                          border:
                            formData.format === format.id
                              ? '2px solid rgba(124, 255, 178, 0.5)'
                              : '1px solid rgba(124, 255, 178, 0.2)',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-center">
                          <p className="text-white font-bold mb-1">{format.name}</p>
                          <p className="text-xs text-white/60 mb-2">{format.ratio}</p>
                          <p className="text-xs text-white/40">{format.description}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Preview & Generate */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-white mb-3">
                  REVIEW & GENERATE
                </h1>
                <p className="text-white/60">Check everything before generating</p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: 'rgba(124, 255, 178, 0.08)',
                    border: '1px solid rgba(124, 255, 178, 0.2)',
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7CFFB2] mt-0.5" />
                      <div>
                        <p className="text-white/60 text-sm">Topic</p>
                        <p className="text-white font-medium">{formData.topic}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7CFFB2] mt-0.5" />
                      <div>
                        <p className="text-white/60 text-sm">Style</p>
                        <p className="text-white font-medium">
                          {videoStyles.find((s) => s.id === formData.style)?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7CFFB2] mt-0.5" />
                      <div>
                        <p className="text-white/60 text-sm">Voice</p>
                        <p className="text-white font-medium">
                          {voices.find((v) => v.id === formData.voice)?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7CFFB2] mt-0.5" />
                      <div>
                        <p className="text-white/60 text-sm">Format</p>
                        <p className="text-white font-medium">
                          {formats.find((f) => f.id === formData.format)?.name} (
                          {formats.find((f) => f.id === formData.format)?.ratio})
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {generating && (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 rounded-full"
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
                    <p className="text-white font-medium">Generating your video...</p>
                    <p className="text-white/60 text-sm mt-1">This may take a few moments</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12">
          <motion.button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={generating}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
            style={{
              background:
                step === 1 || generating
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(124, 255, 178, 0.12)',
              border: '1px solid rgba(124, 255, 178, 0.2)',
              color:
                step === 1 || generating ? 'rgba(255, 255, 255, 0.3)' : '#7CFFB2',
            }}
            whileHover={step > 1 && !generating ? { scale: 1.02 } : {}}
            whileTap={step > 1 && !generating ? { scale: 0.98 } : {}}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={generating}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold"
            style={{
              background: generating
                ? 'rgba(124, 255, 178, 0.3)'
                : 'linear-gradient(135deg, #7CFFB2, #5CE1E6)',
              color: '#000',
              boxShadow: generating
                ? 'none'
                : '0 4px 20px rgba(124, 255, 178, 0.4)',
            }}
            whileHover={!generating ? { scale: 1.02 } : {}}
            whileTap={!generating ? { scale: 0.98 } : {}}
          >
            {step === 5 ? (
              <>
                <Video className="w-5 h-5" />
                Generate Video
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VideoGenerator;
