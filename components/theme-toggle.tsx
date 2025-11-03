"use client"

import { useTheme } from "./theme-provider"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex items-center h-8 w-14 rounded-full bg-muted transition-colors hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background"
      aria-label="Toggle theme"
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-background shadow-md transition-transform duration-300 ${
          theme === "dark" ? "translate-x-7" : "translate-x-1"
        }`}
      />
      
      <span className="absolute left-1.5 text-xs">☀️</span>
      <span className="absolute right-1.5 text-xs">🌙</span>
    </button>
  )
}
