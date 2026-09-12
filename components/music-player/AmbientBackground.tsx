"use client";

import { AnimatePresence, motion } from "framer-motion";
import { albumGradientFor, colors, withAlpha } from "@/lib/theme";

/** The room's atmosphere follows the current album's palette — the whole
 * app is one connected environment, not a stack of separate screens. */
export function AmbientBackground({ album }: { album: string | null }) {
  const [from, to] = album ? albumGradientFor(album) : [colors.amber, colors.orchid];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(165deg, var(--aurelia-bg), var(--aurelia-bg-elevated))" }}
      />
      <AnimatePresence mode="sync">
        <motion.div
          key={album ?? "none"}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <div
            className="absolute -top-[180px] left-[120px] rounded-full blur-[50px] animate-glow-pulse animate-drift-glow"
            style={{
              width: 560,
              height: 460,
              background: `radial-gradient(closest-side, ${withAlpha(from, 28)}, transparent)`,
            }}
          />
          <div
            className="absolute -bottom-[160px] right-[220px] rounded-full blur-[54px] animate-glow-pulse animate-drift-glow"
            style={{
              width: 520,
              height: 440,
              background: `radial-gradient(closest-side, ${withAlpha(to, 26)}, transparent)`,
              animationDelay: "1.5s",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px] animate-drift-glow"
            style={{
              width: 700,
              height: 700,
              background: `radial-gradient(closest-side, ${withAlpha(from, 8)}, transparent)`,
              animationDelay: "4s",
              animationDuration: "26s",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
