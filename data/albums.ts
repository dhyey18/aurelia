export type AlbumInfo = {
  year: number;
  genre: string;
  blurb: string;
};

export const albums: Record<string, AlbumInfo> = {
  "Halcyon Drift": {
    year: 2026,
    genre: "Dream pop",
    blurb:
      "Neon Atlas' fourth record trades synth haze for open air — tracked to tape in a converted chapel.",
  },
  "Soft Machinery": {
    year: 2025,
    genre: "Bedroom soul",
    blurb: "Mimi Okonjo's home-recorded answer to a loud year.",
  },
  "Nocturne Club": {
    year: 2024,
    genre: "Cold wave",
    blurb: "The Hourglass Set, live off the floor at 2am.",
  },
  Fieldnotes: {
    year: 2025,
    genre: "Ambient folk",
    blurb: "Auberge's diary set to tape hiss and open tunings.",
  },
  Longshore: {
    year: 2023,
    genre: "Slowcore",
    blurb: "Sable Youth, recorded across three coastal winters.",
  },
  "Between Rooms": {
    year: 2026,
    genre: "Art pop",
    blurb: "Kaveh Rahimi's most unguarded record yet.",
  },
};
