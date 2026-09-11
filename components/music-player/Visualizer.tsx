"use client";

import { colors } from "@/lib/theme";

/** Deterministic pseudo-random so bar timing is stable across server/client renders. */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt) * 43758.5453;
  return x - Math.floor(x);
}

export function Visualizer({
  isPlaying,
  count = 20,
  height = 64,
  className = "",
}: {
  isPlaying: boolean;
  count?: number;
  height?: number;
  className?: string;
}) {
  const bars = Array.from({ length: count }, (_, i) => ({
    duration: 0.85 + seeded(i, 1) * 0.75,
    delay: seeded(i, 7) * 0.6,
  }));

  return (
    <div
      className={`flex items-end gap-[3px] ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className={isPlaying ? "eq-bar" : ""}
          style={{
            flex: "1 1 0%",
            height: "100%",
            borderRadius: 2,
            transformOrigin: "center bottom",
            background: `linear-gradient(to top, ${colors.amber}, ${colors.orchid})`,
            animationDuration: `${bar.duration}s`,
            animationDelay: `${bar.delay}s`,
            transform: isPlaying ? undefined : "scaleY(0.08)",
            opacity: isPlaying ? 1 : 0.35,
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}
