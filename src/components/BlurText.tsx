import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "characters";
  direction?: "top" | "bottom" | "left" | "right";
  onAnimationComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const BlurText = ({
  text,
  delay = 0,
  animateBy = "words",
  direction = "top",
  onAnimationComplete,
  className = "",
  style = {},
}: BlurTextProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getDirectionOffset = () => {
    switch (direction) {
      case "top":
        return { y: -20, x: 0 };
      case "bottom":
        return { y: 20, x: 0 };
      case "left":
        return { y: 0, x: -20 };
      case "right":
        return { y: 0, x: 20 };
      default:
        return { y: -20, x: 0 };
    }
  };

  const offset = getDirectionOffset();
  const splitText = animateBy === "words" ? text.split(" ") : text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay / 1000,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(8px)",
      y: offset.y,
      x: offset.x,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.span
      className={className}
      style={{ ...style, display: "inline-block", width: "100%" }}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      onAnimationComplete={onAnimationComplete}
    >
      {splitText.map((item, index) => (
        <motion.span
          key={`${item}-${index}`}
          variants={itemVariants}
          style={{ display: "inline-block", whiteSpace: animateBy === "words" ? "pre" : "normal" }}
        >
          {item}
          {animateBy === "words" && index < splitText.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default BlurText;
