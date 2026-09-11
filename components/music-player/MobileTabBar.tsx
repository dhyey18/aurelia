"use client";

import { Home, Compass, Radio as RadioIcon, LibraryBig } from "lucide-react";
import { colors } from "@/lib/theme";
import type { ViewKey } from "./Sidebar";

const TABS: { key: ViewKey; label: string; icon: typeof Home }[] = [
  { key: "listen", label: "Listen", icon: Home },
  { key: "browse", label: "Browse", icon: Compass },
  { key: "radio", label: "Radio", icon: RadioIcon },
  { key: "library", label: "Library", icon: LibraryBig },
];

export function MobileTabBar({
  view,
  onNavigate,
}: {
  view: ViewKey;
  onNavigate: (v: ViewKey) => void;
}) {
  return (
    <nav
      className="aurelia-hardware flex justify-around items-center lg:hidden mx-3.5 rounded-full"
      style={{
        marginBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
        padding: "8px 12px",
        background: colors.bg,
        boxShadow: "0 16px 30px -14px oklch(0 0 0 / 0.5)",
      }}
    >
      {TABS.map((tab) => {
        const active = tab.key === view;
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onNavigate(tab.key)}
            aria-current={active}
            aria-label={tab.label}
            className="flex flex-col items-center gap-1"
            style={{ padding: "4px 14px" }}
          >
            <span
              className="flex items-center justify-center rounded-full transition-all"
              style={{
                width: 34,
                height: 34,
                background: active ? colors.amber : "transparent",
              }}
            >
              <Icon size={17} color={active ? colors.dark : colors.muted3} strokeWidth={2} />
            </span>
            <span
              className="font-label uppercase"
              style={{ fontSize: 8.5, letterSpacing: "0.08em", color: active ? colors.ink : colors.muted3 }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
