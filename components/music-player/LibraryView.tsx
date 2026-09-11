"use client";

import { Song } from "@/types/music";
import { colors } from "@/lib/theme";
import { TrackRow } from "./TrackRow";

export function LibraryView({
  recentlyPlayed,
  favorites,
  currentId,
  isPlaying,
  favoriteIds,
  onPlay,
  onToggleFavorite,
}: {
  recentlyPlayed: Song[];
  favorites: Song[];
  currentId: string;
  isPlaying: boolean;
  favoriteIds: Set<string>;
  onPlay: (id: string) => void;
  onToggleFavorite: (id: string) => void;
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
          <p style={{ fontSize: 13.5, color: colors.muted }}>
            Nothing played yet — press play to get started.
          </p>
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
          <p style={{ fontSize: 13.5, color: colors.muted }}>
            Tap the heart on a track to save it here.
          </p>
        )}
      </section>
    </div>
  );
}
