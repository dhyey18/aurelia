"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { colors, withAlpha } from "@/lib/theme";

export function EmptyState({
  icon: Icon,
  title,
  subtitle,
  cta,
  onCta,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  cta?: string;
  onCta?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-[22px] text-center ${className}`}
      style={{
        padding: "30px 20px",
        border: `1px dashed ${colors.line}`,
        background: withAlpha(colors.ink, 3),
      }}
    >
      <span
        className="flex items-center justify-center rounded-full"
        style={{ width: 44, height: 44, background: colors.surface, border: `1px solid ${colors.line}` }}
      >
        <Icon size={18} color={colors.muted2} strokeWidth={1.75} />
      </span>
      <div style={{ fontSize: 14, color: colors.ink3 }}>{title}</div>
      <p style={{ fontSize: 12.5, color: colors.muted, maxWidth: 280 }}>{subtitle}</p>
      {cta && onCta && (
        <motion.button
          type="button"
          onClick={onCta}
          whileTap={{ scale: 0.96 }}
          className="rounded-full font-semibold"
          style={{ padding: "9px 18px", background: colors.ink, color: colors.dark, fontSize: 12.5 }}
        >
          {cta}
        </motion.button>
      )}
    </div>
  );
}
