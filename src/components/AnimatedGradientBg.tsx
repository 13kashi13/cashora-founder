const AnimatedGradientBg = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ backgroundColor: '#050a0a' }}>
      {/* Central sun/energy core - OPTIMIZED */}
      <div
        className="absolute w-[400px] h-[400px] animate-pulse-glow"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(124, 255, 178, 0.5) 0%, rgba(168, 255, 224, 0.35) 25%, rgba(94, 225, 230, 0.2) 50%, rgba(124, 255, 178, 0.1) 70%, transparent 100%)",
          filter: "blur(70px)",
          borderRadius: "50%",
          willChange: "opacity, transform",
        }}
      />

      {/* Orbit rings - OPTIMIZED with CSS */}
      {[1, 2, 3].map((orbit) => (
        <div
          key={`orbit-${orbit}`}
          className="absolute animate-spin-slow"
          style={{
            top: "50%",
            left: "50%",
            width: `${orbit * 280}px`,
            height: `${orbit * 280}px`,
            transform: "translate(-50%, -50%)",
            border: `1px solid rgba(124, 255, 178, ${0.08 / orbit})`,
            borderRadius: "50%",
            boxShadow: `0 0 ${20 / orbit}px rgba(124, 255, 178, ${0.15 / orbit})`,
            animationDuration: `${35 + orbit * 8}s`,
            animationDirection: orbit % 2 === 0 ? 'normal' : 'reverse',
            willChange: "transform",
          }}
        />
      ))}

      {/* Planet 1 - Green */}
      <div
        className="absolute w-[450px] h-[450px] animate-spin-slow"
        style={{
          top: "50%",
          left: "50%",
          animationDuration: "25s",
          willChange: "transform",
        }}
      >
        <div
          className="absolute w-24 h-24 rounded-full animate-pulse-glow"
          style={{
            top: "0",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(124, 255, 178, 0.8) 0%, rgba(124, 255, 178, 0.5) 30%, rgba(124, 255, 178, 0.2) 60%, transparent 100%)",
            filter: "blur(25px)",
            boxShadow: "0 0 60px rgba(124, 255, 178, 0.8)",
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* Planet 2 - Cyan */}
      <div
        className="absolute w-[680px] h-[680px] animate-spin-slow"
        style={{
          top: "50%",
          left: "50%",
          animationDuration: "40s",
          animationDirection: "reverse",
          willChange: "transform",
        }}
      >
        <div
          className="absolute w-20 h-20 rounded-full animate-pulse-glow"
          style={{
            top: "0",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(94, 225, 230, 0.75) 0%, rgba(94, 225, 230, 0.45) 30%, rgba(94, 225, 230, 0.2) 60%, transparent 100%)",
            filter: "blur(22px)",
            boxShadow: "0 0 55px rgba(94, 225, 230, 0.75)",
            animationDelay: "1s",
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* Planet 3 - Mint */}
      <div
        className="absolute w-[920px] h-[920px] animate-spin-slow"
        style={{
          top: "50%",
          left: "50%",
          animationDuration: "55s",
          willChange: "transform",
        }}
      >
        <div
          className="absolute w-16 h-16 rounded-full animate-pulse-glow"
          style={{
            top: "0",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(168, 255, 224, 0.7) 0%, rgba(168, 255, 224, 0.4) 30%, rgba(168, 255, 224, 0.15) 60%, transparent 100%)",
            filter: "blur(20px)",
            boxShadow: "0 0 50px rgba(168, 255, 224, 0.7)",
            animationDelay: "2s",
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* Planet 4 - Light Green */}
      <div
        className="absolute w-[1150px] h-[1150px] animate-spin-slow"
        style={{
          top: "50%",
          left: "50%",
          animationDuration: "68s",
          animationDirection: "reverse",
          willChange: "transform",
        }}
      >
        <div
          className="absolute w-14 h-14 rounded-full animate-pulse-glow"
          style={{
            top: "0",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(124, 255, 178, 0.65) 0%, rgba(124, 255, 178, 0.35) 30%, rgba(124, 255, 178, 0.12) 60%, transparent 100%)",
            filter: "blur(18px)",
            boxShadow: "0 0 45px rgba(124, 255, 178, 0.65)",
            animationDelay: "3s",
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* Bottom energy glow */}
      <div
        className="absolute w-[2600px] h-[1400px] animate-pulse-glow"
        style={{
          bottom: "-40%",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at center, rgba(124, 255, 178, 0.35) 0%, rgba(94, 225, 230, 0.25) 30%, rgba(168, 255, 224, 0.15) 50%, transparent 70%)",
          filter: "blur(160px)",
          willChange: "opacity, transform",
        }}
      />

      {/* Rotating galaxy spiral */}
      <div
        className="absolute w-[1400px] h-[1400px] animate-spin-slow"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(124, 255, 178, 0.08) 15%, transparent 30%, rgba(94, 225, 230, 0.08) 45%, transparent 60%, rgba(168, 255, 224, 0.06) 75%, transparent 90%)",
          filter: "blur(90px)",
          borderRadius: "50%",
          animationDuration: "35s",
          willChange: "transform",
        }}
      />

      {/* Additional spiral arm */}
      <div
        className="absolute w-[1600px] h-[1600px] animate-spin-slow"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "conic-gradient(from 180deg, transparent 0%, rgba(94, 225, 230, 0.06) 20%, transparent 40%, rgba(124, 255, 178, 0.06) 60%, transparent 80%)",
          filter: "blur(100px)",
          borderRadius: "50%",
          animationDuration: "50s",
          animationDirection: "reverse",
          willChange: "transform",
        }}
      />

      {/* Vignette - darker edges */}
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
