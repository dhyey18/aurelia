export type RepeatMode = "off" | "all" | "one";

export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  audioUrl: string;
  duration?: number;
  /** Decorative play-count, e.g. "1.2M" */
  plays?: string;
};

export type Playlist = {
  id: string;
  name: string;
  songIds: string[];
};
