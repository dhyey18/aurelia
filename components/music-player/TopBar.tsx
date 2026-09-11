"use client";

import { Song } from "@/types/music";
import { colors, withAlpha } from "@/lib/theme";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar({ songs, onPlay }: { songs: Song[]; onPlay: (id: string) => void }) {
  return (
    <div className="flex items-center gap-4">
      <SearchBar songs={songs} onPlay={onPlay} className="flex-1 max-w-[380px]" />
      <div className="hidden sm:flex items-center gap-2">
        {["Mood", "Decade"].map((label) => (
          <button
            key={label}
            type="button"
            className="font-label uppercase rounded-full transition-colors hover:brightness-125"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.14em",
              color: colors.muted2,
              padding: "7px 13px",
              background: colors.lineSoft,
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <ThemeToggle className="hidden sm:flex" />
      <div
        className="shrink-0 rounded-full"
        style={{
          width: 32,
          height: 32,
          background: `repeating-linear-gradient(120deg, ${withAlpha(colors.orchid, 50)} 0px, ${withAlpha(colors.orchid, 50)} 4px, ${withAlpha(colors.amber, 40)} 4px, ${withAlpha(colors.amber, 40)} 8px)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
