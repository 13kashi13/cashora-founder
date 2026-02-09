import { motion } from "framer-motion";

const AnimatedGradientBg = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ backgroundColor: '#050a0a' }}>
      {/* Central sun/energy core - BRIGHTER */}
      <motion.div
        className="absolute w-[400px] h-[400px]"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(124, 255, 178, 0.5) 0%, rgba(168, 255, 224, 0.35) 25%, rgba(94, 225, 230, 0.2) 50%, rgba(124, 255, 178, 0.1) 70%, transparent 100%)",
          filter: "blur(70px)",
          borderRadius: "50%",
        }}
        animate={{
          opacity: [0.9, 1, 0.9],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orbit rings - MORE VISIBLE */}
      {[1, 2, 3, 4, 5].map((orbit) => (
        <motion.div
          key={`orbit-${orbit}`}
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: `${orbit * 280}px`,
            height: `${orbit * 280}px`,
            transform: "translate(-50%, -50%)",
            border: `1px solid rgba(124, 255, 178, ${0.08 / orbit})`,
            borderRadius: "50%",
            boxShadow: `0 0 ${20 / orbit}px rgba(124, 255, 178, ${0.15 / orbit})`,
          }}
          animate={{
            rotate: orbit % 2 === 0 ? [0, 360] : [360, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            rotate: {
              duration: 35 + orbit * 8,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
        />
      ))}

      {/* Planet 1 - Green - MUCH BIGGER AND BRIGHTER */}
      <motion.div
        className="absolute w-[450px] h-[450px]"
        style={{
          top: "50%",
          left: "50%",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          className="absolute w-24 h-24 rounded-full"
          style={{
            top: "0",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(124, 255, 178, 0.8) 0%, rgba(124, 255, 178, 0.5) 30%, rgba(124, 255, 178, 0.2) 60%, transparent 100%)",
            filter: "blur(25px)",
            boxShadow: "0 0 60px rgba(124, 255, 178, 0.8)",
          }}
          animate={{
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Planet 2 - Cyan - BIGGER */}
      <motion.div
        className="absolute w-[700px] h-[700px]"
        style={{
          top: "50%",
          left: "50%",
        }}
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          className="absolute w-28 h-28 rounded-full"
          style={{
            top: "0",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(94, 225, 230, 0.8) 0%, rgba(94, 225, 230, 0.5) 30%, rgba(94, 225, 230, 0.2) 60%, transparent 100%)",
            filter: "blur(30px)",
            boxShadow: "0 0 70px rgba(94, 225, 230, 0.9)",
          }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Planet 3 - Mint - BIGGER */}
      <motion.div
        className="absolute w-[950px] h-[950px]"
        style={{
          top: "50%",
          left: "50%",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 52,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          className="absolute w-20 h-20 rounded-full"
          style={{
            top: "0",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(168, 255, 224, 0.7) 0%, rgba(168, 255, 224, 0.4) 30%, rgba(168, 255, 224, 0.15) 60%, transparent 100%)",
            filter: "blur(22px)",
            boxShadow: "0 0 55px rgba(168, 255, 224, 0.8)",
          }}
          animate={{
            scale: [1, 1.35, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Planet 4 - Small green */}
      <motion.div
        className="absolute w-[1200px] h-[1200px]"
        style={{
          top: "50%",
          left: "50%",
        }}
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 68,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          className="absolute w-16 h-16 rounded-full"
          style={{
            top: "0",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(124, 255, 178, 0.6) 0%, rgba(124, 255, 178, 0.3) 40%, transparent 100%)",
            filter: "blur(18px)",
            boxShadow: "0 0 45px rgba(124, 255, 178, 0.7)",
          }}
          animate={{
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Asteroid belt - MORE VISIBLE */}
      <motion.div
        className="absolute w-[800px] h-[800px]"
        style={{
          top: "50%",
          left: "50%",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <motion.div
            key={`asteroid-${angle}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-400px)`,
              background: "rgba(124, 255, 178, 0.6)",
              boxShadow: "0 0 15px rgba(124, 255, 178, 0.8)",
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: angle / 150,
            }}
          />
        ))}
      </motion.div>

      {/* Bottom energy glow - galaxy base - BRIGHTER */}
      <motion.div
        className="absolute w-[2600px] h-[1400px]"
        style={{
          bottom: "-40%",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at center, rgba(124, 255, 178, 0.35) 0%, rgba(94, 225, 230, 0.25) 30%, rgba(168, 255, 224, 0.15) 50%, transparent 70%)",
          filter: "blur(160px)",
        }}
        animate={{
          opacity: [0.7, 0.9, 0.7],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rotating galaxy spiral - MORE VISIBLE */}
      <motion.div
        className="absolute w-[1400px] h-[1400px]"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(124, 255, 178, 0.08) 15%, transparent 30%, rgba(94, 225, 230, 0.08) 45%, transparent 60%, rgba(168, 255, 224, 0.06) 75%, transparent 90%)",
          filter: "blur(90px)",
          borderRadius: "50%",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Additional spiral arm */}
      <motion.div
        className="absolute w-[1600px] h-[1600px]"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "conic-gradient(from 180deg, transparent 0%, rgba(94, 225, 230, 0.06) 20%, transparent 40%, rgba(124, 255, 178, 0.06) 60%, transparent 80%)",
          filter: "blur(100px)",
          borderRadius: "50%",
        }}
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
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
