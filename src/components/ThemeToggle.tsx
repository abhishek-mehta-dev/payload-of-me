"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      title="Toggle theme"
      className="relative p-2.5 rounded-md border border-line bg-card hover:border-brand transition-colors duration-300"
    >
      <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-brand" />
      <Moon className="absolute inset-0 m-auto h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-brand" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
