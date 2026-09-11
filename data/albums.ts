export type AlbumInfo = {
  year: number;
  genre: string;
  blurb: string;
};

export const albums: Record<string, AlbumInfo> = {
  "Golden Era Sessions": {
    year: 2024,
    genre: "60s–70s mix",
    blurb: "An hour of golden-era favorites, mixed for slow evenings.",
  },
  "Vintage Soul Radio": {
    year: 2024,
    genre: "Retro soul mix",
    blurb: "A late-night retro set for old vintage souls.",
  },
  "Weekend Classic Collection": {
    year: 2023,
    genre: "Bollywood classics jukebox",
    blurb: "Saregama's weekend jukebox, built around Dekha Ek Khwab.",
  },
  "Carvaan Weekend Classics": {
    year: 2023,
    genre: "Carvaan radio show",
    blurb: "Saregama's Carvaan radio specials — Khans, divas, and decades of retro love songs.",
  },
};
