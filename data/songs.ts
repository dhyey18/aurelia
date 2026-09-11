import { Song } from "@/types/music";

/**
 * Mock catalog. `audioUrl` points at public demo tracks so playback works
 * out of the box — swap them for real hosted files whenever you like, the
 * rest of the app only depends on this shape. `duration` is the real
 * duration of each demo file (in seconds).
 */
export const songs: Song[] = [
  {
    id: "slow-reveal",
    title: "Slow Reveal",
    artist: "Neon Atlas",
    album: "Halcyon Drift",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: 373,
    plays: "1.2M",
  },
  {
    id: "paper-lanterns",
    title: "Paper Lanterns",
    artist: "Mimi Okonjo",
    album: "Soft Machinery",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: 426,
    plays: "834K",
  },
  {
    id: "velvet-static",
    title: "Velvet Static",
    artist: "The Hourglass Set",
    album: "Nocturne Club",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: 344,
    plays: "2.4M",
  },
  {
    id: "cold-room-warm-light",
    title: "Cold Room, Warm Light",
    artist: "Auberge",
    album: "Fieldnotes",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: 303,
    plays: "417K",
  },
  {
    id: "tidewater",
    title: "Tidewater",
    artist: "Sable Youth",
    album: "Longshore",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: 354,
    plays: "1.9M",
  },
  {
    id: "second-language",
    title: "Second Language",
    artist: "Kaveh Rahimi",
    album: "Between Rooms",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: 280,
    plays: "612K",
  },
  {
    id: "everything-analog",
    title: "Everything Analog",
    artist: "Neon Atlas",
    album: "Halcyon Drift",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    duration: 421,
    plays: "940K",
  },
  {
    id: "afterglow",
    title: "Afterglow",
    artist: "Mimi Okonjo",
    album: "Soft Machinery",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    duration: 325,
    plays: "1.1M",
  },
  {
    id: "glass-horizon",
    title: "Glass Horizon",
    artist: "The Hourglass Set",
    album: "Nocturne Club",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    duration: 389,
    plays: "705K",
  },
  {
    id: "nightbloom",
    title: "Nightbloom",
    artist: "Sable Youth",
    album: "Longshore",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    duration: 527,
    plays: "358K",
  },
];

/** The album surfaced on the Listen-now hero. */
export const featuredAlbum = "Halcyon Drift";
