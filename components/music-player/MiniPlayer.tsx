"use client";

import { motion } from "framer-motion";
import { Pause } from "lucide-react";
import { colors } from "@/lib/theme";
import { AlbumArt } from "./AlbumArt";
import { Visualizer } from "./Visualizer";
import { UseAudioPlayerReturn } from "@/hooks/useAudioPlayer";

export function MiniPlayer({
  player,
  onExpand,
}: {
  player: UseAudioPlayerReturn;
  onExpand: () => void;
}) {
  const { currentSong, isPlaying, togglePlay } = player;
  if (!currentSong) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onExpand}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExpand();
        }
      }}
      aria-label={`Now playing: ${currentSong.title} — expand player`}
      className="aurelia-hardware flex lg:hidden items-center gap-3 rounded-2xl text-left mx-3.5 mb-2 cursor-pointer"
      style={{
        padding: "10px 12px",
        background: colors.bgMini,
        backdropFilter: "blur(14px)",
      }}
    >
      <motion.div layoutId="now-playing-art" className="shrink-0" style={{ width: 40, height: 40 }}>
        <AlbumArt
          album={currentSong.album}
          shadow={false}
          isPlaying={isPlaying}
          className="w-full h-full"
        />
      </motion.div>
      <div className="min-w-0 flex-1">
        <div className="truncate" style={{ fontSize: 14, color: colors.ink }}>
          {currentSong.title}
        </div>
        <div className="truncate" style={{ fontSize: 12, color: colors.muted }}>
          {currentSong.artist}
        </div>
      </div>
      <Visualizer isPlaying={isPlaying} count={4} height={18} className="w-[26px] shrink-0" />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="flex shrink-0 items-center justify-center rounded-full"
        style={{ width: 44, height: 44, background: colors.ink }}
      >
        {isPlaying ? (
          <Pause size={16} color={colors.dark} fill={colors.dark} strokeWidth={0} />
        ) : (
          <span
            style={{
              marginLeft: 3,
              width: 0,
              height: 0,
              borderTop: "7px solid transparent",
              borderBottom: "7px solid transparent",
              borderLeft: `11px solid ${colors.dark}`,
            }}
          />
        )}
      </button>
    </div>
  );
}
