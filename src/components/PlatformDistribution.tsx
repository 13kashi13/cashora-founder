import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const platforms = [
  { name: "YouTube", icon: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z", color: "0 70% 55%", url: "https://www.youtube.com" },
  { name: "Instagram", icon: "M12 2.2c2.7 0 3 0 4.1.1 1 0 1.7.2 2.3.5.6.2 1.1.6 1.6 1 .5.5.8 1 1 1.6.3.6.4 1.3.5 2.3 0 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.7-.5 2.3-.2.6-.6 1.1-1 1.6-.5.5-1 .8-1.6 1-.6.3-1.3.4-2.3.5-1.1 0-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.7-.2-2.3-.5-.6-.2-1.1-.6-1.6-1-.5-.5-.8-1-1-1.6-.3-.6-.4-1.3-.5-2.3 0-1.1-.1-1.4-.1-4.1s0-3 .1-4.1c0-1 .2-1.7.5-2.3.2-.6.6-1.1 1-1.6.5-.5 1-.8 1.6-1 .6-.3 1.3-.4 2.3-.5 1.1 0 1.4-.1 4.1-.1zM12 0C9.3 0 8.9 0 7.8.1 6.7.1 5.9.3 5.2.6c-.7.3-1.3.7-1.9 1.3S2.2 3 1.9 3.7c-.3.7-.5 1.5-.5 2.6C1.3 7.4 1.3 7.8 1.3 12s0 4.6.1 5.7c0 1.1.2 1.9.5 2.6.3.7.7 1.3 1.3 1.9s1.2 1 1.9 1.3c.7.3 1.5.5 2.6.5 1.1 0 1.5.1 4.4.1s3.3 0 4.4-.1c1.1 0 1.9-.2 2.6-.5.7-.3 1.3-.7 1.9-1.3s1-1.2 1.3-1.9c.3-.7.5-1.5.5-2.6 0-1.1.1-1.5.1-4.4s0-3.3-.1-4.4c0-1.1-.2-1.9-.5-2.6-.3-.7-.7-1.3-1.3-1.9S20.3 1.6 19.6 1.3c-.7-.3-1.5-.5-2.6-.5C15.9 0 15.5 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z", color: "330 80% 55%", url: "https://www.instagram.com" },
  { name: "Facebook", icon: "M24 12c0-6.6-5.4-12-12-12S0 5.4 0 12c0 6 4.4 11 10.1 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.7.2 2.7.2v2.9h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4C19.6 23 24 18 24 12z", color: "220 70% 55%", url: "https://www.facebook.com" },
  { name: "X", icon: "M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.4h2L6.5 3.2H4.4l13.2 17.4z", color: "210 10% 70%", url: "https://twitter.com" },
  { name: "LinkedIn", icon: "M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.8v20.4c0 1 .8 1.8 1.8 1.8h20.4c1 0 1.8-.8 1.8-1.8V1.8c0-1-.8-1.8-1.8-1.8z", color: "210 80% 55%", url: "https://www.linkedin.com" },
  { name: "Reddit", icon: "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z", color: "16 80% 55%", url: "https://www.reddit.com" },
  { name: "Discord", icon: "M20.3 4.4A19.6 19.6 0 0 0 15.4 3c-.2.4-.5 1-.7 1.4a18 18 0 0 0-5.4 0C9.1 4 8.8 3.4 8.6 3a19.6 19.6 0 0 0-4.9 1.5C.5 9.5-.3 14.4.1 19.3A19.8 19.8 0 0 0 6.1 22c.5-.6.9-1.3 1.2-2-.7-.2-1.3-.5-1.9-.9l.5-.4a14.1 14.1 0 0 0 12.2 0l.5.4c-.6.4-1.2.7-1.9.9.4.7.8 1.4 1.3 2a19.7 19.7 0 0 0 6-2.7c.5-5.6-.9-10.5-3.7-14.9zM8 16.2c-1.3 0-2.3-1.2-2.3-2.6s1-2.6 2.3-2.6 2.4 1.2 2.3 2.6c0 1.4-1 2.6-2.3 2.6zm8 0c-1.3 0-2.3-1.2-2.3-2.6s1-2.6 2.3-2.6 2.4 1.2 2.3 2.6c0 1.4-1 2.6-2.3 2.6z", color: "235 86% 65%", url: "https://discord.com" },
];

const PlatformDistribution = () => {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  // Animated graph data for each platform - creative visualizations
  const graphData = [
    { 
      platform: 'YouTube', 
      values: [20, 35, 45, 60, 75, 85], 
      color: '0 70% 55%',
      type: 'wave' // Wave animation
    },
    { 
      platform: 'Instagram', 
      values: [15, 30, 50, 65, 80, 90], 
      color: '330 80% 55%',
      type: 'pulse' // Pulse animation
    },
    { 
      platform: 'Twitter', 
      values: [25, 40, 55, 70, 82, 92], 
      color: '200 80% 60%',
      type: 'bounce' // Bounce animation
    },
    { 
      platform: 'LinkedIn', 
      values: [25, 40, 55, 70, 80, 88], 
      color: '210 80% 55%',
      type: 'slide' // Slide animation
    },
  ];

  return (
    <section className="section-spacing relative overflow-hidden" ref={sectionRef}>
      <div className="section-line absolute top-0 left-0 right-0" />

      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          y: bgY,
          background: "radial-gradient(circle, hsl(280 70% 55% / 0.04) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container-wide relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Auto-Publishing
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            One click. <span className="gradient-text">Every platform.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Your content reaches audiences everywhere — automatically.
          </p>
        </motion.div>

        {/* Distribution visualization */}
        <div className="relative flex items-center justify-center py-20 md:py-32 min-h-[600px]">
          {/* Pulse rings from center */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-primary/10"
              style={{
                width: `${ring * 120 + 80}px`,
                height: `${ring * 120 + 80}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? {
                opacity: [0, 0.4, 0],
                scale: [0.5, 1, 1.2],
              } : {}}
              transition={{
                duration: 3,
                delay: ring * 0.4,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Center hub */}
          <motion.div
            className="relative z-10 w-24 h-24 rounded-3xl glass-strong flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              boxShadow: "0 0 60px hsl(270 80% 65% / 0.2), 0 0 120px hsl(270 80% 65% / 0.1)",
            }}
          >
            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>

          {/* Platform icons in orbit */}
          {platforms.map((platform, index) => {
            const angle = (index / platforms.length) * 2 * Math.PI - Math.PI / 2;
            const radius = typeof window !== "undefined" && window.innerWidth < 640 ? 140 : 220;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isHovered = hoveredPlatform === platform.name;

            return (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute group cursor-pointer"
                style={{ left: "50%", top: "50%", marginLeft: -32, marginTop: -32 }}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={isVisible ? {
                  opacity: 1,
                  x,
                  y,
                  scale: 1,
                } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredPlatform(platform.name)}
                onMouseLeave={() => setHoveredPlatform(null)}
              >
                {/* Connection line */}
                <motion.div
                  className="absolute top-1/2 left-1/2 h-px origin-left pointer-events-none"
                  style={{
                    width: `${radius}px`,
                    rotate: `${(angle * 180 / Math.PI) + 180}deg`,
                    background: `linear-gradient(90deg, hsl(${platform.color} / ${isHovered ? 0.5 : 0.15}), transparent)`,
                    transition: 'background 0.15s ease-out',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={isVisible ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                />

                <motion.div
                  className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center"
                  style={{
                    boxShadow: isHovered ? `0 0 40px hsl(${platform.color} / 0.3)` : '0 0 0px transparent',
                    transition: 'box-shadow 0.15s ease-out, transform 0.15s ease-out',
                    transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                  }}
                >
                  <svg
                    className="w-7 h-7"
                    style={{
                      color: isHovered ? `hsl(${platform.color})` : "hsl(260 10% 55%)",
                      transition: 'color 0.15s ease-out',
                    }}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={platform.icon} />
                  </svg>
                </motion.div>
                <span
                  className="absolute top-full mt-3 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap pointer-events-none"
                  style={{
                    color: isHovered ? `hsl(${platform.color})` : "hsl(260 10% 45%)",
                    opacity: isHovered ? 1 : 0.6,
                    transition: 'color 0.15s ease-out, opacity 0.15s ease-out',
                  }}
                >
                  {platform.name}
                </span>
              </motion.a>
            );
          })}
        </div>

        <motion.p
          className="text-muted-foreground/60 text-sm max-w-md text-center mx-auto mt-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Reach audiences across YouTube, Instagram, Facebook, X, LinkedIn, Reddit, and Discord — from a single dashboard.
        </motion.p>

        {/* Creative Animated Stats Cards */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          {graphData.map((data, index) => (
            <motion.div
              key={data.platform}
              className="relative group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 2 + index * 0.15, type: 'spring' }}
            >
              {/* Card container */}
              <motion.div
                className="glass-card p-6 rounded-2xl relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 50% 120%, hsl(${data.color} / 0.2), transparent 70%)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Platform name with pulse dot */}
                  <div className="flex items-center gap-2 mb-4">
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ background: `hsl(${data.color})` }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                    <p className="text-sm font-bold" style={{ color: `hsl(${data.color})` }}>
                      {data.platform}
                    </p>
                  </div>

                  {/* Animated wave/line graph */}
                  <div className="h-24 mb-4 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: `hsl(${data.color})`, stopOpacity: 0.8 }} />
                          <stop offset="100%" style={{ stopColor: `hsl(${data.color})`, stopOpacity: 0.1 }} />
                        </linearGradient>
                      </defs>

                      {/* Animated area */}
                      <motion.path
                        d={`M 0 ${100 - data.values[0]} 
                            L ${100 / 5} ${100 - data.values[1]} 
                            L ${(100 / 5) * 2} ${100 - data.values[2]} 
                            L ${(100 / 5) * 3} ${100 - data.values[3]} 
                            L ${(100 / 5) * 4} ${100 - data.values[4]} 
                            L 100 ${100 - data.values[5]} 
                            L 100 100 L 0 100 Z`}
                        fill={`url(#gradient-${index})`}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: 1.5, delay: 2.3 + index * 0.15, ease: 'easeOut' }}
                      />

                      {/* Animated line */}
                      <motion.path
                        d={`M 0 ${100 - data.values[0]} 
                            L ${100 / 5} ${100 - data.values[1]} 
                            L ${(100 / 5) * 2} ${100 - data.values[2]} 
                            L ${(100 / 5) * 3} ${100 - data.values[3]} 
                            L ${(100 / 5) * 4} ${100 - data.values[4]} 
                            L 100 ${100 - data.values[5]}`}
                        stroke={`hsl(${data.color})`}
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={isVisible ? { pathLength: 1 } : {}}
                        transition={{ duration: 1.5, delay: 2.3 + index * 0.15, ease: 'easeOut' }}
                      />

                      {/* Animated dots on line */}
                      {data.values.map((value, i) => (
                        <motion.circle
                          key={i}
                          cx={(100 / 5) * i}
                          cy={100 - value}
                          r="2"
                          fill={`hsl(${data.color})`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                          transition={{ 
                            duration: 0.3, 
                            delay: 2.5 + index * 0.15 + i * 0.1,
                            type: 'spring',
                            stiffness: 200,
                          }}
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Growth percentage with counter animation */}
                  <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 3 + index * 0.15 }}
                  >
                    <span className="text-xs text-muted-foreground">Growth</span>
                    <motion.span
                      className="text-lg font-black"
                      style={{ color: `hsl(${data.color})` }}
                      initial={{ scale: 0 }}
                      animate={isVisible ? { scale: 1 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: 3.2 + index * 0.15,
                        type: 'spring',
                        stiffness: 200,
                      }}
                    >
                      +{data.values[data.values.length - 1]}%
                    </motion.span>
                  </motion.div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: `0 0 0px hsl(${data.color} / 0)`,
                  }}
                  whileHover={{
                    boxShadow: `0 0 40px hsl(${data.color} / 0.4)`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformDistribution;
