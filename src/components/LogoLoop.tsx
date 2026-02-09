import { motion } from "framer-motion";
import { useState } from "react";

interface Logo {
  node?: React.ReactNode;
  src?: string;
  alt?: string;
  title?: string;
  href?: string;
}

interface LogoLoopProps {
  logos: Logo[];
  speed?: number;
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  useCustomRender?: boolean;
}

const LogoLoop = ({
  logos,
  speed = 100,
  direction = "left",
  logoHeight = 60,
  gap = 60,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = "#050a0a",
  ariaLabel = "Partner logos",
  useCustomRender = false,
}: LogoLoopProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate animation duration based on speed
  const duration = speed;
  const currentSpeed = isHovered ? hoverSpeed : speed;
  
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: `${logoHeight + 40}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel}
    >
      {/* Fade out edges */}
      {fadeOut && (
        <>
          <div
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
            }}
          />
        </>
      )}

      {/* Logo container */}
      <motion.div
        className="flex items-center absolute"
        style={{
          gap: `${gap}px`,
          left: direction === "left" ? 0 : "auto",
          right: direction === "right" ? 0 : "auto",
        }}
        animate={{
          x: direction === "left" ? [0, -100 / 3 + "%"] : [0, 100 / 3 + "%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: currentSpeed,
            ease: "linear",
          },
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              height: `${logoHeight}px`,
              minWidth: `${logoHeight}px`,
            }}
            whileHover={scaleOnHover ? { scale: 1.2 } : {}}
            transition={{ duration: 0.3 }}
          >
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-full opacity-60 hover:opacity-100 transition-opacity duration-300"
                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                {logo.node ? (
                  <div style={{ fontSize: `${logoHeight * 0.6}px` }}>
                    {logo.node}
                  </div>
                ) : logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.alt || logo.title || "Logo"}
                    style={{
                      height: `${logoHeight * 0.8}px`,
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                ) : null}
              </a>
            ) : (
              <div
                className="flex items-center justify-center w-full h-full opacity-60"
                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                {logo.node ? (
                  <div style={{ fontSize: `${logoHeight * 0.6}px` }}>
                    {logo.node}
                  </div>
                ) : logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.alt || logo.title || "Logo"}
                    style={{
                      height: `${logoHeight * 0.8}px`,
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                ) : null}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoLoop;
