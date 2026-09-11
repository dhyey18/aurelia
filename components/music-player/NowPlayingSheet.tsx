"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, MoreHorizontal } from "lucide-react";
import { colors, radii } from "@/lib/theme";
import { AlbumArt } from "./AlbumArt";
import { MarqueeText } from "./MarqueeText";
import { Visualizer } from "./Visualizer";
import { ProgressBar } from "./ProgressBar";
import { TransportControls } from "./TransportControls";
import { TrackRow } from "./TrackRow";
import { UseAudioPlayerReturn } from "@/hooks/useAudioPlayer";

export function NowPlayingSheet({
  isOpen,
  onClose,
  player,
}: {
  isOpen: boolean;
  onClose: () => void;
  player: UseAudioPlayerReturn;
}) {
  const {
    currentSong,
    queue,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    shuffle,
    repeat,
    favorites,
    togglePlay,
    next,
    prev,
    seek,
    toggleShuffle,
    cycleRepeat,
    toggleFavorite,
    playSong,
  } = player;

  if (!currentSong) return null;
  const upNext = queue.slice(currentIndex + 1, currentIndex + 6);
  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-label="Now playing"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          className="aurelia-hardware fixed inset-0 z-50 flex flex-col lg:hidden overflow-y-auto"
          style={{ background: colors.bg, padding: "18px 22px 28px" }}
        >
          <div className="flex items-center justify-between shrink-0">
            <button type="button" onClick={onClose} aria-label="Close now playing" style={{ color: colors.ink3 }}>
              <ChevronDown size={22} />
            </button>
            <span
              className="font-label uppercase"
              style={{ fontSize: 9.5, letterSpacing: "0.22em", color: colors.muted }}
            >
              {currentSong.album}
            </span>
            <button type="button" aria-label="More options" style={{ color: colors.ink3 }}>
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-5 flex-1 mt-5">
            <motion.div
              layoutId="now-playing-art"
              className="mx-[5%] my-[3%]"
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
            >
              <AlbumArt
                album={currentSong.album}
                radius={radii.artwork}
                halo
                isPlaying={isPlaying}
                progress={progress}
                floaty
                className="w-full aspect-square"
              />
            </motion.div>

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <MarqueeText
                  text={currentSong.title}
                  className="font-serif"
                  style={{ fontSize: 30, lineHeight: 1.1, color: colors.ink }}
                />
                <div style={{ fontSize: 14.5, color: colors.ink3 }}>{currentSong.artist}</div>
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite(currentSong.id)}
                aria-label={favorites.has(currentSong.id) ? "Remove from favorites" : "Add to favorites"}
                className="shrink-0 mt-1"
                style={{ color: favorites.has(currentSong.id) ? colors.amber : colors.muted }}
              >
                <Heart size={20} fill={favorites.has(currentSong.id) ? "currentColor" : "none"} />
              </button>
            </div>

            <Visualizer isPlaying={isPlaying} height={56} />

            <ProgressBar currentTime={currentTime} duration={duration} onSeek={seek} />

            <TransportControls
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              onNext={next}
              onPrev={prev}
              shuffle={shuffle}
              onToggleShuffle={toggleShuffle}
              repeat={repeat}
              onCycleRepeat={cycleRepeat}
              size="lg"
            />

            {upNext.length > 0 && (
              <div
                className="mt-auto flex flex-col gap-2"
                style={{ paddingTop: 14, borderTop: `1px solid ${colors.lineSoft}` }}
              >
                <div
                  className="font-label uppercase"
                  style={{ fontSize: 9.5, letterSpacing: "0.2em", color: colors.muted3 }}
                >
                  Up next
                </div>
                {upNext.map((song) => (
                  <TrackRow
                    key={song.id}
                    song={song}
                    onPlay={() => playSong(song.id)}
                    thumbSize={34}
                    titleSize={13.5}
                    subSize={11.5}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
