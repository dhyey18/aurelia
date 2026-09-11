"use client";

import { History, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Song } from "@/types/music";
import { colors, withAlpha } from "@/lib/theme";
import { TrackRow } from "./TrackRow";

function EmptyState({
  icon: Icon,
  title,
  subtitle,
  cta,
  onCta,
}: {
  icon: typeof History;
  title: string;
  subtitle: string;
  cta: string;
  onCta: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-[22px] text-center"
      style={{
        padding: "30px 20px",
        border: `1px dashed ${colors.line}`,
        background: withAlpha(colors.ink, 3),
      }}
    >
      <span
        className="flex items-center justify-center rounded-full"
        style={{ width: 44, height: 44, background: colors.surface, border: `1px solid ${colors.line}` }}
      >
        <Icon size={18} color={colors.muted2} strokeWidth={1.75} />
      </span>
      <div style={{ fontSize: 14, color: colors.ink3 }}>{title}</div>
      <p style={{ fontSize: 12.5, color: colors.muted, maxWidth: 280 }}>{subtitle}</p>
      <motion.button
        type="button"
        onClick={onCta}
        whileTap={{ scale: 0.96 }}
        className="rounded-full font-semibold"
        style={{ padding: "9px 18px", background: colors.ink, color: colors.dark, fontSize: 12.5 }}
      >
        {cta}
      </motion.button>
    </div>
  );
}

export function LibraryView({
  recentlyPlayed,
  favorites,
  currentId,
  isPlaying,
  favoriteIds,
  onPlay,
  onToggleFavorite,
  onBrowse,
}: {
  recentlyPlayed: Song[];
  favorites: Song[];
  currentId: string;
  isPlaying: boolean;
  favoriteIds: Set<string>;
  onPlay: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onBrowse: () => void;
}) {
  return (
    <div className="flex flex-col gap-8 min-h-0 overflow-y-auto thin-scrollbar pr-1">
      <div className="font-sans font-extrabold tracking-tight" style={{ fontSize: 25, color: colors.ink2 }}>
        Your library
      </div>

      <section className="flex flex-col gap-1">
        <div
          className="font-label uppercase mb-1"
          style={{ fontSize: 10, letterSpacing: "0.16em", color: colors.muted3 }}
        >
          Recently played
        </div>
        {recentlyPlayed.length > 0 ? (
          recentlyPlayed.map((song) => (
            <TrackRow
              key={song.id}
              song={song}
              active={song.id === currentId}
              isPlaying={isPlaying}
              onPlay={() => onPlay(song.id)}
              isFavorite={favoriteIds.has(song.id)}
              onToggleFavorite={() => onToggleFavorite(song.id)}
              thumbSize={40}
              titleSize={14}
              subSize={12}
            />
          ))
        ) : (
          <EmptyState
            icon={History}
            title="Nothing played yet"
            subtitle="Start something from the collection and it'll show up here."
            cta="Browse the collection"
            onCta={onBrowse}
          />
        )}
      </section>

      <section className="flex flex-col gap-1">
        <div
          className="font-label uppercase mb-1"
          style={{ fontSize: 10, letterSpacing: "0.16em", color: colors.muted3 }}
        >
          Favorites
        </div>
        {favorites.length > 0 ? (
          favorites.map((song) => (
            <TrackRow
              key={song.id}
              song={song}
              active={song.id === currentId}
              isPlaying={isPlaying}
              onPlay={() => onPlay(song.id)}
              isFavorite
              onToggleFavorite={() => onToggleFavorite(song.id)}
              thumbSize={40}
              titleSize={14}
              subSize={12}
            />
          ))
        ) : (
          <EmptyState
            icon={Heart}
            title="No favorites yet"
            subtitle="Tap the heart on any track to save it here for later."
            cta="Browse the collection"
            onCta={onBrowse}
          />
        )}
      </section>
    </div>
  );
}
