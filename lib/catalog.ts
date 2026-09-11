import { Song } from "@/types/music";
import { albums, AlbumInfo } from "@/data/albums";

export type AlbumGroup = AlbumInfo & {
  name: string;
  artist: string;
  tracks: Song[];
};

export function songsByAlbum(songs: Song[], album: string) {
  return songs.filter((s) => s.album === album);
}

export function parsePlays(plays?: string): number {
  if (!plays) return 0;
  const m = /^([\d.]+)\s*([KM]?)$/i.exec(plays.trim());
  if (!m) return 0;
  const num = parseFloat(m[1]);
  const unit = m[2].toUpperCase();
  const mult = unit === "M" ? 1_000_000 : unit === "K" ? 1_000 : 1;
  return num * mult;
}

export function topPlayed(songs: Song[], n = 5) {
  return [...songs].sort((a, b) => parsePlays(b.plays) - parsePlays(a.plays)).slice(0, n);
}

export function groupByAlbum(songs: Song[]): AlbumGroup[] {
  const order: string[] = [];
  const map = new Map<string, Song[]>();
  for (const song of songs) {
    if (!map.has(song.album)) {
      map.set(song.album, []);
      order.push(song.album);
    }
    map.get(song.album)!.push(song);
  }
  return order.map((name) => {
    const tracks = map.get(name)!;
    const info = albums[name] ?? { year: 0, genre: "", blurb: "" };
    return { ...info, name, artist: tracks[0].artist, tracks };
  });
}
