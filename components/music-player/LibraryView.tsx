"use client";

import { History, Heart } from "lucide-react";
import { Song } from "@/types/music";
import { colors } from "@/lib/theme";
import { TrackRow } from "./TrackRow";
import { EmptyState } from "./EmptyState";

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
