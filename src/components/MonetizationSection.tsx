import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Target, Layers, Cpu } from "lucide-react";

const messages = [
  {
    icon: Target,
    quote: "Consistency leads to monetization.",
    detail: "The algorithm rewards those who show up every day. Cashora ensures you never miss a beat.",
  },
  {
    icon: Layers,
    quote: "Cashora removes the effort barrier.",
    detail: "No editing. No scheduling. No burnout. Just results.",
  },
  {
    icon: Cpu,
    quote: "AI handles creation and distribution.",
    detail: "From concept to published content — entirely automated, endlessly scalable.",
  },
];

const MonetizationSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section className="section-spacing relative overflow-hidden" ref={sectionRef}>
      <div className="section-line absolute top-0 left-0 right-0" />

      <motion.div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          y: bgY,
          background: "radial-gradient(circle, hsl(280 70% 55% / 0.04) 0%, transparent 60%)",
          filter: "blur(50px)",
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
            The long game
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto">
            Automation meets{" "}
            <span className="gradient-text">monetization.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Building sustainable income through consistent, automated content distribution.
          </p>
        </motion.div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className="group glass-card p-8 transition-all duration-500 hover:glow-primary relative overflow-hidden"
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-start gap-5">
                <motion.div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, hsl(270 80% 65% / 0.12), hsl(280 70% 55% / 0.06))",
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <msg.icon className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <p className="font-display text-lg sm:text-xl font-semibold gradient-text mb-2">
                    "{msg.quote}"
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{msg.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MonetizationSection;
