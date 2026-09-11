"use client";

import { AnimatePresence, motion } from "framer-motion";
import { albumGradientFor, withAlpha } from "@/lib/theme";

/** The room's atmosphere follows the current album's palette — the whole
 * app is one connected environment, not a stack of separate screens. */
export function AmbientBackground({ album }: { album: string }) {
  const [from, to] = albumGradientFor(album);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(165deg, var(--aurelia-bg), var(--aurelia-bg-elevated))" }}
      />
      <AnimatePresence mode="sync">
        <motion.div
          key={album}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <div
            className="absolute -top-[180px] left-[120px] rounded-full blur-[40px] animate-glow-pulse"
            style={{
              width: 520,
              height: 420,
              background: `radial-gradient(closest-side, ${withAlpha(from, 22)}, transparent)`,
            }}
          />
          <div
            className="absolute -bottom-[160px] right-[220px] rounded-full blur-[44px] animate-glow-pulse"
            style={{
              width: 480,
              height: 400,
              background: `radial-gradient(closest-side, ${withAlpha(to, 20)}, transparent)`,
              animationDelay: "1.5s",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
