"use client"

export function ViewModeToggle() {
  return (
    <div className="inline-flex items-center gap-1 p-1 bg-muted rounded-lg">
      <button
        disabled
        className="px-3 py-1.5 rounded-md text-sm font-medium bg-primary text-primary-foreground shadow-sm cursor-default"
        aria-label="Board view"
        title="Chế độ bảng"
      >
        ⊞
      </button>
    </div>
  )
}
