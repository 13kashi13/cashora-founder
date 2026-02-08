import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const AnimatedGradientBg = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
      if (containerRef.current) {
        const shift = scrollY * 0.02;
        containerRef.current.style.setProperty("--scroll-shift", `${shift}deg`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large morphing orb */}
      <motion.div
        className="absolute w-[800px] h-[800px] animate-morph"
        style={{
          top: "-15%",
          left: "-10%",
          background:
            "radial-gradient(circle, hsl(270 80% 65% / 0.08) 0%, hsl(280 70% 55% / 0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] animate-morph"
        style={{
          bottom: "-10%",
          right: "-5%",
          background:
            "radial-gradient(circle, hsl(280 70% 55% / 0.06) 0%, hsl(260 60% 45% / 0.03) 40%, transparent 70%)",
          filter: "blur(80px)",
          animationDelay: "4s",
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 50, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center accent */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          top: "40%",
          left: "30%",
          background:
            "radial-gradient(circle, hsl(270 90% 75% / 0.04) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
        animate={{
          scale: [1, 1.2, 0.9, 1],
          x: [0, 60, -40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AnimatedGradientBg;
