"use client";

import { colors } from "@/lib/theme";
import type { ViewKey } from "./Sidebar";

const TABS: { key: ViewKey; label: string }[] = [
  { key: "listen", label: "Listen" },
  { key: "browse", label: "Browse" },
  { key: "radio", label: "Radio" },
  { key: "library", label: "Library" },
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
      className="aurelia-hardware flex justify-around lg:hidden"
      style={{
        padding: "8px 10px calc(env(safe-area-inset-bottom, 0px) + 10px)",
        borderTop: `1px solid ${colors.line}`,
        background: colors.bg,
      }}
    >
      {TABS.map((tab) => {
        const active = tab.key === view;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onNavigate(tab.key)}
            aria-current={active}
            className="font-label uppercase flex flex-col items-center gap-1.5"
            style={{
              fontSize: 10,
              letterSpacing: "0.1em",
              color: active ? colors.ink : colors.muted3,
              padding: "2px 10px",
            }}
          >
            <span
              className="rounded-full"
              style={
                active
                  ? { width: 7, height: 7, background: colors.amber }
                  : { width: 7, height: 7, border: `1px solid ${colors.faint}` }
              }
            />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
