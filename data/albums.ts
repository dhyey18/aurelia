export type AlbumInfo = {
  year: number;
  genre: string;
  blurb: string;
};

export const albums: Record<string, AlbumInfo> = {
  "Vintage Soul Radio": {
    year: 2024,
    genre: "Retro soul mix",
    blurb: "A late-night retro set for old vintage souls, in three parts.",
  },
  "Carvaan Weekend Classics": {
    year: 2023,
    genre: "Carvaan radio show",
    blurb: "Saregama's Carvaan radio specials — dialogues, divas, and decades of retro love songs.",
  },
  "Non-Stop Bollywood Mashups": {
    year: 2024,
    genre: "Bollywood mashup",
    blurb: "A peaceful, non-stop mashup of old Bollywood favorites.",
  },
};
