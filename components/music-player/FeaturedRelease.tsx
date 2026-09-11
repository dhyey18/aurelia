"use client";

import { motion } from "framer-motion";
import { Song } from "@/types/music";
import { colors, albumGradientFor } from "@/lib/theme";
import { albums } from "@/data/albums";
import { AlbumArt } from "./AlbumArt";

export function FeaturedRelease({
  album,
  tracks,
  isFavorited,
  onPlayAlbum,
  onAddToLibrary,
}: {
  album: string;
  tracks: Song[];
  isFavorited: boolean;
  onPlayAlbum: () => void;
  onAddToLibrary: () => void;
}) {
  const info = albums[album];
  const artist = tracks[0]?.artist ?? "";
  const [from, to] = albumGradientFor(album);

  return (
    <div
      className="relative flex items-center gap-6 sm:gap-[34px] overflow-hidden rounded-[20px]"
      style={{
        padding: "24px 22px",
        background: `linear-gradient(115deg, ${from}, ${to})`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 w-1/3 animate-sheen"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.1), transparent)",
        }}
      />

      <AlbumArt
        album={album}
        radius={15}
        floaty
        className="h-[120px] w-[120px] sm:h-[168px] sm:w-[168px] shrink-0"
      />

      <div className="min-w-0 flex flex-col gap-3 sm:gap-[14px]">
        <div
          className="font-label uppercase"
          style={{ fontSize: 10.5, letterSpacing: "0.24em", color: colors.amber }}
        >
          Featured release
        </div>
        <div
          className="font-serif leading-none"
          style={{ fontSize: "clamp(30px, 5vw, 52px)", color: colors.ink }}
        >
          {album}
        </div>
        <div style={{ fontSize: 15, color: colors.ink3 }}>
          {artist}
          {info ? ` · ${info.year} · ${tracks.length} tracks · ${info.genre}` : ""}
        </div>
        <div className="flex flex-wrap gap-[11px] mt-1">
          <motion.button
            type="button"
            onClick={onPlayAlbum}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 rounded-full font-semibold"
            style={{
              padding: "12px 22px",
              background: colors.ink,
              color: colors.dark,
              fontSize: 14,
            }}
          >
            <span
              style={{
                width: 0,
                height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft: `9px solid ${colors.dark}`,
              }}
            />
            Play album
          </motion.button>
          <motion.button
            type="button"
            onClick={onAddToLibrary}
            whileTap={{ scale: 0.96 }}
            className="rounded-full"
            style={{
              padding: "12px 22px",
              border: `1px solid oklch(0.98 0.01 80 / 0.25)`,
              color: colors.ink,
              fontSize: 14,
              background: isFavorited ? "oklch(0.98 0.01 80 / 0.12)" : "transparent",
            }}
          >
            {isFavorited ? "Added ✓" : "Add to library"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
