/**
 * Aurelia design tokens.
 *
 * Two layers:
 *  - "canvas" tokens (--aurelia-*) are theme-reactive — they flip between
 *    Midnight (warm-black) and Warm (ivory/parchment) via a
 *    `data-aurelia-theme` attribute on <html>.
 *  - Sidebar / Now Playing rail / mini player / mobile sheet are the
 *    "instrument panel": always dark, in both themes, via the
 *    `.aurelia-hardware` class which re-pins the same variable names
 *    locally. Components below never need to know which surface
 *    they're on — the CSS cascade resolves it.
 */
export const colors = {
  bg: "var(--aurelia-bg)",
  bgElevated: "var(--aurelia-bg-elevated)",
  surface: "var(--aurelia-surface)",
  rail: "var(--aurelia-rail)",
  bgMini: "var(--aurelia-mini)",

  line: "var(--aurelia-border)",
  lineSoft: "var(--aurelia-border-soft)",

  ink: "var(--aurelia-ink)",
  ink2: "var(--aurelia-ink-2)",
  ink3: "var(--aurelia-ink-3)",
  muted: "var(--aurelia-muted)",
  muted2: "var(--aurelia-muted-2)",
  muted3: "var(--aurelia-muted-3)",
  faint: "var(--aurelia-faint)",

  amber: "var(--aurelia-amber)",
  orchid: "var(--aurelia-orchid)",
  accent: "var(--aurelia-accent)",
  rose: "var(--aurelia-rose)",
  dark: "var(--aurelia-dark)",
} as const;

/** Alpha-blend a token/color toward transparent — use instead of hex-suffix hacks. */
export function withAlpha(color: string, percent: number) {
  return `color-mix(in oklch, ${color} ${percent}%, transparent)`;
}

/** Blend two colors together (e.g. crossfading an album's two accent hues). */
export function mixColor(a: string, b: string, percent = 50) {
  return `color-mix(in oklch, ${a} ${percent}%, ${b})`;
}

/** Per-album gradient identity, kept inside the amber/orchid family for cohesion. */
export const albumGradients: Record<string, [string, string]> = {
  "Golden Era Sessions": ["oklch(0.58 0.16 70)", "oklch(0.4 0.13 330)"],
  "Vintage Soul Radio": ["oklch(0.6 0.15 45)", "oklch(0.42 0.13 15)"],
  "Weekend Classic Collection": ["oklch(0.5 0.14 290)", "oklch(0.38 0.15 330)"],
};

export function albumGradientFor(album: string): [string, string] {
  return albumGradients[album] ?? [colors.amber, colors.orchid];
}

/** Radii scale used consistently across the app (see design brief). */
export const radii = {
  artwork: 26,
  card: 26,
  hero: 34,
  panel: 30,
  pill: 999,
};
