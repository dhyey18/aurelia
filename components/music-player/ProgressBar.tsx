"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { colors, withAlpha } from "@/lib/theme";
import { formatTime } from "@/lib/format";

export function ProgressBar({
  currentTime,
  duration,
  onSeek,
}: {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragRatio, setDragRatio] = useState(0);

  const ratio = duration > 0 ? currentTime / duration : 0;
  const displayRatio = isDragging ? dragRatio : ratio;
  const remaining = Math.max(0, duration - (isDragging ? dragRatio * duration : currentTime));

  const ratioFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      setDragRatio(ratioFromClientX(e.clientX));
    },
    [ratioFromClientX]
  );

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e: PointerEvent) => setDragRatio(ratioFromClientX(e.clientX));
    const handleUp = (e: PointerEvent) => {
      const r = ratioFromClientX(e.clientX);
      onSeek(r * duration);
      setIsDragging(false);
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [isDragging, ratioFromClientX, onSeek, duration]);

  return (
    <div className="flex flex-col gap-2 w-full select-none">
      <div
        ref={trackRef}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(currentTime)}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") onSeek(Math.min(duration, currentTime + 5));
          if (e.key === "ArrowLeft") onSeek(Math.max(0, currentTime - 5));
        }}
        className="group relative flex h-4 w-full cursor-pointer items-center"
      >
        <div
          className="relative w-full rounded-full"
          style={{ height: 4, background: withAlpha(colors.ink, 14) }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${displayRatio * 100}%`,
              background: `linear-gradient(to right, ${colors.amber}, ${colors.orchid})`,
              boxShadow: `0 0 10px ${withAlpha(colors.amber, 55)}`,
              transition: isDragging ? "none" : "width 0.1s linear",
            }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full transition-opacity"
            style={{
              left: `${displayRatio * 100}%`,
              width: 12,
              height: 12,
              background: colors.ink,
              boxShadow: `0 0 0 2px ${withAlpha(colors.dark, 40)}, 0 0 14px ${colors.amber}`,
              opacity: isDragging ? 1 : undefined,
            }}
          />
        </div>
      </div>
      <div
        className="flex justify-between text-[11.5px]"
        style={{ color: colors.muted2, fontVariantNumeric: "tabular-nums" }}
      >
        <span>{formatTime(isDragging ? dragRatio * duration : currentTime)}</span>
        <span>-{formatTime(remaining)}</span>
      </div>
    </div>
  );
}
