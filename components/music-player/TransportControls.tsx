"use client";

import { motion } from "framer-motion";
import { Pause, Repeat, Repeat1, Shuffle } from "lucide-react";
import { RepeatMode } from "@/types/music";
import { colors, withAlpha } from "@/lib/theme";

function Triangle({ direction, size = 11 }: { direction: "left" | "right"; size?: number }) {
  const side = direction === "left" ? "borderRight" : "borderLeft";
  return (
    <span
      style={{
        width: 0,
        height: 0,
        borderTop: `${Math.round(size * 0.73)}px solid transparent`,
        borderBottom: `${Math.round(size * 0.73)}px solid transparent`,
        [side]: `${size}px solid ${colors.ink2}`,
      }}
    />
  );
}

export function TransportControls({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  shuffle,
  onToggleShuffle,
  repeat,
  onCycleRepeat,
  size = "md",
}: {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  shuffle: boolean;
  onToggleShuffle: () => void;
  repeat: RepeatMode;
  onCycleRepeat: () => void;
  size?: "md" | "lg";
}) {
  const heroSize = size === "lg" ? 68 : 58;
  const triSize = size === "lg" ? 13 : 11;
  const iconSize = size === "lg" ? 16 : 15;

  return (
    <div className="flex items-center justify-center gap-6" style={{ padding: "0 6px" }}>
      <button
        type="button"
        onClick={onToggleShuffle}
        aria-label="Toggle shuffle"
        aria-pressed={shuffle}
        className="transition-colors"
        style={{ fontSize: iconSize, color: shuffle ? colors.amber : colors.muted }}
      >
        <Shuffle size={iconSize} />
      </button>

      <motion.button
        type="button"
        onClick={onPrev}
        aria-label="Previous track"
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.1 }}
        className="flex items-center justify-center"
      >
        <Triangle direction="left" size={triSize} />
      </motion.button>

      <motion.button
        type="button"
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="flex items-center justify-center rounded-full"
        style={{
          width: heroSize,
          height: heroSize,
          background: colors.ink,
          boxShadow: `0 12px 30px -10px ${withAlpha(colors.amber, 80)}`,
        }}
      >
        {isPlaying ? (
          <Pause size={heroSize * 0.32} color={colors.dark} fill={colors.dark} strokeWidth={0} />
        ) : (
          <span style={{ marginLeft: 3 }}>
            <Triangle direction="right" size={heroSize * 0.19} />
          </span>
        )}
      </motion.button>

      <motion.button
        type="button"
        onClick={onNext}
        aria-label="Next track"
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.1 }}
        className="flex items-center justify-center"
      >
        <Triangle direction="right" size={triSize} />
      </motion.button>

      <button
        type="button"
        onClick={onCycleRepeat}
        aria-label={`Repeat: ${repeat}`}
        aria-pressed={repeat !== "off"}
        className="transition-colors"
        style={{ fontSize: iconSize, color: repeat !== "off" ? colors.amber : colors.muted }}
      >
        {repeat === "one" ? <Repeat1 size={iconSize} /> : <Repeat size={iconSize} />}
      </button>
    </div>
  );
}
