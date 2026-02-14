import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

interface SchedulePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  videoTitle: string;
}

const SchedulePostModal = ({ isOpen, onClose, videoId, videoTitle }: SchedulePostModalProps) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduleType, setScheduleType] = useState<'now' | 'schedule'>('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [captions, setCaptions] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const platforms = [
    { id: 'youtube', name: 'YouTube', color: '#FF0000', connected: true },
    { id: 'instagram', name: 'Instagram', color: '#E4405F', connected: true },
    { id: 'tiktok', name: 'TikTok', color: '#000000', connected: false },
    { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2', connected: false },
  ];

  const handlePlatformToggle = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  const handleSubmit = async () => {
    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }

    if (scheduleType === 'schedule' && (!scheduleDate || !scheduleTime)) {
      toast.error('Please select date and time');
      return;
    }

    setLoading(true);
    // TODO: Save to Firestore
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    
    toast.success(
      scheduleType === 'now'
        ? 'Video posted successfully!'
        : 'Video scheduled successfully!'
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div
              className="w-full max-w-2xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
              style={{
                background: 'rgba(5, 10, 10, 0.95)',
                border: '1px solid rgba(124, 255, 178, 0.3)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-white">SCHEDULE POST</h2>
                  <p className="text-white/60 text-sm mt-1">{videoTitle}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {/* Schedule Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-3">
                  When to Post
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    onClick={() => setScheduleType('now')}
                    className="p-4 rounded-xl text-left"
                    style={{
                      background:
                        scheduleType === 'now'
                          ? 'rgba(124, 255, 178, 0.15)'
                          : 'rgba(124, 255, 178, 0.08)',
                      border:
                        scheduleType === 'now'
                          ? '2px solid rgba(124, 255, 178, 0.5)'
                          : '1px solid rgba(124, 255, 178, 0.2)',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5 text-[#7CFFB2] mb-2" />
                    <p className="text-white font-semibold">Post Now</p>
                    <p className="text-white/60 text-xs">Publish immediately</p>
                  </motion.button>

                  <motion.button
                    onClick={() => setScheduleType('schedule')}
                    className="p-4 rounded-xl text-left"
                    style={{
                      background:
                        scheduleType === 'schedule'
                          ? 'rgba(124, 255, 178, 0.15)'
                          : 'rgba(124, 255, 178, 0.08)',
                      border:
                        scheduleType === 'schedule'
                          ? '2px solid rgba(124, 255, 178, 0.5)'
                          : '1px solid rgba(124, 255, 178, 0.2)',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Calendar className="w-5 h-5 text-[#5CE1E6] mb-2" />
                    <p className="text-white font-semibold">Schedule</p>
                    <p className="text-white/60 text-xs">Choose date & time</p>
                  </motion.button>
                </div>
              </div>

              {/* Date & Time (if scheduling) */}
              {scheduleType === 'schedule' && (
                <motion.div
                  className="mb-6 grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#7CFFB2]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#7CFFB2]/50"
                    />
                  </div>
                </motion.div>
              )}

              {/* Platform Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Select Platforms
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => (
                    <motion.button
                      key={platform.id}
                      onClick={() => platform.connected && handlePlatformToggle(platform.id)}
                      disabled={!platform.connected}
                      className="p-4 rounded-xl flex items-center gap-3"
                      style={{
                        background: selectedPlatforms.includes(platform.id)
                          ? 'rgba(124, 255, 178, 0.15)'
                          : 'rgba(124, 255, 178, 0.08)',
                        border: selectedPlatforms.includes(platform.id)
                          ? '2px solid rgba(124, 255, 178, 0.5)'
                          : '1px solid rgba(124, 255, 178, 0.2)',
                        opacity: platform.connected ? 1 : 0.5,
                      }}
                      whileHover={platform.connected ? { scale: 1.02 } : {}}
                      whileTap={platform.connected ? { scale: 0.98 } : {}}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `${platform.color}20` }}
                      >
                        <span className="text-lg font-black" style={{ color: platform.color }}>
                          {platform.name[0]}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-white font-medium text-sm">{platform.name}</p>
                        {!platform.connected && (
                          <p className="text-white/40 text-xs">Not connected</p>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Platform-Specific Captions */}
              {selectedPlatforms.length > 0 && (
                <div className="mb-6 space-y-4">
                  <label className="block text-sm font-medium text-white/80">
                    Captions & Metadata
                  </label>
                  {selectedPlatforms.map((platformId) => {
                    const platform = platforms.find((p) => p.id === platformId);
                    return (
                      <div key={platformId}>
                        <label className="block text-xs text-white/60 mb-2">
                          {platform?.name} Caption
                        </label>
                        <textarea
                          value={captions[platformId] || ''}
                          onChange={(e) =>
                            setCaptions({ ...captions, [platformId]: e.target.value })
                          }
                          rows={3}
                          placeholder={`Write a caption for ${platform?.name}...`}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#7CFFB2]/50 resize-none"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>

                <motion.button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #7CFFB2, #5CE1E6)',
                    color: '#000',
                    boxShadow: '0 4px 20px rgba(124, 255, 178, 0.4)',
                  }}
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  {loading
                    ? 'Processing...'
                    : scheduleType === 'now'
                    ? 'Post Now'
                    : 'Schedule Post'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SchedulePostModal;
