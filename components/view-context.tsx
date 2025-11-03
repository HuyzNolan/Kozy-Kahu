"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type ViewMode = "board" | "list"

interface ViewContextType {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

const ViewContext = createContext<ViewContextType | undefined>(undefined)

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("board")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("viewMode") as ViewMode | null
    if (saved) {
      setViewMode(saved)
    }
  }, [])

  const handleSetViewMode = (mode: ViewMode) => {
    setViewMode(mode)
    if (mounted) {
      localStorage.setItem("viewMode", mode)
    }
  }

  return <ViewContext.Provider value={{ viewMode, setViewMode: handleSetViewMode }}>{children}</ViewContext.Provider>
}

export function useView() {
  const context = useContext(ViewContext)
  if (context === undefined) {
    throw new Error("useView must be used within a ViewProvider")
  }
  return context
}
