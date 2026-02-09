import { useEffect, useRef, useState } from "react";

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Changed to true by default

  useEffect(() => {
    // Disabled intersection observer to prevent blinking
    // Elements are now always visible
    return () => {};
  }, [threshold]);

  return { ref, isVisible };
}
