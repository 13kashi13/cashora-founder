const AnimatedGradientBg = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundColor: '#050a0a', overflow: 'hidden' }}>
      {/* Central glow - SIMPLIFIED */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          width: "400px",
          height: "400px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(124, 255, 178, 0.3) 0%, rgba(168, 255, 224, 0.2) 25%, rgba(94, 225, 230, 0.1) 50%, transparent 70%)",
          filter: "blur(70px)",
          borderRadius: "50%",
          opacity: 0.8,
        }}
      />

      {/* Bottom glow - FIXED: Use 100% instead of 100vw to avoid scrollbar issues */}
      <div
        className="absolute"
        style={{
          bottom: "-30%",
          left: "0",
          right: "0",
          height: "1000px",
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
