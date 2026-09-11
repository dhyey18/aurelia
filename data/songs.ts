import { Song } from "@/types/music";

/**
 * Real local audio — long-form retro/classic mixes served from
 * public/audio/. Each file is treated as a single track since no
 * internal chapter timestamps are available to split it further.
 */
export const songs: Song[] = [
  {
    id: "golden-era-60s-70s",
    title: "60s–70s Golden Era Mix",
    artist: "softy",
    album: "Golden Era Sessions",
    audioUrl: "/audio/golden-era-60s-70s.mp3",
    duration: 691,
    plays: "3.2K",
  },
  {
    id: "retro-vintage-souls",
    title: "Retro Playlist for Old Vintage Souls",
    artist: "Tuxl",
    album: "Vintage Soul Radio",
    audioUrl: "/audio/retro-vintage-souls.mp3",
    duration: 1075,
    plays: "5.1K",
  },
  {
    id: "weekend-classic-dekha-ek-khwab",
    title: "Dekha Ek Khwab — Weekend Classics",
    artist: "Saregama Music",
    album: "Weekend Classic Collection",
    audioUrl: "/audio/weekend-classic-dekha-ek-khwab.mp3",
    duration: 2944,
    plays: "18K",
  },
];

/** The album surfaced on the Listen-now hero. */
export const featuredAlbum = "Weekend Classic Collection";
