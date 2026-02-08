import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageSquare, Video, Share2, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Enter a Prompt",
    description: "Type a simple sentence describing your content idea. That's the only input needed.",
    visual: "💬",
  },
  {
    icon: Video,
    number: "02",
    title: "AI Generates Video",
    description: "Advanced AI transforms your prompt into professional video content, optimized per platform.",
    visual: "🎬",
  },
  {
    icon: Share2,
    number: "03",
    title: "Auto-Publish Everywhere",
    description: "One click distributes your content across all major platforms simultaneously. Fully automated.",
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
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            How it works
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Three steps. <span className="gradient-text">Zero effort.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            From idea to published content in under 60 seconds.
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
              <div className="glass-card p-8 h-full transition-all duration-500 group-hover:glow-primary relative overflow-hidden">
                {/* Background number */}
                <span className="absolute top-4 right-6 text-7xl font-display font-bold text-foreground/[0.03] select-none">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="relative mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, hsl(270 80% 65% / 0.15), hsl(280 70% 55% / 0.08))",
                    }}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <span className="absolute -top-1 -right-1 text-xs font-mono text-muted-foreground/40">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
