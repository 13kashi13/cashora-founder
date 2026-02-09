import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageSquare, Video, Share2, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "ENTER A PROMPT",
    description: "TYPE A SIMPLE SENTENCE DESCRIBING YOUR CONTENT IDEA. THAT'S THE ONLY INPUT NEEDED.",
    visual: "💬",
  },
  {
    icon: Video,
    number: "02",
    title: "AI GENERATES VIDEO",
    description: "ADVANCED AI TRANSFORMS YOUR PROMPT INTO PROFESSIONAL VIDEO CONTENT, OPTIMIZED PER PLATFORM.",
    visual: "🎬",
  },
  {
    icon: Share2,
    number: "03",
    title: "AUTO-PUBLISH EVERYWHERE",
    description: "ONE CLICK DISTRIBUTES YOUR CONTENT ACROSS ALL MAJOR PLATFORMS SIMULTANEOUSLY. FULLY AUTOMATED.",
    visual: "🚀",
  },
];

const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="how-it-works"
      className="section-spacing relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="section-line absolute top-0 left-0 right-0" />

      {/* Parallax background element */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full pointer-events-none"
        style={{
          y: bgY,
          background:
            "radial-gradient(ellipse, hsl(270 80% 65% / 0.05) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container-wide relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p 
            className="text-sm font-black tracking-[0.3em] uppercase mb-6"
            style={{
              background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.3em',
            }}
          >
            HOW IT WORKS
          </motion.p>
          <h2 className="font-black text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1] uppercase">
            THREE STEPS.{" "}
            <span 
              className="block mt-2"
              style={{
                background: 'linear-gradient(135deg, #7CFFB2 0%, #A8FFE0 50%, #5CE1E6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(124, 255, 178, 0.3))',
              }}
            >
              ZERO EFFORT.
            </span>
          </h2>
          <p className="text-white/70 mt-6 text-lg font-bold max-w-2xl mx-auto uppercase">
            FROM IDEA TO PUBLISHED CONTENT IN UNDER{" "}
            <span className="text-[#7CFFB2] font-black">60 SECONDS</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connecting line across steps */}
          <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-px">
            <motion.div
              className="h-full"
              style={{
                background: "linear-gradient(90deg, hsl(270 80% 65% / 0.3), hsl(280 70% 55% / 0.3), hsl(270 80% 65% / 0.3))",
              }}
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="group relative"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="glass-card p-8 h-full transition-all duration-500 group-hover:glow-primary relative overflow-hidden backdrop-blur-xl" style={{
                background: 'rgba(5, 10, 10, 0.6)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(124, 255, 178, 0.1)',
              }}>
                {/* Background number */}
                <span className="absolute top-4 right-6 text-8xl font-black select-none" style={{
                  background: 'linear-gradient(135deg, rgba(124, 255, 178, 0.08), rgba(92, 225, 230, 0.08))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {step.number}
                </span>

                {/* Icon */}
                <div className="relative mb-6">
                  <motion.div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, rgba(124, 255, 178, 0.2), rgba(92, 225, 230, 0.1))",
                      border: '1px solid rgba(124, 255, 178, 0.3)',
                      boxShadow: '0 4px 16px rgba(124, 255, 178, 0.2)',
                    }}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon className="w-9 h-9" style={{ color: '#7CFFB2' }} />
                  </motion.div>
                  <motion.span 
                    className="absolute -top-2 -right-2 text-xs font-black px-2 py-1 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #7CFFB2, #5CE1E6)',
                      color: '#000',
                      boxShadow: '0 2px 8px rgba(124, 255, 178, 0.4)',
                    }}
                  >
                    {step.number}
                  </motion.span>
                </div>

                <h3 className="font-black text-2xl mb-4 tracking-tight uppercase" style={{ color: '#fff' }}>
                  {step.title}
                </h3>
                <p className="text-white/70 text-base leading-relaxed font-bold uppercase">
                  {step.description}
                </p>

                {/* Step arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                    >
                      <ArrowRight className="w-5 h-5 text-primary/40" />
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
