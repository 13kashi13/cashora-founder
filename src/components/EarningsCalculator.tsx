import { motion } from "framer-motion";
import { Calculator, DollarSign, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const EarningsCalculator = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [videos, setVideos] = useState(10);
  const [platforms, setPlatforms] = useState(5);
  
  const earningsPerVideo = 50;
  const monthlyEarnings = videos * platforms * earningsPerVideo;
  const yearlyEarnings = monthlyEarnings * 12;
  const timeSaved = videos * platforms * 15; // minutes per month

  return (
    <section className="section-spacing relative overflow-hidden" ref={ref}>
      <div className="container-wide">
        <motion.div
          className="max-w-4xl mx-auto backdrop-blur-2xl rounded-3xl p-8 md:p-12"
          style={{
            background: 'rgba(5, 10, 10, 0.6)',
            border: '1px solid rgba(124, 255, 178, 0.3)',
            boxShadow: '0 0 60px rgba(124, 255, 178, 0.15)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Calculator className="w-6 h-6" style={{ color: '#7CFFB2' }} />
              <h2 className="text-3xl md:text-4xl font-bold" style={{
                background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Calculate Your Earnings
              </h2>
            </motion.div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              See how much you could earn with automated content distribution
            </p>
          </div>

          {/* Sliders */}
          <div className="space-y-8 mb-8">
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Videos per month
                </label>
                <span className="text-lg font-bold" style={{ color: '#7CFFB2' }}>
                  {videos}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={videos}
                onChange={(e) => setVideos(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #7CFFB2 0%, #7CFFB2 ${videos}%, rgba(124, 255, 178, 0.2) ${videos}%, rgba(124, 255, 178, 0.2) 100%)`,
                }}
              />
            </div>

            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Platforms
                </label>
                <span className="text-lg font-bold" style={{ color: '#5CE1E6' }}>
                  {platforms}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                value={platforms}
                onChange={(e) => setPlatforms(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #5CE1E6 0%, #5CE1E6 ${(platforms / 7) * 100}%, rgba(92, 225, 230, 0.2) ${(platforms / 7) * 100}%, rgba(92, 225, 230, 0.2) 100%)`,
                }}
              />
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <motion.div
              className="backdrop-blur-xl rounded-xl p-6 text-center"
              style={{
                background: 'rgba(124, 255, 178, 0.1)',
                border: '1px solid rgba(124, 255, 178, 0.3)',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <DollarSign className="w-8 h-8 mx-auto mb-2" style={{ color: '#7CFFB2' }} />
              <div className="text-2xl font-bold mb-1" style={{ color: '#7CFFB2' }}>
                ${monthlyEarnings.toLocaleString()}
              </div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Per Month
              </div>
            </motion.div>

            <motion.div
              className="backdrop-blur-xl rounded-xl p-6 text-center"
              style={{
                background: 'rgba(94, 225, 230, 0.1)',
                border: '1px solid rgba(94, 225, 230, 0.3)',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="w-8 h-8 mx-auto mb-2" style={{ color: '#5CE1E6' }} />
              <div className="text-2xl font-bold mb-1" style={{ color: '#5CE1E6' }}>
                ${yearlyEarnings.toLocaleString()}
              </div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Per Year
              </div>
            </motion.div>

            <motion.div
              className="backdrop-blur-xl rounded-xl p-6 text-center"
              style={{
                background: 'rgba(168, 255, 224, 0.1)',
                border: '1px solid rgba(168, 255, 224, 0.3)',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Calculator className="w-8 h-8 mx-auto mb-2" style={{ color: '#A8FFE0' }} />
              <div className="text-2xl font-bold mb-1" style={{ color: '#A8FFE0' }}>
                {timeSaved}h
              </div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Time Saved
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.a
            href="/signup"
            className="w-full py-4 rounded-xl font-semibold relative overflow-hidden flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(90deg, #1ED760, #5CE1E6)',
              color: '#000',
              boxShadow: '0 0 30px rgba(30, 215, 96, 0.4)',
            }}
            whileHover={{ boxShadow: '0 0 40px rgba(30, 215, 96, 0.6)', scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Earning Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default EarningsCalculator;
