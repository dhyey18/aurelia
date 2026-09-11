"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Song } from "@/types/music";
import { colors, withAlpha } from "@/lib/theme";
import { AlbumArt } from "./AlbumArt";

export function SearchBar({
  songs,
  onPlay,
  placeholder = "Search songs, artists, moods…",
  className = "",
}: {
  songs: Song[];
  onPlay: (id: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return songs
      .filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q) ||
          s.album.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query, songs]);

  useEffect(() => {
    if (!focused) return;
    const onMouseDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFocused(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [focused]);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        className="flex items-center gap-[11px] rounded-full transition-colors"
        style={{
          padding: "11px 15px",
          background: focused ? withAlpha(colors.ink, 8) : withAlpha(colors.ink, 5),
          border: `1px solid ${colors.line}`,
        }}
      >
        <span
          className="shrink-0 rounded-full"
          style={{ width: 12, height: 12, border: `1.5px solid ${colors.muted2}` }}
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          aria-label="Search Aurelia"
          className="w-full bg-transparent focus:outline-none"
          style={{ fontSize: 13.5, color: colors.ink3 }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="shrink-0"
            style={{ color: colors.muted }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {focused && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="aurelia-hardware absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-[20px]"
            style={{
              background: colors.rail,
              backdropFilter: "blur(20px)",
              border: `1px solid ${colors.line}`,
              padding: 10,
            }}
          >
            <div
              className="font-label uppercase px-2 pb-2 pt-1"
              style={{ fontSize: 9.5, letterSpacing: "0.2em", color: colors.muted3 }}
            >
              Search Aurelia
            </div>
            {results.length > 0 ? (
              results.map((song, i) => (
                <motion.button
                  key={song.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, delay: i * 0.035 }}
                  onClick={() => {
                    onPlay(song.id);
                    setFocused(false);
                    setQuery("");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl text-left transition-colors aurelia-row-hover"
                  style={{ padding: "8px" }}
                >
                  <AlbumArt album={song.album} radius={9} shadow={false} className="h-9 w-9 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate" style={{ fontSize: 13.5, color: colors.ink2 }}>
                      {song.title}
                    </p>
                    <p className="truncate" style={{ fontSize: 11.5, color: colors.muted2 }}>
                      {song.artist}
                    </p>
                  </div>
                </motion.button>
              ))
            ) : (
              <p className="py-4 text-center" style={{ fontSize: 13, color: colors.muted }}>
                No matches for &ldquo;{query}&rdquo;
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
