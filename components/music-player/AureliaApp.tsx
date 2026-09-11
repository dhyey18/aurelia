"use client";

import { useState } from "react";
import { LayoutGroup } from "framer-motion";
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
import { AmbientBackground } from "./AmbientBackground";
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
    <LayoutGroup>
      <div
        className="relative flex min-h-dvh flex-col lg:h-dvh lg:overflow-hidden"
        style={{ background: colors.bg }}
      >
        <audio ref={audioRef} preload="metadata" />
        <AmbientBackground album={currentSong.album} />

        <div className="relative flex flex-1 min-h-0 flex-col lg:grid lg:grid-cols-[248px_minmax(0,1fr)_372px]">
          <Sidebar
            view={view}
            onNavigate={setView}
            playlists={playlists}
            songs={songData}
            onPlayPlaylist={playPlaylist}
          />

          <main className="relative flex flex-1 min-h-0 flex-col overflow-y-auto thin-scrollbar p-[18px] lg:p-[36px_40px_28px]">
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
                <BrowseView
                  songs={songData}
                  currentId={currentId}
                  isPlaying={isPlaying}
                  onPlayAlbum={(ids) => playSong(ids[0], ids)}
                />
              )}
              {view === "radio" && (
                <RadioView
                  onShuffleAll={shuffleAll}
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  onTogglePlay={player.togglePlay}
                />
              )}
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

        {!isSheetOpen && <MiniPlayer player={player} onExpand={() => setIsSheetOpen(true)} />}
        <MobileTabBar view={view} onNavigate={setView} />
        <NowPlayingSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} player={player} />
      </div>
    </LayoutGroup>
  );
}
