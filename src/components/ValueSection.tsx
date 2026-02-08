import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GraduationCap, Briefcase, Sparkles, Clock, Zap, Shield } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Students",
    description: "Build an online presence while you study. Cashora automates content so you can focus on learning.",
    stat: "Zero effort needed",
  },
  {
    icon: Briefcase,
    title: "Working Professionals",
    description: "Create a side income stream without sacrificing your career. Consistency runs on autopilot.",
    stat: "Fully automated",
  },
  {
    icon: Sparkles,
    title: "Beginners",
    description: "No experience needed. No editing skills required. Just your ideas — Cashora handles the rest.",
    stat: "AI-powered",
  },
];

const features = [
  { icon: Clock, label: "Save 40+ hours/week" },
  { icon: Zap, label: "Instant publishing" },
  { icon: Shield, label: "Professional quality" },
];

const ValueSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section className="section-spacing relative overflow-hidden" ref={sectionRef}>
      <div className="section-line absolute top-0 left-0 right-0" />

      <motion.div
        className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          y: bgY,
          background: "radial-gradient(circle, hsl(270 80% 65% / 0.04) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container-wide relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Built for everyone
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Your time is <span className="gradient-text">valuable.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Whether you're a student, professional, or just getting started.
          </p>
        </motion.div>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {features.map((feat, i) => (
            <motion.div
              key={feat.label}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-medium text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <feat.icon className="w-4 h-4 text-primary" />
              {feat.label}
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              className="group glass-card p-8 transition-all duration-500 hover:glow-primary relative overflow-hidden"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Background decoration */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "radial-gradient(circle, hsl(270 80% 65% / 0.08) 0%, transparent 70%)",
                }}
              />

              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, hsl(270 80% 65% / 0.15), hsl(280 70% 55% / 0.08))",
                }}
                whileHover={{ rotate: [0, -5, 5, 0] }}
              >
                <audience.icon className="w-6 h-6 text-primary" />
              </motion.div>

              <h3 className="font-display text-xl font-semibold mb-3">{audience.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {audience.description}
              </p>

              <span className="inline-block text-xs font-medium text-primary/70 px-3 py-1 rounded-full bg-primary/5">
                {audience.stat}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
