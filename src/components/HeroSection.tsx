import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import { smoothScrollToWithInertia } from "@/lib/smoothScroll";
import { Link } from "react-router-dom";
import ScrollingPlatforms from "./OrbitingPlatforms";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    smoothScrollToWithInertia(targetId);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* Simplified concentric rings - static for performance */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full"
            style={{
              width: `${ring * 300}px`,
              height: `${ring * 300}px`,
              border: '1px solid rgba(124, 255, 178, 0.02)',
              opacity: 0.15,
            }}
          />
        ))}
      </div>

      {/* Simplified floating orbs - reduced animations */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124, 255, 178, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ 
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-[60%] right-[12%] w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(94, 225, 230, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ 
          y: [0, 25, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Cyan decorative corner glow - NO CLIPPING */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(92, 225, 230, 0.15) 0%, transparent 60%)',
          filter: 'blur(80px)',
          transform: 'translate(30%, -30%)',
        }}
      />

      {/* Optimized 3D FLOATING DOLLAR SIGNS - reduced count and complexity */}
      <motion.div
        className="absolute top-[15%] right-[15%] pointer-events-none"
        style={{
          fontSize: '120px',
          fontWeight: 'bold',
          color: 'rgba(124, 255, 178, 0.18)',
          textShadow: '0 0 40px rgba(124, 255, 178, 0.6), 5px 5px 0 rgba(124, 255, 178, 0.3)',
        }}
        animate={{
          y: [0, -25, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        $
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[10%] pointer-events-none"
        style={{
          fontSize: '140px',
          fontWeight: 'bold',
          color: 'rgba(94, 225, 230, 0.15)',
          textShadow: '0 0 50px rgba(94, 225, 230, 0.7), 6px 6px 0 rgba(94, 225, 230, 0.3)',
        }}
        animate={{
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        $
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container-wide text-center px-4 overflow-visible"
        style={{ y, opacity, scale }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase backdrop-blur-xl"
            style={{
              border: '1px solid rgba(124, 255, 178, 0.3)',
              backgroundColor: 'rgba(124, 255, 178, 0.08)',
              color: 'rgba(124, 255, 178, 0.95)',
              boxShadow: '0 0 30px rgba(124, 255, 178, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" 
              style={{ backgroundColor: '#7CFFB2', boxShadow: '0 0 10px #7CFFB2' }}
            />
            AI-POWERED AUTOMATION
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="overflow-visible py-4 relative z-20 mb-12">
          <motion.h1
            className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-extrabold tracking-tighter relative overflow-visible"
            style={{
              lineHeight: '1.15',
            }}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
          {/* Animated gradient particles */}
          <div className="absolute inset-0 overflow-visible pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 3 === 0 
                    ? 'radial-gradient(circle, #7CFFB2 0%, transparent 70%)'
                    : i % 3 === 1
                    ? 'radial-gradient(circle, #5CE1E6 0%, transparent 70%)'
                    : 'radial-gradient(circle, #A8FFE0 0%, transparent 70%)',
                  boxShadow: i % 3 === 0 
                    ? '0 0 20px #7CFFB2'
                    : i % 3 === 1
                    ? '0 0 20px #5CE1E6'
                    : '0 0 20px #A8FFE0',
                  filter: 'blur(1px)',
                }}
                animate={{
                  x: ['-10%', '110%'],
                  y: [
                    `${20 + (i * 3)}%`,
                    `${25 + (i * 3)}%`,
                    `${20 + (i * 3)}%`,
                  ],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + (i * 0.2),
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          <span
            className="absolute inset-0 blur-[140px]"
            style={{
              background: 'linear-gradient(90deg, #7CFFB2 0%, #A8FFE0 50%, #5CE1E6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 0.2,
            }}
          >
            CASHORA
          </span>
          
          <span
            className="absolute inset-0 blur-[80px]"
            style={{
              background: 'linear-gradient(90deg, #7CFFB2 0%, #A8FFE0 50%, #5CE1E6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 0.35,
            }}
          >
            CASHORA
          </span>
          
          <span
            className="absolute inset-0 blur-[40px]"
            style={{
              background: 'linear-gradient(90deg, #7CFFB2 0%, #A8FFE0 50%, #5CE1E6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 0.45,
            }}
          >
            CASHORA
          </span>
          
          <span
            className="relative block z-10"
            style={{
              background: 'linear-gradient(90deg, #7CFFB2 0%, #A8FFE0 50%, #5CE1E6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              paddingBottom: '0.1em',
            }}
          >
            CASHORA
          </span>
          </motion.h1>
        </div>

        {/* Subheading - Glossy Shiny Box */}
        <motion.div
          className="relative max-w-4xl mx-auto mb-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Outer glow */}
          <div
            className="absolute inset-0 rounded-2xl blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(124, 255, 178, 0.3), rgba(92, 225, 230, 0.3))',
              opacity: 0.6,
            }}
          />

          {/* Glass container with shine */}
          <div
            className="relative backdrop-blur-xl px-8 py-5 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(124, 255, 178, 0.15) 0%, rgba(92, 225, 230, 0.1) 100%)',
              border: '1px solid rgba(124, 255, 178, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(124, 255, 178, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
              }}
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'easeInOut',
              }}
            />

            {/* Top highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5) 50%, transparent)',
              }}
            />

            {/* Text content */}
            <p
              className="relative text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase text-center leading-relaxed"
              style={{
                color: '#FFFFFF',
                textShadow: '0 0 30px rgba(124, 255, 178, 0.6), 0 2px 10px rgba(0, 0, 0, 0.8)',
              }}
            >
              Consistency creates monetization We automate consistency
            </p>
          </div>
        </motion.div>

        {/* Scrolling Platforms Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mb-16"
        >
          <ScrollingPlatforms duration={20} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/signup">
            <motion.button
              className="relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold rounded-full cursor-pointer overflow-hidden backdrop-blur-xl"
              style={{
                background: 'linear-gradient(90deg, #1ED760, #5CE1E6)',
                color: '#000',
                boxShadow: '0 0 40px rgba(30, 215, 96, 0.5), 0 0 80px rgba(92, 225, 230, 0.3), 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 60px rgba(30, 215, 96, 0.7), 0 0 100px rgba(92, 225, 230, 0.4), 0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
          <motion.a
            href="#how-it-works"
            onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
            className="relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold rounded-full cursor-pointer backdrop-blur-xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(124, 255, 178, 0.2)',
              color: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
            whileHover={{ 
              scale: 1.05,
              borderColor: 'rgba(124, 255, 178, 0.3)',
              boxShadow: '0 6px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
            <Play className="w-4 h-4" />
            See How It Works
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 rounded-full bg-primary/70"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
