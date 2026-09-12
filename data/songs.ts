import { Song } from "@/types/music";

/**
 * Real audio — long-form retro/classic mixes hosted on Vercel Blob
 * storage (see scripts/upload-audio.mjs). Each file is treated as a
 * single track since no internal chapter timestamps are available to
 * split it further.
 */
const BLOB_BASE = "https://eocmyhuk5nwcahq8.public.blob.vercel-storage.com";

export const songs: Song[] = [
  {
    id: "retro-vintage-souls-1",
    title: "Retro Playlist for Old Vintage Souls, Pt. 1",
    artist: "Tuxl",
    album: "Vintage Soul Radio",
    audioUrl: `${BLOB_BASE}/retro-vintage-souls-1.mp3`,
    duration: 1075,
    plays: "5.1K",
  },
  {
    id: "retro-vintage-souls-2",
    title: "Retro Playlist for Old Vintage Souls, Pt. 2",
    artist: "Tuxl",
    album: "Vintage Soul Radio",
    audioUrl: `${BLOB_BASE}/retro-vintage-souls-2.mp3`,
    duration: 1159,
    plays: "4.3K",
  },
  {
    id: "retro-vintage-souls-3",
    title: "Retro Playlist for Old Vintage Souls, Pt. 3",
    artist: "Tuxl",
    album: "Vintage Soul Radio",
    audioUrl: `${BLOB_BASE}/retro-vintage-souls-3.mp3`,
    duration: 934,
    plays: "3.8K",
  },
  {
    id: "carvaan-dialogue-special",
    title: "Songs With Dialogue Special",
    artist: "Saregama Music",
    album: "Carvaan Weekend Classics",
    audioUrl: `${BLOB_BASE}/carvaan-dialogue-special.mp3`,
    duration: 4117,
    plays: "21K",
  },
  {
    id: "carvaan-90s-special",
    title: "90s Special: Jaadu Teri Nazar",
    artist: "Saregama Music",
    album: "Carvaan Weekend Classics",
    audioUrl: `${BLOB_BASE}/carvaan-90s-special.mp3`,
    duration: 3632,
    plays: "31K",
  },
  {
    id: "carvaan-mukesh-special",
    title: "Legend Mukesh Special",
    artist: "Saregama Music",
    album: "Carvaan Weekend Classics",
    audioUrl: `${BLOB_BASE}/carvaan-mukesh-special.mp3`,
    duration: 3720,
    plays: "17K",
  },
  {
    id: "carvaan-romantic-70s",
    title: "Romantic 70s: Yeh Sham Mastani",
    artist: "Saregama Music",
    album: "Carvaan Weekend Classics",
    audioUrl: `${BLOB_BASE}/carvaan-romantic-70s.mp3`,
    duration: 4101,
    plays: "19K",
  },
  {
    id: "carvaan-salman-khan-romantic",
    title: "Salman Khan Romantic Songs",
    artist: "Saregama Music",
    album: "Carvaan Weekend Classics",
    audioUrl: `${BLOB_BASE}/carvaan-salman-khan-romantic.mp3`,
    duration: 3348,
    plays: "26K",
  },
  {
    id: "carvaan-90s-divas-special",
    title: "90's Divas Special",
    artist: "Saregama Music",
    album: "Carvaan Weekend Classics",
    audioUrl: `${BLOB_BASE}/carvaan-90s-divas-special.mp3`,
    duration: 3467,
    plays: "27K",
  },
  {
    id: "carvaan-amitabh-special",
    title: "Amitabh Bachchan Special",
    artist: "Saregama Music",
    album: "Carvaan Weekend Classics",
    audioUrl: `${BLOB_BASE}/carvaan-amitabh-special.mp3`,
    duration: 3828,
    plays: "23K",
  },
  {
    id: "classic-mashup-reeshabh",
    title: "Classic Old Song Mashup",
    artist: "Reeshabh Purohit",
    album: "Non-Stop Bollywood Mashups",
    audioUrl: `${BLOB_BASE}/classic-mashup-reeshabh.mp3`,
    duration: 674,
    plays: "9.4K",
  },
];

/** The album surfaced on the Listen-now hero. */
export const featuredAlbum: string | null = "Carvaan Weekend Classics";
