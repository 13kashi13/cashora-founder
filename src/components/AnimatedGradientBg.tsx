const AnimatedGradientBg = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ backgroundColor: '#050a0a' }}>
      {/* Central glow - SIMPLIFIED */}
      <div
        className="absolute w-[400px] h-[400px]"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(124, 255, 178, 0.3) 0%, rgba(168, 255, 224, 0.2) 25%, rgba(94, 225, 230, 0.1) 50%, transparent 70%)",
          filter: "blur(70px)",
          borderRadius: "50%",
          opacity: 0.8,
        }}
      />

      {/* Bottom glow */}
      <div
        className="absolute w-[2000px] h-[1000px]"
        style={{
          bottom: "-30%",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at center, rgba(124, 255, 178, 0.2) 0%, rgba(94, 225, 230, 0.15) 30%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 25%, rgba(5, 10, 10, 0.4) 55%, rgba(5, 10, 10, 0.85) 100%)',
        }}
      />
    </div>
  );
};

export default AnimatedGradientBg;
