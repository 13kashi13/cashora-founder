import { motion } from "framer-motion";
import { Users, TrendingUp, Award, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

const SocialProofSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [creatorCount, setCreatorCount] = useState(0);
  const targetCount = 10247;

  useEffect(() => {
    if (isVisible && creatorCount < targetCount) {
      const duration = 2000;
      const steps = 60;
      const increment = targetCount / steps;
      const stepDuration = duration / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetCount) {
          setCreatorCount(targetCount);
          clearInterval(timer);
        } else {
          setCreatorCount(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible, creatorCount, targetCount]);

  const stats = [
    { icon: Users, value: creatorCount.toLocaleString() + "+", label: "Active Creators" },
    { icon: TrendingUp, value: "500M+", label: "Content Pieces Published" },
    { icon: Award, value: "98%", label: "Satisfaction Rate" },
    { icon: Zap, value: "10x", label: "Faster Publishing" },
  ];

  return (
    <section className="section-spacing relative overflow-hidden" ref={ref}>
      <div className="container-wide">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative backdrop-blur-xl rounded-2xl p-6 md:p-8"
              style={{
                background: 'rgba(5, 10, 10, 0.4)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
                boxShadow: '0 0 40px rgba(124, 255, 178, 0.1)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background: 'rgba(124, 255, 178, 0.1)',
                    border: '1px solid rgba(124, 255, 178, 0.3)',
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#7CFFB2' }} />
                </motion.div>
                
                <motion.div
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.value}
                </motion.div>
                
                <div className="text-sm md:text-base" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.a
            href="#pricing"
            className="relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold rounded-full cursor-pointer backdrop-blur-xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1ED760, #5CE1E6)',
              color: '#000',
              boxShadow: '0 0 40px rgba(30, 215, 96, 0.5)',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(30, 215, 96, 0.7)' }}
            whileTap={{ scale: 0.98 }}
          >
            <Users className="w-5 h-5" />
            Join {creatorCount.toLocaleString()}+ Creators
          </motion.a>

          <motion.a
            href="#team"
            className="relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold rounded-full cursor-pointer backdrop-blur-xl overflow-hidden"
            style={{
              background: 'rgba(124, 255, 178, 0.05)',
              border: '1px solid rgba(124, 255, 178, 0.3)',
              color: 'rgba(124, 255, 178, 0.95)',
            }}
            whileHover={{ 
              background: 'rgba(124, 255, 178, 0.1)',
              scale: 1.05,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Award className="w-5 h-5" />
            See Success Stories
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
