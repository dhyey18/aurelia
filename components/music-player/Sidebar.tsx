"use client";

import { motion } from "framer-motion";
import { Playlist, Song } from "@/types/music";
import { colors, withAlpha } from "@/lib/theme";
import { songListMeta } from "@/lib/format";
import { AlbumArt } from "./AlbumArt";
import { ThemeToggle } from "./ThemeToggle";

export type ViewKey = "listen" | "browse" | "radio" | "library";

const NAV: { key: ViewKey; label: string }[] = [
  { key: "listen", label: "Listen now" },
  { key: "browse", label: "Browse" },
  { key: "radio", label: "Radio" },
  { key: "library", label: "Your library" },
];

export function Sidebar({
  view,
  onNavigate,
  playlists,
  songs,
  onPlayPlaylist,
}: {
  view: ViewKey;
  onNavigate: (v: ViewKey) => void;
  playlists: Playlist[];
  songs: Song[];
  onPlayPlaylist: (playlist: Playlist) => void;
}) {
  return (
    <aside
      className="aurelia-hardware relative hidden lg:flex flex-col gap-[22px] min-h-0"
      style={{ padding: "26px 22px", borderRight: `1px solid ${colors.line}`, background: colors.bg }}
    >
      <div className="flex items-center gap-[11px]">
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 30,
            height: 30,
            background: `conic-gradient(from 200deg, ${colors.amber}, ${colors.orchid}, ${colors.amber})`,
          }}
        >
          <div className="rounded-full" style={{ width: 9, height: 9, background: colors.bg }} />
        </div>
        <div
          className="font-serif"
          style={{ fontSize: 23, letterSpacing: "0.02em", color: colors.ink }}
        >
          Aurelia
        </div>
      </div>

      <nav className="flex flex-col gap-[3px]">
        {NAV.map((item) => {
          const active = item.key === view;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              aria-current={active}
              className="relative flex items-center gap-3 rounded-[11px] text-left transition-colors"
              style={{
                padding: "10px 12px",
                color: active ? colors.ink : colors.muted,
                fontSize: 14.5,
                fontWeight: active ? 500 : 400,
              }}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-nav-pill"
                  className="absolute inset-0 rounded-[11px]"
                  style={{ background: colors.lineSoft }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span
                className="relative rounded-full shrink-0"
                style={
                  active
                    ? { width: 7, height: 7, background: colors.amber, boxShadow: `0 0 8px ${colors.amber}` }
                    : { width: 7, height: 7, border: `1px solid ${colors.faint}` }
                }
              />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col gap-[13px] min-h-0 overflow-y-auto thin-scrollbar">
        <div
          className="font-label uppercase shrink-0"
          style={{ fontSize: 10, letterSpacing: "0.2em", color: colors.muted3 }}
        >
          Playlists
        </div>
        {playlists.map((playlist) => {
          const tracks = playlist.songIds
            .map((id) => songs.find((s) => s.id === id))
            .filter(Boolean) as Song[];
          return (
            <button
              key={playlist.id}
              type="button"
              onClick={() => onPlayPlaylist(playlist)}
              className="flex items-center gap-[11px] rounded-[9px] text-left transition-transform hover:scale-[1.02]"
              style={{ padding: "6px 4px" }}
            >
              <AlbumArt
                album={tracks[0]?.album ?? ""}
                shadow={false}
                className="shrink-0"
                style={{ width: 34, height: 34 }}
              />
              <div className="min-w-0">
                <div
                  className="truncate"
                  style={{ fontSize: 13.5, color: colors.ink3 }}
                >
                  {playlist.name}
                </div>
                <div className="truncate" style={{ fontSize: 11.5, color: colors.muted3 }}>
                  {songListMeta(tracks)}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div
        className="mt-auto flex items-center gap-2.5 rounded-[16px] shrink-0"
        style={{
          padding: 14,
          border: `1px solid ${colors.lineSoft}`,
          background: withAlpha(colors.ink, 3),
        }}
      >
        <div style={{ fontSize: 12.5, color: colors.ink3, lineHeight: 1.5, flex: 1 }}>
          Lossless enabled — 24-bit / 96 kHz on this device.
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
}
