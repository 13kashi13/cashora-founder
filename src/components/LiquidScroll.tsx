import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useSpring } from 'framer-motion';
import { rafManager } from '@/lib/rafManager';

interface LiquidScrollProps {
  children: React.ReactNode;
  className?: string;
}

const LiquidScroll = ({ children, className = '' }: LiquidScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  
  // Optimized spring physics - less aggressive for better performance
  const springConfig = { 
    damping: 30,
    stiffness: 150,
    mass: 0.5,
    restSpeed: 0.01,
    restDelta: 0.01
  };
  
  // Very subtle motion values
  const skewY = useSpring(0, springConfig);
  const scaleY = useSpring(1, springConfig);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    
    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      // Ultra-subtle effects
      const skewAmount = Math.max(-0.15, Math.min(0.15, velocity * 0.008));
      skewY.set(skewAmount);

      const scaleAmount = 1 + Math.max(-0.001, Math.min(0.001, Math.abs(velocity) * 0.00004));
      scaleY.set(scaleAmount);
    });

    // Register with centralized RAF manager
    rafManager.register('lenis', (time) => {
      lenis.raf(time);
    });

    return () => {
      rafManager.unregister('lenis');
      lenis.destroy();
      lenisRef.current = null;
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
