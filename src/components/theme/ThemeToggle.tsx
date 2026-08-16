"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200",
        "border border-border bg-card text-muted hover:text-card-foreground hover:bg-primary/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
