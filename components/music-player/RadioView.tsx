"use client";

import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";
import { colors } from "@/lib/theme";

export function RadioView({ onShuffleAll }: { onShuffleAll: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <div
        className="flex items-center justify-center rounded-full animate-glow-pulse"
        style={{
          width: 96,
          height: 96,
          background: `radial-gradient(circle, ${colors.amber}33, transparent 70%)`,
        }}
      >
        <Shuffle size={30} color={colors.amber} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-serif" style={{ fontSize: 28, color: colors.ink }}>
          An endless station, tuned to you
        </div>
        <div style={{ fontSize: 14, color: colors.muted2 }}>
          Shuffle the whole library into one continuous mix.
        </div>
      </div>
      <motion.button
        type="button"
        onClick={onShuffleAll}
        whileTap={{ scale: 0.96 }}
        className="rounded-full font-semibold"
        style={{ padding: "13px 26px", background: colors.ink, color: colors.dark, fontSize: 14 }}
      >
        Shuffle all
      </motion.button>
    </div>
  );
}
