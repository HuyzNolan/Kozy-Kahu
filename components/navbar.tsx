"use client"

import Image from "next/image"

interface NavbarProps {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}
export function Navbar({ isMobileMenuOpen, setIsMobileMenuOpen }: NavbarProps) {
  return (
    <nav className="border-b border-border bg-card shadow-sm">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/K HUY 2.jpg"
            alt="Kozy Kahu Logo"
            width={120}
            height={120}
            className="rounded-xl shadow-sm"
            priority
          />
          <h1 className="text-xl font-bold text-foreground hidden md:block tracking-tight">
            Kozy Kahu
          </h1>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  )
}
