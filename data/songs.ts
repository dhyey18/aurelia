import { Song } from "@/types/music";

/**
 * Real audio — long-form retro/classic mixes hosted on Vercel Blob
 * storage (see scripts/upload-audio.mjs), since the source files are
 * too large / copyright-sensitive to commit to the git repo. Each
 * file is treated as a single track since no internal chapter
 * timestamps are available to split it further.
 */
const BLOB_BASE = "https://eocmyhuk5nwcahq8.public.blob.vercel-storage.com";

export const songs: Song[] = [
  {
    id: "golden-era-60s-70s",
    title: "60s–70s Golden Era Mix",
    artist: "softy",
    album: "Golden Era Sessions",
    audioUrl: `${BLOB_BASE}/golden-era-60s-70s.mp3`,
    duration: 691,
    plays: "3.2K",
  },
  {
    id: "retro-vintage-souls",
    title: "Retro Playlist for Old Vintage Souls",
    artist: "Tuxl",
    album: "Vintage Soul Radio",
    audioUrl: `${BLOB_BASE}/retro-vintage-souls.mp3`,
    duration: 1075,
    plays: "5.1K",
  },
  {
    id: "weekend-classic-dekha-ek-khwab",
    title: "Dekha Ek Khwab — Weekend Classics",
    artist: "Saregama Music",
    album: "Weekend Classic Collection",
    audioUrl: `${BLOB_BASE}/weekend-classic-dekha-ek-khwab.mp3`,
    duration: 2944,
    plays: "18K",
  },
];

/** The album surfaced on the Listen-now hero. */
export const featuredAlbum = "Weekend Classic Collection";
