"use client";

import { Heart } from "lucide-react";
import { Song } from "@/types/music";
import { colors } from "@/lib/theme";
import { formatTime } from "@/lib/format";
import { AlbumArt } from "./AlbumArt";
import { EqIndicator } from "./EqIndicator";

export function TrackRow({
  song,
  active = false,
  isPlaying = false,
  onPlay,
  isFavorite,
  onToggleFavorite,
  thumbSize = 34,
  titleSize = 13,
  subSize = 11.5,
  className = "",
}: {
  song: Song;
  active?: boolean;
  isPlaying?: boolean;
  onPlay: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  thumbSize?: number;
  titleSize?: number;
  subSize?: number;
  className?: string;
}) {
  return (
    <div
      className={`group aurelia-row-hover flex items-center gap-3 rounded-xl transition-colors ${className}`}
      style={{ padding: "5px 6px" }}
    >
      <button
        type="button"
        onClick={onPlay}
        className="flex items-center gap-3 min-w-0 flex-1 text-left"
      >
        <div className="relative shrink-0" style={{ width: thumbSize, height: thumbSize }}>
          <AlbumArt
            album={song.album}
            shadow={false}
            isPlaying={isPlaying && active}
            className="h-full w-full"
          />
          {active && isPlaying && (
            <span
              className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-full"
              style={{ width: 18, height: 18, background: colors.dark, boxShadow: `0 0 0 2px ${colors.dark}` }}
            >
              <EqIndicator />
            </span>
          )}
        </div>
        <div className="min-w-0">
          <div
            className="truncate"
            style={{ fontSize: titleSize, color: active ? colors.amber : colors.ink2 }}
          >
            {song.title}
          </div>
          <div className="truncate" style={{ fontSize: subSize, color: colors.muted2 }}>
            {song.artist}
          </div>
        </div>
      </button>
      {onToggleFavorite && (
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="flex shrink-0 items-center justify-center rounded-full transition-all group-hover:scale-110"
          style={{
            width: 36,
            height: 36,
            color: isFavorite ? colors.amber : colors.muted,
            opacity: isFavorite ? 1 : 0.55,
          }}
        >
          <Heart size={15} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      )}
      <span className="shrink-0 tabular-nums" style={{ fontSize: subSize, color: colors.muted3 }}>
        {formatTime(song.duration)}
      </span>
    </div>
  );
}
