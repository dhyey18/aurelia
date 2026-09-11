"use client";

import type { CSSProperties } from "react";
import { albumGradientFor, colors, withAlpha } from "@/lib/theme";

const RING_R = 47;
const RING_C = 2 * Math.PI * RING_R;

function VinylDisc({
  from,
  to,
  isPlaying,
  className = "",
  style,
}: {
  from: string;
  to: string;
  isPlaying: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`relative rounded-full ${className}`}
      style={{
        background:
          "radial-gradient(circle at 32% 28%, oklch(0.32 0.006 60), oklch(0.07 0.004 60) 78%)",
        boxShadow: "inset 0 0 0 1px oklch(1 0 0 / 0.08), 0 10px 22px -12px oklch(0 0 0 / 0.6)",
        ...style,
      }}
    >
      <div
        className="absolute inset-[6%] rounded-full animate-spin-slow"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle, oklch(1 0 0 / 0.05) 0px, oklch(1 0 0 / 0.05) 1px, transparent 1px, transparent 4.5%)",
          animationPlayState: isPlaying ? "running" : "paused",
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            inset: "31%",
            background: `conic-gradient(from 0deg, ${from}, ${to}, ${from})`,
            boxShadow: "inset 0 0 0 1px oklch(0 0 0 / 0.35)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            inset: "47%",
            background: "oklch(0.1 0.004 60)",
            boxShadow: "inset 0 1px 1px oklch(1 0 0 / 0.15)",
          }}
        />
      </div>
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle at 30% 22%, oklch(1 0 0 / 0.14), transparent 50%)" }}
      />
    </div>
  );
}

export function AlbumArt({
  album,
  radius = 20,
  shadow = true,
  shape = "disc",
  isPlaying = false,
  floaty = false,
  halo = false,
  progress = 0,
  className = "",
  style,
}: {
  album: string;
  radius?: number;
  shadow?: boolean;
  /** "disc" — a plain vinyl record (lists, grids, badges). "sleeve" — a square
   * album sleeve with a spinning vinyl permanently peeking out behind it. */
  shape?: "disc" | "sleeve";
  isPlaying?: boolean;
  floaty?: boolean;
  /** Show the "Aurelia Halo" — a progress ring + soft glow around the art. */
  halo?: boolean;
  /** 0–1 playback position, drives the halo ring. */
  progress?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const [from, to] = albumGradientFor(album);
  const dash = Math.min(1, Math.max(0, progress)) * RING_C;

  if (shape === "disc") {
    return (
      <div className={`relative ${floaty ? "animate-float-y" : ""} ${className}`} style={style}>
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
        <VinylDisc
          from={from}
          to={to}
          isPlaying={isPlaying}
          className="h-full w-full"
          style={{ boxShadow: shadow ? "0 10px 22px -10px oklch(0 0 0 / 0.55)" : undefined }}
        />
        {halo && (
          <svg viewBox="0 0 100 100" className="pointer-events-none absolute -inset-[4%]" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="50" cy="50" r={RING_R} fill="none" stroke={withAlpha(colors.ink, 10)} strokeWidth="1.4" />
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

  return (
    <div className={`relative ${floaty ? "animate-float-y" : ""} ${className}`} style={style}>
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

      <VinylDisc
        from={from}
        to={to}
        isPlaying={isPlaying}
        className="absolute inset-0 -z-10"
        style={{ transform: "translateX(18%)" }}
      />

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
        <div className="absolute inset-0" style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.14)" }} />
      </div>

      {halo && (
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute -inset-[4%]" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="50" cy="50" r={RING_R} fill="none" stroke={withAlpha(colors.ink, 10)} strokeWidth="1.4" />
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
