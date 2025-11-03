"use client"

import { useUser } from "./user-context"
import { ThemeToggle } from "./theme-toggle"
import { ViewModeToggle } from "./view-mode-toggle"

export function SettingsView() {
  const { name, setName } = useUser()

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground mb-8">Các cài đặt</h2>

      <div className="space-y-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">👤</span>
            <h3 className="font-semibold text-foreground">Thông tin</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tên hiển thị</label>
              <input
                type="text"
                placeholder="Tên của bạn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                placeholder="abcxyz@gmail.com"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">🎨</span>
            <h3 className="font-semibold text-foreground">Tùy chọn</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground">Chế độ ánh sáng</label>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground">Chế độ xem</label>
              <ViewModeToggle />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">🔔</span>
            <h3 className="font-semibold text-foreground">Thông báo</h3>
          </div>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-foreground">Thông báo nhiệm vụ</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-foreground">Thông báo hàng ngày</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
