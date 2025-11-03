"use client"

import { useView } from "./view-context"

export function ViewModeToggle() {
  const { viewMode, setViewMode } = useView()

  return (
    <div className="inline-flex items-center gap-1 p-1 bg-muted rounded-lg">
      <button
        onClick={() => setViewMode("board")}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          viewMode === "board"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Board view"
        title="Bảng"
      >
        ⊞
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          viewMode === "list"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="List view"
        title="Danh sách"
      >
        ≡
      </button>
    </div>
  )
}
