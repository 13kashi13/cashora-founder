import { useEffect, useRef } from "react";
import { rafManager } from "@/lib/rafManager";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    twinkleSpeed: number;
    twinklePhase: number;
  }>>([]);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { 
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      const count = Math.min(60, Math.floor(window.innerWidth / 25));
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.25 + 0.1,
        twinkleSpeed: Math.random() * 0.01 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    };

    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;

    const animate = (time: number, delta: number) => {
      // Throttle to 60fps
      if (delta < frameTime) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;

        p.twinklePhase += p.twinkleSpeed;
        const twinkle = Math.sin(p.twinklePhase) * 0.5 + 0.5;
        const currentOpacity = p.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        const isGreen = Math.random() > 0.7;
        ctx.fillStyle = isGreen 
          ? `hsla(158, 100%, 73%, ${currentOpacity})`
          : `hsla(180, 20%, 80%, ${currentOpacity})`;
        ctx.fill();
      });
    };

    resize();
    createParticles();

    // Register with centralized RAF manager
    rafManager.register('particles', animate);

    const handleResize = () => {
      resize();
      createParticles();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      rafManager.unregister('particles');
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};

export default ParticleBackground;
