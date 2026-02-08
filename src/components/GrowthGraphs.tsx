import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TrendingUp, BarChart3, Users } from "lucide-react";

const graphData = {
  consistency: [20, 25, 22, 35, 40, 38, 52, 58, 65, 72, 78, 85],
  reach: [5, 8, 12, 18, 28, 35, 48, 62, 75, 88, 95, 100],
  platforms: [
    { name: "YouTube", value: 85 },
    { name: "Instagram", value: 72 },
    { name: "Facebook", value: 65 },
    { name: "X", value: 58 },
    { name: "LinkedIn", value: 48 },
    { name: "Reddit", value: 42 },
    { name: "Discord", value: 38 },
  ],
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const AnimatedGraph = ({ 
  data, 
  isVisible, 
  delay = 0,
  color = "270 80% 65%",
}: { 
  data: number[]; 
  isVisible: boolean; 
  delay?: number;
  color?: string;
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxVal = Math.max(...data);
  const svgWidth = 400;
  const svgHeight = 160;
  const padding = 20;
  const graphWidth = svgWidth - padding * 2;
  const graphHeight = svgHeight - padding * 2;

  const points = data.map((val, i) => ({
    x: padding + (i / (data.length - 1)) * graphWidth,
    y: padding + graphHeight - (val / maxVal) * graphHeight,
  }));

  const pathD = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cx1 = prev.x + (p.x - prev.x) * 0.4;
      const cx2 = p.x - (p.x - prev.x) * 0.4;
      return `C ${cx1} ${prev.y} ${cx2} ${p.y} ${p.x} ${p.y}`;
    })
    .join(" ");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - padding} L ${points[0].x} ${svgHeight - padding} Z`;

  return (
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full">
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((pct) => (
        <line
          key={pct}
          x1={padding}
          y1={padding + graphHeight * (1 - pct)}
          x2={svgWidth - padding}
          y2={padding + graphHeight * (1 - pct)}
          stroke="hsl(260 15% 14%)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
      ))}

      {/* Area fill */}
      <motion.path
        d={areaD}
        fill={`url(#gradient-fill-${color.replace(/\s/g, '')})`}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 0.3 } : {}}
        transition={{ duration: 1, delay: delay + 0.5 }}
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient id={`gradient-fill-${color.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`hsl(${color})`} stopOpacity="0.3" />
          <stop offset="100%" stopColor={`hsl(${color})`} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={`hsl(${color})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isVisible ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={hoveredIdx === i ? 5 : 3}
          fill={`hsl(${color})`}
          className="cursor-pointer"
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: delay + 0.1 * i, duration: 0.3 }}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
          style={{ filter: hoveredIdx === i ? `drop-shadow(0 0 8px hsl(${color} / 0.5))` : "none" }}
        />
      ))}

      {/* Tooltip */}
      {hoveredIdx !== null && (
        <g>
          <rect
            x={points[hoveredIdx].x - 25}
            y={points[hoveredIdx].y - 28}
            width="50"
            height="20"
            rx="4"
            fill="hsl(260 20% 12%)"
            stroke={`hsl(${color} / 0.3)`}
            strokeWidth="1"
          />
          <text
            x={points[hoveredIdx].x}
            y={points[hoveredIdx].y - 15}
            textAnchor="middle"
            fill="hsl(260 10% 85%)"
            fontSize="10"
            fontFamily="Space Grotesk"
          >
            {data[hoveredIdx]}%
          </text>
        </g>
      )}

      {/* X axis labels */}
      {months.map((m, i) => (
        <text
          key={m}
          x={padding + (i / (months.length - 1)) * graphWidth}
          y={svgHeight - 2}
          textAnchor="middle"
          fill="hsl(260 10% 40%)"
          fontSize="8"
          fontFamily="Inter"
        >
          {m}
        </text>
      ))}
    </svg>
  );
};

const PlatformBars = ({ data, isVisible }: { data: typeof graphData.platforms; isVisible: boolean }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {data.map((platform, i) => (
        <motion.div
          key={platform.name}
          className="group cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">{platform.name}</span>
            <span className="text-xs font-mono text-primary/70">{platform.value}%</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, hsl(270 80% 65%), hsl(280 70% 55%))`,
                boxShadow: hoveredIdx === i ? "0 0 12px hsl(270 80% 65% / 0.4)" : "none",
              }}
              initial={{ width: 0 }}
              animate={isVisible ? { width: `${platform.value}%` } : {}}
              transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const GrowthGraphs = () => {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const stats = [
    { icon: TrendingUp, label: "Content Growth", value: "+340%", desc: "Average increase in 6 months" },
    { icon: BarChart3, label: "Time Saved", value: "95%", desc: "Less effort than manual posting" },
    { icon: Users, label: "Platform Reach", value: "7+", desc: "Platforms covered simultaneously" },
  ];

  return (
    <section className="section-spacing relative overflow-hidden" ref={sectionRef}>
      <div className="section-line absolute top-0 left-0 right-0" />

      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          y: bgY,
          background: "radial-gradient(circle, hsl(270 80% 65% / 0.04) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />

      <div className="container-wide relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Growth Analytics
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Numbers that <span className="gradient-text">speak.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Consistency and automation drive exponential growth across all platforms.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center glass-card p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            >
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-3" />
              <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Graphs */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="font-display text-lg font-semibold mb-1">Content Consistency</h3>
            <p className="text-xs text-muted-foreground mb-4">Posting frequency over 12 months</p>
            <AnimatedGraph data={graphData.consistency} isVisible={isVisible} delay={0.5} />
          </motion.div>

          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3 className="font-display text-lg font-semibold mb-1">Audience Reach</h3>
            <p className="text-xs text-muted-foreground mb-4">Cross-platform growth trajectory</p>
            <AnimatedGraph data={graphData.reach} isVisible={isVisible} delay={0.7} color="280 70% 55%" />
          </motion.div>
        </div>

        {/* Platform reach bars */}
        <motion.div
          className="glass-card p-6 mt-6 lg:mt-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="font-display text-lg font-semibold mb-1">Platform Reach Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">Engagement rate per platform</p>
          <PlatformBars data={graphData.platforms} isVisible={isVisible} />
        </motion.div>
      </div>
    </section>
  );
};

export default GrowthGraphs;
