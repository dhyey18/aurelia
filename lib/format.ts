import { Song } from "@/types/music";

export function formatTime(seconds?: number) {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatDurationLong(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.round((totalSeconds % 3600) / 60);
  if (h > 0) return `${h}h ${m.toString().padStart(2, "0")}m`;
  return `${m}m`;
}

export function songListMeta(songs: Song[]) {
  const total = songs.reduce((sum, s) => sum + (s.duration ?? 0), 0);
  return `${trackCount(songs.length)} · ${formatDurationLong(total)}`;
}

export function trackCount(n: number) {
  return `${n} ${n === 1 ? "track" : "tracks"}`;
}
