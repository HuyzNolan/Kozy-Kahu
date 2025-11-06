"use client"

import Image from "next/image"

interface SidebarProps {
  activeTab: "tasks" | "inspiration" | "settings"
  setActiveTab: (tab: "tasks" | "inspiration" | "settings") => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: "tasks", label: "Nhiệm vụ", icon: "✔️" },
    { id: "inspiration", label: "Mẹo", icon: "💡" },
    { id: "settings", label: "Cài đặt", icon: "⚙️" },
  ] as const

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-4">
          <Image
            src="/K HUY 2.jpg"
            alt="Kozy Kahu Logo"
            width={90}
            height={90}
            className="rounded-xl shadow-sm flex-shrink-0"
            priority
          />
          <div className="min-w-0">
            <h1 className="font-bold text-base text-foreground leading-tight">
              Kozy Kahu
            </h1>
            <p className="text-xs text-muted-foreground">
              Trợ lý AI của bạn
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === id
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <span className="text-lg">{icon}</span>
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
