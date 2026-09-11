"use client";

import { useState } from "react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { songs as songData } from "@/data/songs";
import { playlists } from "@/data/playlists";
import { Playlist } from "@/types/music";
import { colors } from "@/lib/theme";
import { Sidebar, ViewKey } from "./Sidebar";
import { NowPlayingRail } from "./NowPlayingRail";
import { MiniPlayer } from "./MiniPlayer";
import { MobileTabBar } from "./MobileTabBar";
import { NowPlayingSheet } from "./NowPlayingSheet";
import { ListenView } from "./ListenView";
import { BrowseView } from "./BrowseView";
import { RadioView } from "./RadioView";
import { LibraryView } from "./LibraryView";

export function AureliaApp() {
  const player = useAudioPlayer(songData);
  const [view, setView] = useState<ViewKey>("listen");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const {
    audioRef,
    currentSong,
    isPlaying,
    favorites,
    recentlyPlayed,
    playSong,
    toggleFavorite,
    shuffleAll,
  } = player;

  if (!currentSong) return null;
  const currentId = currentSong.id;

  const playPlaylist = (playlist: Playlist) => {
    if (playlist.songIds.length === 0) return;
    playSong(playlist.songIds[0], playlist.songIds);
  };

  const favoriteSongs = songData.filter((s) => favorites.has(s.id));

  return (
    <div className="relative flex min-h-dvh flex-col lg:h-dvh lg:overflow-hidden" style={{ background: colors.bg }}>
      <audio ref={audioRef} preload="metadata" />

      <div
        className="pointer-events-none fixed -top-[180px] left-[120px] rounded-full blur-[30px] animate-glow-pulse"
        style={{
          width: 520,
          height: 420,
          background: `radial-gradient(closest-side, ${colors.amber}38, transparent)`,
        }}
      />
      <div
        className="pointer-events-none fixed -bottom-[160px] right-[220px] rounded-full blur-[34px] animate-glow-pulse"
        style={{
          width: 480,
          height: 400,
          background: `radial-gradient(closest-side, ${colors.orchid}33, transparent)`,
          animationDelay: "1.5s",
        }}
      />

      <div className="relative flex flex-1 min-h-0 flex-col lg:grid lg:grid-cols-[248px_minmax(0,1fr)_372px]">
        <Sidebar
          view={view}
          onNavigate={setView}
          playlists={playlists}
          songs={songData}
          onPlayPlaylist={playPlaylist}
        />

        <main
          className="relative flex flex-1 min-h-0 flex-col overflow-y-auto thin-scrollbar p-[18px] lg:p-[30px_34px_26px]"
        >
          <div className="flex-1 min-h-0">
            {view === "listen" && (
              <ListenView
                songs={songData}
                currentId={currentId}
                isPlaying={isPlaying}
                favorites={favorites}
                onPlay={(id) => playSong(id, songData.map((s) => s.id))}
                onPlayAlbum={(ids) => playSong(ids[0], ids)}
                onToggleFavorite={toggleFavorite}
                onSeeAll={() => setView("browse")}
              />
            )}
            {view === "browse" && (
              <BrowseView songs={songData} onPlayAlbum={(ids) => playSong(ids[0], ids)} />
            )}
            {view === "radio" && <RadioView onShuffleAll={shuffleAll} />}
            {view === "library" && (
              <LibraryView
                recentlyPlayed={recentlyPlayed}
                favorites={favoriteSongs}
                currentId={currentId}
                isPlaying={isPlaying}
                favoriteIds={favorites}
                onPlay={(id) => playSong(id, songData.map((s) => s.id))}
                onToggleFavorite={toggleFavorite}
              />
            )}
          </div>
        </main>

        <NowPlayingRail player={player} />
      </div>

      <MiniPlayer player={player} onExpand={() => setIsSheetOpen(true)} />
      <MobileTabBar view={view} onNavigate={setView} />
      <NowPlayingSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} player={player} />
    </div>
  );
}
