"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { colors } from "@/lib/theme";

function readInitialTheme(): "midnight" | "warm" {
  if (typeof document === "undefined") return "midnight";
  return document.documentElement.getAttribute("data-aurelia-theme") === "warm" ? "warm" : "midnight";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"midnight" | "warm">(readInitialTheme);

  const toggle = () => {
    const next = theme === "midnight" ? "warm" : "midnight";
    setTheme(next);
    document.documentElement.setAttribute("data-aurelia-theme", next);
    try {
      localStorage.setItem("aurelia-theme", next);
    } catch {}
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      aria-label={theme === "midnight" ? "Switch to warm mode" : "Switch to midnight mode"}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors ${className}`}
      style={{ border: `1px solid ${colors.line}`, color: colors.muted }}
      suppressHydrationWarning
    >
      {theme === "midnight" ? <Moon size={15} /> : <Sun size={15} />}
    </motion.button>
  );
}
