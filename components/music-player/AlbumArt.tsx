"use client";

import type { CSSProperties } from "react";
import { albumGradientFor, colors, withAlpha } from "@/lib/theme";

const RING_R = 47;
const RING_C = 2 * Math.PI * RING_R;

export function AlbumArt({
  album,
  radius = 20,
  shadow = true,
  spinBadge = false,
  isPlaying = false,
  floaty = false,
  halo = false,
  progress = 0,
  vinylReveal = false,
  className = "",
  style,
}: {
  album: string;
  radius?: number;
  shadow?: boolean;
  spinBadge?: boolean;
  isPlaying?: boolean;
  floaty?: boolean;
  /** Show the "Aurelia Halo" — a progress ring + soft glow around the art. */
  halo?: boolean;
  /** 0–1 playback position, drives the halo ring. */
  progress?: number;
  /** Reveal a vinyl disc sliding out from behind the art on hover (wrap in a `.group`). */
  vinylReveal?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const [from, to] = albumGradientFor(album);
  const dash = Math.min(1, Math.max(0, progress)) * RING_C;

  return (
    <div
      className={`relative ${floaty ? "animate-float-y" : ""} ${className}`}
      style={style}
    >
      {halo && (
        <div
          className={`pointer-events-none absolute -inset-[10%] rounded-full ${
            isPlaying ? "animate-halo-breathe" : ""
          }`}
          style={{
            background: `radial-gradient(circle, ${withAlpha(from, 32)}, transparent 68%)`,
            opacity: isPlaying ? undefined : 0.35,
            transition: "opacity 0.6s ease",
          }}
        />
      )}

      {vinylReveal && (
        <div
          className="vinyl-reveal pointer-events-none absolute inset-0 -z-10 rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 35%, oklch(0.3 0.01 60), oklch(0.08 0.005 60) 70%)`,
            boxShadow: "inset 0 0 0 10px oklch(0.05 0 0 / 0.4)",
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: "18%",
              height: "18%",
              transform: "translate(-50%, -50%)",
              background: from,
            }}
          />
        </div>
      )}

      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: radius,
          background: `linear-gradient(135deg, ${from}, ${to})`,
          boxShadow: shadow ? "0 20px 40px -16px oklch(0.2 0.03 50 / 0.55)" : undefined,
          width: "100%",
          height: "100%",
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
            background: "radial-gradient(circle at 30% 20%, oklch(1 0 0 / 0.16), transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.14)" }}
        />

        {spinBadge && (
          <div
            className="absolute right-[8%] top-[8%] flex items-center justify-center rounded-full animate-spin-slow"
            style={{
              width: "13%",
              height: "13%",
              minWidth: 24,
              minHeight: 24,
              background: `conic-gradient(oklch(0.98 0.01 80 / 0.4), ${colors.dark} 70%, oklch(0.98 0.01 80 / 0.4))`,
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          >
            <div
              className="rounded-full"
              style={{ width: "30%", height: "30%", background: colors.dark }}
            />
          </div>
        )}
      </div>

      {halo && (
        <svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute -inset-[4%]"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="50"
            cy="50"
            r={RING_R}
            fill="none"
            stroke={withAlpha(colors.ink, 10)}
            strokeWidth="1.4"
          />
          <circle
            cx="50"
            cy="50"
            r={RING_R}
            fill="none"
            stroke={from}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${RING_C}`}
            style={{ transition: "stroke-dasharray 0.2s linear" }}
          />
        </svg>
      )}
    </div>
  );
}
