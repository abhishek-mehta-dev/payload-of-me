"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

function ThemeWatcher({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Use the theme as a key to force re-render/re-mount of children
  // We only do this after mount to avoid hydration mismatch
  // The 'resolvedTheme' correctly handles 'system' by resolving to 'light' or 'dark'
  if (!mounted) return <>{children}</>;

  return (
    <div key={resolvedTheme} className="contents">
      {children}
    </div>
  );
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeWatcher>{children}</ThemeWatcher>
    </NextThemesProvider>
  )
}
