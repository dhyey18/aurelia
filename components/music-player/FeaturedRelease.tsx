"use client";

import { motion } from "framer-motion";
import { Song } from "@/types/music";
import { colors, withAlpha, albumGradientFor } from "@/lib/theme";
import { albums } from "@/data/albums";
import { trackCount } from "@/lib/format";
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
      className="aurelia-hardware relative overflow-hidden rounded-[34px]"
      style={{
        padding: "38px 40px 34px",
        minHeight: 320,
        background: `linear-gradient(125deg, ${from}, ${to})`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 w-1/3 animate-sheen"
        style={{ background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.1), transparent)" }}
      />
      <div
        className="pointer-events-none absolute select-none font-serif"
        style={{
          fontSize: 220,
          lineHeight: 1,
          right: "6%",
          bottom: "-18%",
          color: withAlpha(colors.ink, 8),
        }}
      >
        01
      </div>

      <div className="relative flex h-full flex-col justify-between gap-8">
        <div
          className="font-label uppercase"
          style={{ fontSize: 10.5, letterSpacing: "0.26em", color: colors.amber }}
        >
          Featured release
        </div>

        <div className="flex items-end justify-between gap-6">
          <div className="min-w-0 flex flex-col gap-4 max-w-[62%]">
            <h1
              className="font-serif"
              style={{ fontSize: "clamp(32px, 4.6vw, 58px)", lineHeight: 0.98, color: colors.ink }}
            >
              {album}
            </h1>
            <div style={{ fontSize: 15, color: colors.ink3 }}>
              {artist}
              {info ? ` · ${info.year} · ${trackCount(tracks.length)} · ${info.genre}` : ""}
            </div>
            <div className="flex flex-wrap gap-[11px] mt-1">
              <motion.button
                type="button"
                onClick={onPlayAlbum}
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 rounded-full font-semibold"
                style={{ padding: "13px 24px", background: colors.ink, color: colors.dark, fontSize: 14 }}
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
                  padding: "13px 24px",
                  border: `1px solid ${withAlpha(colors.ink, 25)}`,
                  color: colors.ink,
                  fontSize: 14,
                  background: isFavorited ? withAlpha(colors.ink, 12) : "transparent",
                }}
              >
                {isFavorited ? "Saved ♡" : "Save"}
              </motion.button>
            </div>
          </div>

          <motion.div
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="shrink-0"
            style={{ transform: "rotate(-2.5deg)", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}
          >
            <AlbumArt
              album={album}
              radius={26}
              floaty
              vinylReveal
              className="group h-[150px] w-[150px] sm:h-[196px] sm:w-[196px]"
              style={{ boxShadow: `0 28px 50px -18px ${withAlpha(from, 60)}` }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
