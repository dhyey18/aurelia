import { Song } from "@/types/music";

/**
 * The catalog. Empty for now — drop new tracks in here (title, artist,
 * album, a playable audioUrl, and a duration in seconds) to bring the
 * library back.
 */
export const songs: Song[] = [];

/** The album surfaced on the Listen-now hero, if any. */
export const featuredAlbum: string | null = null;
