import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useSpring } from 'framer-motion';

interface LiquidScrollProps {
  children: React.ReactNode;
  className?: string;
}

const LiquidScroll = ({ children, className = '' }: LiquidScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Optimized spring physics - less aggressive for better performance
  const springConfig = { 
    damping: 30,      // Higher damping = less bounce, smoother
    stiffness: 150,   // Lower stiffness = softer response
    mass: 0.5,        // Lower mass = more responsive
    restSpeed: 0.01,  // Faster settling
    restDelta: 0.01   // Faster settling
  };
  
  // Very subtle motion values
  const skewY = useSpring(0, springConfig);
  const scaleY = useSpring(1, springConfig);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,    // Shorter duration for snappier feel
      easing: (t) => {
        // Simpler easing for better performance
        return 1 - Math.pow(1 - t, 3);
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Optimized scroll handler with throttling
    let ticking = false;
    
    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Ultra-subtle effects (barely noticeable but adds feel)
          const skewAmount = Math.max(-0.15, Math.min(0.15, velocity * 0.008));
          skewY.set(skewAmount);

          const scaleAmount = 1 + Math.max(-0.001, Math.min(0.001, Math.abs(velocity) * 0.00004));
          scaleY.set(scaleAmount);
          
          ticking = false;
        });
        ticking = true;
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [skewY, scaleY]);

  return (
    <motion.div
      ref={scrollRef}
      className={`w-full ${className}`}
      style={{
        skewY,
        scaleY,
        transformOrigin: "center center",
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
};

export default LiquidScroll;
