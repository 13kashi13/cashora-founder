import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import { smoothScrollToWithInertia } from "@/lib/smoothScroll";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  // Simplified mouse parallax - only on desktop, using centralized RAF
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable parallax on mobile for performance
    if (window.innerWidth < 768) return;

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      
      const { innerWidth, innerHeight } = window;
      mouseX.set((lastX - innerWidth / 2) / 80);
      mouseY.set((lastY - innerHeight / 2) / 80);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    smoothScrollToWithInertia(targetId);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Simplified concentric rings - static for performance */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
        className="absolute top-[20%] left-[15%] w-32 h-32 rounded-full"
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
        className="absolute top-[60%] right-[12%] w-40 h-40 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(94, 225, 230, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ 
          y: [0, 25, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Optimized 3D FLOATING DOLLAR SIGNS - reduced count and complexity */}
      <motion.div
        className="absolute top-[15%] right-[15%]"
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
        className="absolute bottom-[20%] left-[10%]"
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
        className="relative z-10 container-wide text-center"
        style={{ y, opacity, scale }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
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
        <motion.h1
          className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-extrabold tracking-tighter mb-6 leading-[1.15] relative px-4"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
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
            className="relative"
            style={{
              background: 'linear-gradient(90deg, #7CFFB2 0%, #A8FFE0 50%, #5CE1E6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            CASHORA
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl font-black max-w-2xl mx-auto mb-4 backdrop-blur-sm px-6 py-3 rounded-2xl uppercase"
          style={{ 
            color: '#E5E7EB',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          AI-POWERED CONTENT AUTOMATION FOR PASSIVE INCOME
        </motion.p>

        <motion.p
          className="text-sm sm:text-base max-w-xl mx-auto mb-12 backdrop-blur-sm px-6 py-2 rounded-xl font-bold uppercase"
          style={{ 
            color: '#9CA3AF',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          TURN A SINGLE PROMPT INTO AI-GENERATED VIDEOS AND DISTRIBUTE THEM ACROSS MULTIPLE PLATFORMS WITH ONE CLICK.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="#how-it-works"
            onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
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
            <Play className="w-4 h-4" />
            See How It Works
          </motion.a>
          <Link to="/signup">
            <motion.button
              className="relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold rounded-full cursor-pointer backdrop-blur-xl overflow-hidden"
              style={{
                background: 'rgba(124, 255, 178, 0.05)',
                border: '1px solid rgba(124, 255, 178, 0.3)',
                color: 'rgba(124, 255, 178, 0.95)',
                boxShadow: '0 0 20px rgba(124, 255, 178, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              }}
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(124, 255, 178, 0.5)',
                boxShadow: '0 0 30px rgba(124, 255, 178, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(124, 255, 178, 0.08)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
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
