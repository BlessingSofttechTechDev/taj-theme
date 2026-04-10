"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const themes = [
  { id: "theme-1", label: "01", name: "Royal Heritage", color: "#8B6914" },
  { id: "theme-2", label: "02", name: "Into the Wild", color: "#2D5016" },
  { id: "theme-3", label: "03", name: "Modern Elegance", color: "#D4C5A9" },
];

export default function ThemeSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isThemePage = pathname.startsWith("/theme-");
  if (!isThemePage) return null;

  const currentTheme = themes.find((t) => pathname === `/${t.id}`);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center hover:border-white/40 transition-all duration-300 shadow-lg"
        title="Switch theme"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`text-white/80 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>

      {/* Theme options */}
      <div
        className={`flex flex-col gap-2 transition-all duration-500 ${
          isOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        {themes.map((theme) => {
          const isActive = currentTheme?.id === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => {
                router.push(`/${theme.id}`);
                setIsOpen(false);
              }}
              className={`group flex items-center gap-3 pl-4 pr-3 py-2 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg ${
                isActive
                  ? "bg-white/15 border-white/30"
                  : "bg-black/50 border-white/10 hover:border-white/25 hover:bg-black/60"
              }`}
            >
              <span className="text-white/60 text-[10px] tracking-widest font-[family-name:var(--font-body)]">
                {theme.label}
              </span>
              <span className="text-white/90 text-xs tracking-wide font-[family-name:var(--font-body)] whitespace-nowrap">
                {theme.name}
              </span>
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 ring-1 ring-white/20"
                style={{ backgroundColor: theme.color }}
              />
            </button>
          );
        })}

        {/* Back to all themes */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 pl-4 pr-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:border-white/25 hover:bg-black/60 transition-all duration-300 shadow-lg"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white/60"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span className="text-white/70 text-xs tracking-wide font-[family-name:var(--font-body)] whitespace-nowrap">
            All Themes
          </span>
        </button>
      </div>
    </div>
  );
}
