import { useEffect, useRef } from 'react';

export const useOptimizedScroll = (callback: (scrollY: number) => void) => {
  const rafRef = useRef<number>();
  const lastScrollRef = useRef(0);
  
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      lastScrollRef.current = window.scrollY;
      
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          callback(lastScrollRef.current);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [callback]);
};
