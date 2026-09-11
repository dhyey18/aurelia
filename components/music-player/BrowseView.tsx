"use client";

import { motion } from "framer-motion";
import { Song } from "@/types/music";
import { colors } from "@/lib/theme";
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

  return (
    <div className="flex flex-col gap-5 min-h-0">
      <div className="font-serif" style={{ fontSize: 25, color: colors.ink2 }}>
        Browse
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto thin-scrollbar pr-1">
        {albums.map((album) => (
          <motion.button
            key={album.name}
            type="button"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPlayAlbum(album.tracks.map((t) => t.id))}
            className="flex flex-col gap-3 rounded-2xl text-left"
            style={{ padding: 10, border: `1px solid ${colors.line}` }}
          >
            <AlbumArt album={album.name} radius={12} className="w-full aspect-square" />
            <div className="min-w-0 px-0.5 pb-1">
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
