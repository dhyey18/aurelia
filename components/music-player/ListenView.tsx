"use client";

import { Disc3 } from "lucide-react";
import { Song } from "@/types/music";
import { colors, withAlpha } from "@/lib/theme";
import { topPlayed } from "@/lib/catalog";
import { trackCount } from "@/lib/format";
import { featuredAlbum } from "@/data/songs";
import { AlbumArt } from "./AlbumArt";
import { FeaturedRelease } from "./FeaturedRelease";
import { TopBar } from "./TopBar";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { TrackTable } from "./TrackTable";
import { TrackRow } from "./TrackRow";
import { EmptyState } from "./EmptyState";

export function ListenView({
  songs,
  currentId,
  isPlaying,
  favorites,
  onPlay,
  onPlayAlbum,
  onToggleFavorite,
  onSeeAll,
}: {
  songs: Song[];
  currentId: string;
  isPlaying: boolean;
  favorites: Set<string>;
  onPlay: (id: string) => void;
  onPlayAlbum: (trackIds: string[]) => void;
  onToggleFavorite: (id: string) => void;
  onSeeAll: () => void;
}) {
  const featuredTracks = featuredAlbum ? songs.filter((s) => s.album === featuredAlbum) : [];
  const onRepeat = topPlayed(songs, 5);
  const isFeaturedPlaying = isPlaying && featuredTracks.some((t) => t.id === currentId);
  const isEmpty = songs.length === 0;

  return (
    <div className="flex flex-col gap-7 min-h-0">
      {/* ---- Desktop header + hero ---- */}
      <div className="hidden lg:flex flex-col gap-5">
        <div className="flex items-end justify-between">
          <div>
            <div
              className="font-label uppercase"
              style={{ fontSize: 10.5, letterSpacing: "0.24em", color: colors.muted2 }}
            >
              Good evening
            </div>
            <div className="font-sans font-extrabold tracking-tight mt-1" style={{ fontSize: 34, lineHeight: 1.05, color: colors.ink }}>
              Your evening starts here.
            </div>
          </div>
          <TopBar songs={songs} onPlay={onPlay} />
        </div>
        {featuredAlbum && (
          <FeaturedRelease
            album={featuredAlbum}
            tracks={featuredTracks}
            isFavorited={featuredTracks.every((t) => favorites.has(t.id))}
            isPlaying={isFeaturedPlaying}
            onPlayAlbum={() => onPlayAlbum(featuredTracks.map((t) => t.id))}
            onAddToLibrary={() => featuredTracks.forEach((t) => onToggleFavorite(t.id))}
          />
        )}
      </div>

      {/* ---- Mobile greeting + compact featured card ---- */}
      <div className="flex lg:hidden flex-col gap-[18px]">
        <div className="flex items-center justify-between">
          <div>
            <div
              className="font-label uppercase"
              style={{ fontSize: 9.5, letterSpacing: "0.24em", color: colors.muted2 }}
            >
              Good evening
            </div>
            <div className="font-sans font-extrabold tracking-tight mt-0.5" style={{ fontSize: 22, lineHeight: 1.15, color: colors.ink }}>
              Your evening starts here.
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <div
              className="rounded-full shrink-0"
              style={{
                width: 34,
                height: 34,
                background: `repeating-linear-gradient(120deg, ${withAlpha(colors.orchid, 50)} 0px, ${withAlpha(colors.orchid, 50)} 4px, ${withAlpha(colors.amber, 40)} 4px, ${withAlpha(colors.amber, 40)} 8px)`,
              }}
            />
          </div>
        </div>
        <SearchBar songs={songs} onPlay={onPlay} placeholder="Search songs, artists…" />
        {featuredAlbum && (
          <button
            type="button"
            onClick={() => onPlayAlbum(featuredTracks.map((t) => t.id))}
            className="aurelia-hardware relative flex items-center gap-4 overflow-hidden rounded-[24px] text-left"
            style={{ padding: 18, background: "linear-gradient(120deg, oklch(0.26 0.05 60), oklch(0.2 0.04 330))" }}
          >
            <div
              className="pointer-events-none absolute inset-0 w-1/3 animate-sheen"
              style={{ background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.1), transparent)" }}
            />
            <AlbumArt
              album={featuredAlbum}
              radius={16}
              shape="sleeve"
              isPlaying={isFeaturedPlaying}
              className="shrink-0"
              style={{ width: 84, height: 84 }}
            />
            <div className="min-w-0 flex-1">
              <div
                className="font-label uppercase"
                style={{ fontSize: 9.5, letterSpacing: "0.22em", color: colors.amber }}
              >
                Featured
              </div>
              <div
                className="font-sans font-extrabold tracking-tight mt-1 line-clamp-2"
                style={{ fontSize: 22, lineHeight: 1.15, color: colors.ink }}
              >
                {featuredAlbum}
              </div>
              <div className="truncate mt-0.5" style={{ fontSize: 13, color: colors.ink3 }}>
                {featuredTracks[0]?.artist} · {trackCount(featuredTracks.length)}
              </div>
            </div>
          </button>
        )}
      </div>

      {isEmpty ? (
        <EmptyState
          icon={Disc3}
          title="Your library is empty"
          subtitle="Drop some tracks into the catalog and Aurelia will come back to life."
          className="mt-2"
        />
      ) : (
        <div className="flex flex-col gap-2 min-h-0">
          <div className="flex items-baseline justify-between">
            <div className="font-sans font-extrabold tracking-tight" style={{ fontSize: 22 }}>
              <span className="hidden lg:inline" style={{ fontSize: 25, color: colors.ink2 }}>
                On repeat this week
              </span>
              <span className="lg:hidden" style={{ fontSize: 22, color: colors.ink2 }}>
                On repeat
              </span>
            </div>
            <button
              type="button"
              onClick={onSeeAll}
              className="font-label uppercase"
              style={{ fontSize: 10.5, letterSpacing: "0.16em", color: colors.muted2 }}
            >
              See all
            </button>
          </div>

          <div className="hidden lg:block">
            <TrackTable
              songs={onRepeat}
              currentId={currentId}
              isPlaying={isPlaying}
              favorites={favorites}
              onPlay={onPlay}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
          <div className="flex lg:hidden flex-col">
            {onRepeat.map((song) => (
              <TrackRow
                key={song.id}
                song={song}
                active={song.id === currentId}
                isPlaying={isPlaying}
                onPlay={() => onPlay(song.id)}
                isFavorite={favorites.has(song.id)}
                onToggleFavorite={() => onToggleFavorite(song.id)}
                thumbSize={44}
                titleSize={15}
                subSize={13}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
