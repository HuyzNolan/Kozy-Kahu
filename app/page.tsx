"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { TasksView } from "@/components/tasks-view"
import { InspirationView } from "@/components/inspiration-view"
import { SettingsView } from "@/components/settings-view"
import { UserProvider } from "@/components/user-context"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"tasks" | "inspiration" | "settings">("tasks")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <UserProvider>
      <div className="flex h-screen bg-background">
        <div className="hidden md:block">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

          <main className="flex-1 overflow-auto">
            {activeTab === "tasks" && <TasksView />}
            {activeTab === "inspiration" && <InspirationView />}
            {activeTab === "settings" && <SettingsView />}
          </main>

          <div className="md:hidden border-t border-border bg-card">
            <div className="flex justify-around">
              <button
                onClick={() => setActiveTab("tasks")}
                className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                  activeTab === "tasks" ? "text-primary border-t-2 border-primary" : "text-muted-foreground"
                }`}
              >
                Các nhiệm vụ
              </button>
              <button
                onClick={() => setActiveTab("inspiration")}
                className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                  activeTab === "inspiration" ? "text-primary border-t-2 border-primary" : "text-muted-foreground"
                }`}
              >
                Mẹo
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                  activeTab === "settings" ? "text-primary border-t-2 border-primary" : "text-muted-foreground"
                }`}
              >
                Cài đặt
              </button>
            </div>
          </div>
        </div>
      </div>
    </UserProvider>
  )
}
