import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { rafManager } from '@/lib/rafManager';

interface LiquidScrollProps {
  children: React.ReactNode;
  className?: string;
}

const LiquidScroll = ({ children, className = '' }: LiquidScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

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

    // Register with centralized RAF manager
    rafManager.register('lenis', (time) => {
      lenis.raf(time);
    });

    return () => {
      rafManager.unregister('lenis');
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className={`w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default LiquidScroll;
