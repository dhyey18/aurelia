/**
 * "Midnight Velvet" design tokens — warm black, amber & orchid, glass depth.
 * Colors are oklch() so hue/chroma stay consistent across the whole palette.
 */
export const colors = {
  bg: "oklch(0.15 0.014 65)",
  bgSoft: "oklch(0.17 0.014 65)",
  bgElevated: "oklch(0.19 0.01 70)",
  bgMini: "oklch(0.24 0.02 65 / 0.92)",
  rail: "oklch(0.18 0.016 65 / 0.75)",

  line: "oklch(0.98 0.01 80 / 0.07)",
  lineSoft: "oklch(0.98 0.01 80 / 0.08)",

  ink: "oklch(0.98 0.01 80)",
  ink2: "oklch(0.92 0.01 80)",
  ink3: "oklch(0.8 0.012 78)",
  muted: "oklch(0.68 0.014 78)",
  muted2: "oklch(0.62 0.012 78)",
  muted3: "oklch(0.55 0.012 78)",
  faint: "oklch(0.5 0.011 78)",

  amber: "oklch(0.78 0.14 70)",
  orchid: "oklch(0.78 0.14 330)",
  dark: "oklch(0.17 0.014 65)",
} as const;

/** Per-album gradient identity, kept inside the amber/orchid family for cohesion. */
export const albumGradients: Record<string, [string, string]> = {
  "Golden Era Sessions": ["oklch(0.58 0.16 70)", "oklch(0.4 0.13 330)"],
  "Vintage Soul Radio": ["oklch(0.6 0.15 45)", "oklch(0.42 0.13 15)"],
  "Weekend Classic Collection": ["oklch(0.5 0.14 290)", "oklch(0.38 0.15 330)"],
};

export function albumGradientFor(album: string): [string, string] {
  return albumGradients[album] ?? [colors.amber, colors.orchid];
}
