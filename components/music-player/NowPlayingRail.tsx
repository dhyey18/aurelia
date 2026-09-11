"use client";

import { Reorder } from "framer-motion";
import { Heart, Volume1, Volume2, VolumeX } from "lucide-react";
import { colors } from "@/lib/theme";
import { AlbumArt } from "./AlbumArt";
import { MarqueeText } from "./MarqueeText";
import { Visualizer } from "./Visualizer";
import { ProgressBar } from "./ProgressBar";
import { TransportControls } from "./TransportControls";
import { TrackRow } from "./TrackRow";
import { UseAudioPlayerReturn } from "@/hooks/useAudioPlayer";

export function NowPlayingRail({ player }: { player: UseAudioPlayerReturn }) {
  const {
    currentSong,
    queue,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    shuffle,
    repeat,
    favorites,
    togglePlay,
    next,
    prev,
    seek,
    changeVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
    toggleFavorite,
    playSong,
    reorderQueue,
  } = player;

  if (!currentSong) return null;

  const upNext = queue.slice(currentIndex + 1, currentIndex + 7);
  const VolIcon = isMuted || volume === 0 ? VolumeX : volume < 0.6 ? Volume1 : Volume2;

  return (
    <aside
      className="relative hidden lg:flex flex-col gap-[15px] min-h-0"
      style={{
        padding: 26,
        background: colors.rail,
        backdropFilter: "blur(20px)",
        borderLeft: `1px solid ${colors.line}`,
      }}
    >
      <div className="flex items-center justify-between">
        <div
          className="font-label uppercase"
          style={{ fontSize: 10, letterSpacing: "0.2em", color: colors.amber }}
        >
          Now playing
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toggleFavorite(currentSong.id)}
            aria-label={favorites.has(currentSong.id) ? "Remove from favorites" : "Add to favorites"}
            style={{ color: favorites.has(currentSong.id) ? colors.amber : colors.muted }}
          >
            <Heart size={14} fill={favorites.has(currentSong.id) ? "currentColor" : "none"} />
          </button>
          <div style={{ fontSize: 11.5, color: colors.muted2 }}>from {currentSong.album}</div>
        </div>
      </div>

      <AlbumArt
        album={currentSong.album}
        radius={18}
        spinBadge
        isPlaying={isPlaying}
        className="w-full aspect-square"
        style={{ boxShadow: "0 30px 60px -24px oklch(0 0 0 / 0.8)" }}
      />

      <div className="flex flex-col gap-[5px]">
        <MarqueeText
          text={currentSong.title}
          className="font-serif"
          style={{ fontSize: 32, lineHeight: 1.1, color: colors.ink }}
        />
        <div style={{ fontSize: 14, color: colors.ink3 }}>{currentSong.artist}</div>
      </div>

      <Visualizer isPlaying={isPlaying} height={64} />

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
      />

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          style={{ color: colors.muted }}
        >
          <VolIcon size={14} />
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : volume}
          onChange={(e) => changeVolume(Number(e.target.value))}
          aria-label="Volume"
          className="w-20 accent-current"
          style={{ accentColor: colors.amber }}
        />
      </div>

      {upNext.length > 0 && (
        <div
          className="mt-auto flex flex-col gap-2 min-h-0"
          style={{ paddingTop: 18, borderTop: `1px solid ${colors.lineSoft}` }}
        >
          <div
            className="font-label uppercase shrink-0"
            style={{ fontSize: 10, letterSpacing: "0.2em", color: colors.muted3 }}
          >
            Up next
          </div>
          <Reorder.Group
            axis="y"
            values={upNext.map((s) => s.id)}
            onReorder={(ids) => {
              const before = queue.slice(0, currentIndex + 1).map((s) => s.id);
              const after = queue.slice(currentIndex + 7).map((s) => s.id);
              reorderQueue([...before, ...ids, ...after]);
            }}
            className="flex flex-col gap-1 overflow-y-auto thin-scrollbar"
          >
            {upNext.map((song) => (
              <Reorder.Item key={song.id} value={song.id}>
                <TrackRow
                  song={song}
                  onPlay={() => playSong(song.id)}
                  thumbSize={32}
                  titleSize={13}
                  subSize={11.5}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      )}
    </aside>
  );
}
