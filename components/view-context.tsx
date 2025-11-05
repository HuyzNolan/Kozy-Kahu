"use client"

import { createContext, useContext } from "react"

interface ViewContextType {
  viewMode: "board"
}

const ViewContext = createContext<ViewContextType | undefined>(undefined)

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const value: ViewContextType = { viewMode: "board" }

  return (
    <ViewContext.Provider value={value}>
      {children}
    </ViewContext.Provider>
  )
}

export function useView() {
  const context = useContext(ViewContext)
  if (!context) throw new Error("useView must be used within a ViewProvider")
  return context
}
