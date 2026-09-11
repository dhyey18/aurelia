"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Song } from "@/types/music";
import { colors, withAlpha } from "@/lib/theme";
import { groupByAlbum } from "@/lib/catalog";
import { trackCount } from "@/lib/format";
import { AlbumArt } from "./AlbumArt";

export function BrowseView({
  songs,
  onPlayAlbum,
}: {
  songs: Song[];
  onPlayAlbum: (trackIds: string[]) => void;
}) {
  const albums = groupByAlbum(songs);
  const genres = useMemo(() => ["All", ...Array.from(new Set(albums.map((a) => a.genre)))], [albums]);
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? albums : albums.filter((a) => a.genre === filter);

  return (
    <div className="flex flex-col gap-5 min-h-0">
      <div className="font-serif" style={{ fontSize: 25, color: colors.ink2 }}>
        Browse the collection
      </div>

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => {
          const active = genre === filter;
          return (
            <button
              key={genre}
              type="button"
              onClick={() => setFilter(genre)}
              className={`font-label uppercase rounded-full transition-colors ${active ? "aurelia-hardware" : ""}`}
              style={{
                fontSize: 10.5,
                letterSpacing: "0.12em",
                padding: "8px 15px",
                background: active ? colors.ink : colors.lineSoft,
                color: active ? colors.dark : colors.muted2,
              }}
            >
              {genre}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 overflow-y-auto thin-scrollbar pr-1 pb-2">
        {visible.map((album, i) => (
          <motion.button
            key={album.name}
            type="button"
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPlayAlbum(album.tracks.map((t) => t.id))}
            className="group relative flex flex-col gap-3 rounded-[24px] text-left overflow-visible"
            style={{
              padding: 12,
              background: colors.surface,
              border: `1px solid ${colors.line}`,
              boxShadow: `0 14px 30px -18px ${withAlpha(colors.dark, 40)}`,
            }}
          >
            <div
              className="pointer-events-none absolute select-none font-serif"
              style={{
                fontSize: 74,
                lineHeight: 1,
                top: -10,
                left: 8,
                color: withAlpha(colors.ink, 8),
                zIndex: 0,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <AlbumArt
              album={album.name}
              radius={18}
              vinylReveal
              className="relative z-[1] w-full aspect-square"
            />
            <div className="relative z-[1] min-w-0 px-0.5 pb-1">
              <div className="font-serif truncate" style={{ fontSize: 18, color: colors.ink }}>
                {album.name}
              </div>
              <div className="truncate" style={{ fontSize: 12.5, color: colors.muted2 }}>
                {album.artist} · {trackCount(album.tracks.length)}
              </div>
              {album.blurb && (
                <div
                  className="mt-1 line-clamp-2"
                  style={{ fontSize: 11.5, color: colors.muted3, lineHeight: 1.4 }}
                >
                  {album.blurb}
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
