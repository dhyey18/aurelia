"use client";

import { motion } from "framer-motion";
import { Play, Pause, Radio as RadioIcon } from "lucide-react";
import { colors, withAlpha, albumGradientFor } from "@/lib/theme";
import { Song } from "@/types/music";
import { Visualizer } from "./Visualizer";
import { EmptyState } from "./EmptyState";

const STATIONS = [
  { name: "Late Night", freq: "88.5" },
  { name: "Golden Hour", freq: "94.1" },
  { name: "Rainy Day", freq: "101.3" },
  { name: "Slow Burn", freq: "107.9" },
];

export function RadioView({
  onShuffleAll,
  currentSong,
  isPlaying,
  onTogglePlay,
}: {
  onShuffleAll: () => void;
  currentSong: Song | null | undefined;
  isPlaying: boolean;
  onTogglePlay: () => void;
}) {
  if (!currentSong) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <EmptyState
          icon={RadioIcon}
          title="Nothing to tune in to yet"
          subtitle="Add tracks to the catalog and Aurelia FM will come alive."
        />
      </div>
    );
  }

  const [from, to] = albumGradientFor(currentSong.album);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-8 text-center py-8 overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] animate-drift-glow"
        style={{
          width: 620,
          height: 620,
          background: `radial-gradient(closest-side, ${withAlpha(from, isPlaying ? 16 : 8)}, transparent)`,
          transition: "background 0.6s ease",
        }}
      />

      <div
        className="relative font-label uppercase"
        style={{ fontSize: 10.5, letterSpacing: "0.28em", color: colors.amber }}
      >
        Aurelia FM · {isPlaying ? STATIONS[0].freq : "—.—"} FM
      </div>

      <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>
        {/* orbital rings */}
        <div
          className="absolute inset-0 rounded-full animate-orbit"
          style={{
            border: `1px dashed ${withAlpha(colors.ink, 14)}`,
            animationPlayState: isPlaying ? "running" : "paused",
          }}
        />
        <div
          className="absolute rounded-full animate-orbit-slow"
          style={{
            inset: 18,
            border: `1px solid ${withAlpha(colors.ink, 8)}`,
            animationPlayState: isPlaying ? "running" : "paused",
          }}
        />
        <div
          className={`absolute rounded-full ${isPlaying ? "animate-halo-breathe" : ""}`}
          style={{
            inset: 36,
            background: `radial-gradient(circle, ${withAlpha(from, 30)}, transparent 70%)`,
            opacity: isPlaying ? undefined : 0.35,
          }}
        />

        {/* dial */}
        <motion.button
          type="button"
          onClick={onTogglePlay}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? "Pause radio" : "Play radio"}
          className="relative flex flex-col items-center justify-center rounded-full"
          style={{
            width: 168,
            height: 168,
            background: `linear-gradient(140deg, ${from}, ${to})`,
            boxShadow: `0 24px 50px -20px ${withAlpha(from, 55)}`,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.18)" }}
          />
          {isPlaying ? (
            <Pause size={30} color={colors.dark} fill={colors.dark} strokeWidth={0} />
          ) : (
            <Play size={30} color={colors.dark} fill={colors.dark} strokeWidth={0} style={{ marginLeft: 4 }} />
          )}
          {isPlaying && (
            <div
              className="aurelia-hardware absolute -bottom-2 rounded-full font-label uppercase"
              style={{
                fontSize: 9,
                letterSpacing: "0.14em",
                padding: "3px 9px",
                background: colors.dark,
                color: colors.ink,
              }}
            >
              ● Live
            </div>
          )}
        </motion.button>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="font-sans font-extrabold tracking-tight" style={{ fontSize: 26, color: colors.ink }}>
          After Hours
        </div>
        <div style={{ fontSize: 13.5, color: colors.muted2 }}>
          {isPlaying ? `${currentSong.title} — ${currentSong.artist}` : "An endless mix, tuned to you"}
        </div>
      </div>

      <Visualizer isPlaying={isPlaying} count={16} height={30} className="w-48" />

      <motion.button
        type="button"
        onClick={onShuffleAll}
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.03 }}
        className="aurelia-hardware rounded-full font-semibold"
        style={{ padding: "13px 26px", background: colors.ink, color: colors.dark, fontSize: 14 }}
      >
        Shuffle all
      </motion.button>

      <div className="relative flex flex-col items-center gap-3 mt-2">
        <div
          className="font-label uppercase"
          style={{ fontSize: 9.5, letterSpacing: "0.24em", color: colors.muted3 }}
        >
          Or tune in to a mood
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {STATIONS.map((station) => (
            <motion.button
              key={station.name}
              type="button"
              onClick={onShuffleAll}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 rounded-full"
              style={{
                padding: "9px 16px",
                border: `1px solid ${colors.line}`,
                background: withAlpha(colors.ink, 4),
                color: colors.ink3,
                fontSize: 12.5,
              }}
            >
              {station.name}
              <span style={{ fontSize: 10.5, color: colors.muted3 }} className="tabular-nums">
                {station.freq}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
