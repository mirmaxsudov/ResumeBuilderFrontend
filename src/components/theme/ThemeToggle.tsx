"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import React from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  const resolved = theme === "system" ? systemTheme : theme;
  const isDark = resolved === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

