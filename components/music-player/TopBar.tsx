"use client";

import { Song } from "@/types/music";
import { colors } from "@/lib/theme";
import { SearchBar } from "./SearchBar";

export function TopBar({ songs, onPlay }: { songs: Song[]; onPlay: (id: string) => void }) {
  return (
    <div className="flex items-center gap-4">
      <SearchBar songs={songs} onPlay={onPlay} className="flex-1 max-w-[380px]" />
      <div className="hidden sm:flex items-center gap-2">
        {["Mood", "Decade"].map((label) => (
          <span
            key={label}
            className="font-label uppercase rounded-full"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.14em",
              color: colors.muted2,
              padding: "7px 13px",
              background: "oklch(0.98 0.01 80 / 0.07)",
            }}
          >
            {label}
          </span>
        ))}
      </div>
      <div
        className="shrink-0 rounded-full"
        style={{
          width: 32,
          height: 32,
          background: `repeating-linear-gradient(120deg, ${colors.orchid}80 0px, ${colors.orchid}80 4px, ${colors.amber}66 4px, ${colors.amber}66 8px)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
