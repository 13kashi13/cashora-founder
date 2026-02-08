import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import { smoothScrollToWithInertia } from "@/lib/smoothScroll";

const StatusSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const handleGetAccess = () => {
    // Scroll to footer where contact/social links are
    smoothScrollToWithInertia('#footer');
  };

  return (
    <section id="status" className="section-spacing relative overflow-hidden" ref={ref}>
      <div className="section-line absolute top-0 left-0 right-0" />

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, hsl(270 80% 65% / 0.06) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="container-tight relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass gradient-border mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              In Early Development
            </span>
          </motion.div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            We're building something{" "}
            <span className="gradient-text">meaningful.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-12 max-w-lg mx-auto">
            CASHORA is in its early stages. We're focused on getting the
            foundation right — thoughtful design, reliable AI, and a genuinely
            useful product.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button
              onClick={handleGetAccess}
              className="btn-primary px-10 py-5 text-primary-foreground text-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Early Access
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatusSection;
