"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function MarqueeText({
  text,
  className = "",
  style,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [overflow, setOverflow] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      if (containerRef.current && textRef.current) {
        const diff = textRef.current.scrollWidth - containerRef.current.clientWidth;
        setOverflow(diff > 4 ? diff : 0);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [text]);

  const shouldAnimate = overflow > 0 && !reduceMotion;

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div
        ref={textRef}
        className="inline-block whitespace-nowrap"
        style={style}
        animate={shouldAnimate ? { x: [0, 0, -overflow, -overflow, 0] } : { x: 0 }}
        transition={
          shouldAnimate
            ? {
                duration: Math.max(8, overflow / 22),
                times: [0, 0.16, 0.5, 0.66, 1],
                repeat: Infinity,
                ease: "easeInOut",
              }
            : undefined
        }
      >
        {text}
      </motion.div>
    </div>
  );
}
