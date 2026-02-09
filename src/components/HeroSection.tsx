import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import { smoothScrollToWithInertia } from "@/lib/smoothScroll";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 50);
      mouseY.set((clientY - innerHeight / 2) / 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
      {/* Concentric rings - automation loops with parallax */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3, 4, 5].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full"
            style={{
              width: `${ring * 260}px`,
              height: `${ring * 260}px`,
              border: '1px solid rgba(124, 255, 178, 0.015)',
              x: useTransform(mouseXSpring, (x) => x * ring * 0.1),
              y: useTransform(mouseYSpring, (y) => y * ring * 0.1),
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ 
              duration: 10,
              delay: ring * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating orbs with parallax */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124, 255, 178, 0.2) 0%, transparent 70%)',
          filter: 'blur(40px)',
          x: useTransform(mouseXSpring, (x) => x * 2),
          y: useTransform(mouseYSpring, (y) => y * 2),
        }}
        animate={{ 
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-[60%] right-[12%] w-40 h-40 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(94, 225, 230, 0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
          x: useTransform(mouseXSpring, (x) => x * -1.5),
          y: useTransform(mouseYSpring, (y) => y * -1.5),
        }}
        animate={{ 
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="absolute bottom-[30%] left-[8%] w-24 h-24 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 255, 224, 0.15) 0%, transparent 70%)',
          filter: 'blur(35px)',
          x: useTransform(mouseXSpring, (x) => x * 1.8),
          y: useTransform(mouseYSpring, (y) => y * 1.8),
        }}
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Geometric shapes with parallax */}
      <motion.div
        className="absolute top-[35%] right-[20%] w-4 h-4 rounded-full"
        style={{
          background: 'rgba(124, 255, 178, 0.6)',
          boxShadow: '0 0 30px rgba(124, 255, 178, 0.8)',
          x: useTransform(mouseXSpring, (x) => x * -2),
          y: useTransform(mouseYSpring, (y) => y * -2),
        }}
        animate={{ 
          y: [0, -50, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-[50%] left-[25%] w-3 h-3 rounded-full"
        style={{
          background: 'rgba(94, 225, 230, 0.7)',
          boxShadow: '0 0 25px rgba(94, 225, 230, 0.9)',
          x: useTransform(mouseXSpring, (x) => x * 2.5),
          y: useTransform(mouseYSpring, (y) => y * 2.5),
        }}
        animate={{ 
          y: [0, 40, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* 3D FLOATING DOLLAR SIGNS */}
      <motion.div
        className="absolute top-[15%] right-[15%]"
        style={{
          fontSize: '120px',
          fontWeight: 'bold',
          color: 'rgba(124, 255, 178, 0.2)',
          textShadow: '0 0 40px rgba(124, 255, 178, 0.7), 0 0 80px rgba(124, 255, 178, 0.5), 5px 5px 0 rgba(124, 255, 178, 0.4), 10px 10px 0 rgba(124, 255, 178, 0.3)',
          x: useTransform(mouseXSpring, (x) => x * -3),
          y: useTransform(mouseYSpring, (y) => y * -3),
          rotateX: useTransform(mouseYSpring, (y) => y * 2),
          rotateY: useTransform(mouseXSpring, (x) => x * 2),
        }}
        animate={{
          y: [0, -30, 0],
          rotateZ: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        $
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[10%]"
        style={{
          fontSize: '150px',
          fontWeight: 'bold',
          color: 'rgba(94, 225, 230, 0.18)',
          textShadow: '0 0 50px rgba(94, 225, 230, 0.8), 0 0 100px rgba(94, 225, 230, 0.6), 6px 6px 0 rgba(94, 225, 230, 0.35), 12px 12px 0 rgba(94, 225, 230, 0.25)',
          x: useTransform(mouseXSpring, (x) => x * 2.5),
          y: useTransform(mouseYSpring, (y) => y * 2.5),
          rotateX: useTransform(mouseYSpring, (y) => y * -2),
          rotateY: useTransform(mouseXSpring, (x) => x * -2),
        }}
        animate={{
          y: [0, 40, 0],
          rotateZ: [0, -15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        $
      </motion.div>

      <motion.div
        className="absolute top-[45%] left-[5%]"
        style={{
          fontSize: '100px',
          fontWeight: 'bold',
          color: 'rgba(168, 255, 224, 0.15)',
          textShadow: '0 0 35px rgba(168, 255, 224, 0.7), 0 0 70px rgba(168, 255, 224, 0.5), 4px 4px 0 rgba(168, 255, 224, 0.3), 8px 8px 0 rgba(168, 255, 224, 0.2)',
          x: useTransform(mouseXSpring, (x) => x * 2),
          y: useTransform(mouseYSpring, (y) => y * 2),
          rotateX: useTransform(mouseYSpring, (y) => y * 1.5),
          rotateY: useTransform(mouseXSpring, (x) => x * 1.5),
        }}
        animate={{
          y: [0, -25, 0],
          rotateZ: [0, 12, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      >
        $
      </motion.div>

      <motion.div
        className="absolute top-[60%] right-[8%]"
        style={{
          fontSize: '130px',
          fontWeight: 'bold',
          color: 'rgba(124, 255, 178, 0.19)',
          textShadow: '0 0 45px rgba(124, 255, 178, 0.75), 0 0 90px rgba(124, 255, 178, 0.55), 5px 5px 0 rgba(124, 255, 178, 0.38), 10px 10px 0 rgba(124, 255, 178, 0.28)',
          x: useTransform(mouseXSpring, (x) => x * -2.8),
          y: useTransform(mouseYSpring, (y) => y * -2.8),
          rotateX: useTransform(mouseYSpring, (y) => y * 2.5),
          rotateY: useTransform(mouseXSpring, (x) => x * 2.5),
        }}
        animate={{
          y: [0, 35, 0],
          rotateZ: [0, -10, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        $
      </motion.div>

      {/* Geometric shapes with parallax */}
      <motion.div
        className="absolute top-[35%] right-[20%] w-4 h-4 rounded-full"
        style={{
          background: 'rgba(124, 255, 178, 0.6)',
          boxShadow: '0 0 30px rgba(124, 255, 178, 0.8)',
          x: useTransform(mouseXSpring, (x) => x * -2),
          y: useTransform(mouseYSpring, (y) => y * -2),
        }}
        animate={{ 
          y: [0, -50, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-[50%] left-[25%] w-3 h-3 rounded-full"
        style={{
          background: 'rgba(94, 225, 230, 0.7)',
          boxShadow: '0 0 25px rgba(94, 225, 230, 0.9)',
          x: useTransform(mouseXSpring, (x) => x * 2.5),
          y: useTransform(mouseYSpring, (y) => y * 2.5),
        }}
        animate={{ 
          y: [0, 40, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

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
          className="text-lg sm:text-xl md:text-2xl font-display font-medium max-w-2xl mx-auto mb-4 backdrop-blur-sm px-6 py-3 rounded-2xl"
          style={{ 
            color: '#E5E7EB',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          AI-powered content automation for passive income
        </motion.p>

        <motion.p
          className="text-sm sm:text-base max-w-xl mx-auto mb-12 backdrop-blur-sm px-6 py-2 rounded-xl"
          style={{ 
            color: '#9CA3AF',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Turn a single prompt into AI-generated videos and distribute them
          across multiple platforms with one click.
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
          <motion.a
            href="#status"
            onClick={(e) => handleSmoothScroll(e, '#status')}
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
            Coming Soon
            <ArrowRight className="w-4 h-4" />
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
