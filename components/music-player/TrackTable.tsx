"use client";

import { Heart } from "lucide-react";
import { Song } from "@/types/music";
import { colors } from "@/lib/theme";
import { formatTime } from "@/lib/format";
import { AlbumArt } from "./AlbumArt";

const GRID = "28px minmax(0,2.1fr) minmax(0,1.5fr) 64px 50px 26px";

export function TrackTable({
  songs,
  currentId,
  isPlaying,
  favorites,
  onPlay,
  onToggleFavorite,
}: {
  songs: Song[];
  currentId: string;
  isPlaying: boolean;
  favorites: Set<string>;
  onPlay: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 min-h-0">
      <div
        className="hidden md:grid font-label uppercase"
        style={{
          gridTemplateColumns: GRID,
          gap: 16,
          padding: "0 12px 8px",
          fontSize: 10,
          letterSpacing: "0.16em",
          color: colors.faint,
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <span>#</span>
        <span>Title</span>
        <span>Album</span>
        <span>Plays</span>
        <span style={{ textAlign: "right" }}>Time</span>
        <span />
      </div>

      {songs.map((song, i) => {
        const active = song.id === currentId;
        const isFav = favorites.has(song.id);
        return (
          <div
            key={song.id}
            className="group aurelia-row-hover md:grid flex items-center gap-3 rounded-[14px] cursor-pointer transition-colors"
            style={{ gridTemplateColumns: GRID, gap: 16, padding: "9px 12px" }}
            onClick={() => onPlay(song.id)}
          >
            <span
              className="hidden md:inline font-serif tabular-nums"
              style={{ fontSize: 21, color: active ? colors.amber : colors.faint }}
            >
              {i + 1}
            </span>
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <AlbumArt
                album={song.album}
                radius={7}
                shadow={false}
                isPlaying={isPlaying && active}
                style={{ width: 38, height: 38 }}
                className="shrink-0"
              />
              <div className="min-w-0">
                <div
                  className="truncate"
                  style={{ fontSize: 14.5, color: active ? colors.amber : colors.ink2 }}
                >
                  {song.title}
                </div>
                <div className="truncate" style={{ fontSize: 12.5, color: colors.muted2 }}>
                  {song.artist}
                </div>
              </div>
            </div>
            <span
              className="hidden md:block truncate"
              style={{ fontSize: 13, color: colors.muted }}
            >
              {song.album}
            </span>
            <span
              className="hidden md:inline tabular-nums"
              style={{ fontSize: 12.5, color: colors.muted3 }}
            >
              {song.plays ?? "—"}
            </span>
            <span
              className="shrink-0 tabular-nums"
              style={{ fontSize: 13, color: colors.muted2, textAlign: "right" }}
            >
              {formatTime(song.duration)}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(song.id);
              }}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              className="hidden md:flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              style={{ color: isFav ? colors.amber : colors.muted, opacity: isFav ? 1 : undefined }}
            >
              <Heart size={13} fill={isFav ? "currentColor" : "none"} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
