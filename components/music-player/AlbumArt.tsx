"use client";

import type { CSSProperties } from "react";
import { albumGradientFor, colors } from "@/lib/theme";

export function AlbumArt({
  album,
  radius = 12,
  shadow = true,
  spinBadge = false,
  isPlaying = false,
  floaty = false,
  className = "",
  style,
}: {
  album: string;
  radius?: number;
  shadow?: boolean;
  spinBadge?: boolean;
  isPlaying?: boolean;
  floaty?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const [from, to] = albumGradientFor(album);

  return (
    <div
      className={`relative overflow-hidden ${floaty ? "animate-float-y" : ""} ${className}`}
      style={{
        borderRadius: radius,
        background: `linear-gradient(135deg, ${from}, ${to})`,
        boxShadow: shadow ? "0 24px 48px -18px oklch(0 0 0 / 0.7)" : undefined,
        ...style,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 9px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, oklch(1 0 0 / 0.14), transparent 55%)",
        }}
      />

      {spinBadge && (
        <div
          className="absolute right-[8%] top-[8%] flex items-center justify-center rounded-full animate-spin-slow"
          style={{
            width: "13%",
            height: "13%",
            minWidth: 24,
            minHeight: 24,
            background: `conic-gradient(oklch(0.98 0.01 80 / 0.4), ${colors.bg} 70%, oklch(0.98 0.01 80 / 0.4))`,
            animationPlayState: isPlaying ? "running" : "paused",
          }}
        >
          <div
            className="rounded-full"
            style={{ width: "30%", height: "30%", background: colors.bg }}
          />
        </div>
      )}
    </div>
  );
}
