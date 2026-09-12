"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Disc3, Headphones, LayoutGrid, Mic2, Radio as RadioIcon } from "lucide-react";
import { Song } from "@/types/music";
import { colors, withAlpha } from "@/lib/theme";
import { groupByAlbum } from "@/lib/catalog";
import { trackCount } from "@/lib/format";
import { AlbumArt } from "./AlbumArt";
import { EmptyState } from "./EmptyState";
import { TrackTable } from "./TrackTable";
import { TrackRow } from "./TrackRow";

const CATEGORY_ICONS = [LayoutGrid, Disc3, Headphones, RadioIcon, Mic2];

export function BrowseView({
  songs,
  currentId,
  isPlaying,
  favorites,
  onPlay,
  onPlayAlbum,
  onToggleFavorite,
}: {
  songs: Song[];
  currentId: string;
  isPlaying: boolean;
  favorites: Set<string>;
  onPlay: (id: string) => void;
  onPlayAlbum: (trackIds: string[]) => void;
  onToggleFavorite: (id: string) => void;
}) {
  const albums = groupByAlbum(songs);
  const genres = useMemo(() => ["All", ...Array.from(new Set(albums.map((a) => a.genre)))], [albums]);
  const [filter, setFilter] = useState("All");
  const [mode, setMode] = useState<"songs" | "albums">("songs");

  const visibleAlbums = filter === "All" ? albums : albums.filter((a) => a.genre === filter);
  const genreByAlbum = useMemo(() => new Map(albums.map((a) => [a.name, a.genre])), [albums]);
  const visibleSongs =
    filter === "All" ? songs : songs.filter((s) => genreByAlbum.get(s.album) === filter);

  return (
    <div className="flex flex-col gap-5 min-h-0">
      <div className="flex items-center justify-between gap-4">
        <div className="font-sans font-extrabold tracking-tight" style={{ fontSize: 25, color: colors.ink2 }}>
          Browse the collection
        </div>
        {albums.length > 0 && (
          <div className="flex shrink-0 rounded-full" style={{ padding: 3, background: colors.lineSoft }}>
            {(["songs", "albums"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`font-label uppercase rounded-full transition-colors ${
                  mode === m ? "aurelia-hardware" : ""
                }`}
                style={{
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  padding: "7px 14px",
                  background: mode === m ? colors.ink : "transparent",
                  color: mode === m ? colors.dark : colors.muted2,
                }}
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      {albums.length === 0 ? (
        <EmptyState
          icon={Disc3}
          title="Nothing to browse yet"
          subtitle="Add tracks to the catalog and they'll show up here."
        />
      ) : (
        <>
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-3">
            {genres.map((genre, i) => {
              const active = genre === filter;
              const Icon = CATEGORY_ICONS[i % CATEGORY_ICONS.length];
              return (
                <button
                  key={genre}
                  type="button"
                  onClick={() => setFilter(genre)}
                  className="flex flex-col items-center gap-2"
                  style={{ width: 78 }}
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full transition-transform ${
                      active ? "aurelia-hardware scale-105" : ""
                    }`}
                    style={{
                      background: active ? colors.ink : colors.surface,
                      border: `1px solid ${active ? "transparent" : colors.line}`,
                      boxShadow: active
                        ? `0 10px 20px -10px ${withAlpha(colors.dark, 50)}`
                        : `0 6px 16px -12px ${withAlpha(colors.dark, 30)}`,
                    }}
                  >
                    <Icon size={20} color={active ? colors.dark : colors.muted2} strokeWidth={1.75} />
                  </span>
                  <span
                    className="truncate w-full text-center"
                    style={{ fontSize: 11, color: active ? colors.ink2 : colors.muted2 }}
                  >
                    {genre}
                  </span>
                </button>
              );
            })}
          </div>

          {mode === "songs" ? (
            visibleSongs.length === 0 ? (
              <EmptyState icon={Disc3} title="No songs in this mood" subtitle="Try a different filter." />
            ) : (
              <div className="flex flex-col gap-2 min-h-0">
                <div
                  className="font-label uppercase"
                  style={{ fontSize: 10, letterSpacing: "0.16em", color: colors.muted3 }}
                >
                  {visibleSongs.length} {visibleSongs.length === 1 ? "song" : "songs"}
                </div>
                <div className="hidden md:block">
                  <TrackTable
                    songs={visibleSongs}
                    currentId={currentId}
                    isPlaying={isPlaying}
                    favorites={favorites}
                    onPlay={onPlay}
                    onToggleFavorite={onToggleFavorite}
                  />
                </div>
                <div className="flex md:hidden flex-col">
                  {visibleSongs.map((song) => (
                    <TrackRow
                      key={song.id}
                      song={song}
                      active={song.id === currentId}
                      isPlaying={isPlaying}
                      onPlay={() => onPlay(song.id)}
                      isFavorite={favorites.has(song.id)}
                      onToggleFavorite={() => onToggleFavorite(song.id)}
                      thumbSize={44}
                      titleSize={14.5}
                      subSize={12.5}
                    />
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 overflow-y-auto thin-scrollbar pr-1 pb-2">
              {visibleAlbums.map((album, i) => (
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
                    className="pointer-events-none absolute select-none font-sans font-extrabold tracking-tight"
                    style={{
                      fontSize: 64,
                      lineHeight: 1,
                      top: 4,
                      left: 8,
                      color: withAlpha(colors.ink, 8),
                      zIndex: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="relative z-[1] flex w-full aspect-square items-center justify-center">
                    <AlbumArt
                      album={album.name}
                      isPlaying={isPlaying && album.tracks.some((t) => t.id === currentId)}
                      className="w-[74%] aspect-square"
                    />
                  </div>
                  <div className="relative z-[1] min-w-0 px-0.5 pb-1">
                    <div className="font-sans font-extrabold tracking-tight truncate" style={{ fontSize: 18, color: colors.ink }}>
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
          )}
        </>
      )}
    </div>
  );
}
