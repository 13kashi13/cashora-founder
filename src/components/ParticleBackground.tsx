import { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { 
      alpha: true,
      desynchronized: true, // Prevents flickering in production
    });
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      // Significantly reduced particle count for 60fps
      const count = Math.min(60, Math.floor(window.innerWidth / 25));
      particles = Array.from({ length: count }, () => ({
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

    let lastTime = performance.now();
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      // Skip frame if not enough time has passed
      if (deltaTime < frameTime) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      lastTime = currentTime - (deltaTime % frameTime);

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((p) => {
        // Slow floating movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;

        // Twinkle effect
        p.twinklePhase += p.twinkleSpeed;
        const twinkle = Math.sin(p.twinklePhase) * 0.5 + 0.5;
        const currentOpacity = p.opacity * twinkle;

        // Draw star-like particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Green/cyan tint for some particles
        const isGreen = Math.random() > 0.7;
        if (isGreen) {
          ctx.fillStyle = `hsla(158, 100%, 73%, ${currentOpacity})`;
        } else {
          ctx.fillStyle = `hsla(180, 20%, 80%, ${currentOpacity})`;
        }
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate(performance.now());

    const handleResize = () => {
      resize();
      createParticles();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
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
