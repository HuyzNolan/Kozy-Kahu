"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (task: {
    title: string
    description?: string
    dueDate: string
    priority: "low" | "medium" | "high"
  }) => void
}

const getQuickDate = (preset: string): string => {
  const today = new Date()
  const date = new Date(today)

  switch (preset) {
    case "today":
      break
    case "tomorrow":
      date.setDate(date.getDate() + 1)
      break
    case "next-week":
      date.setDate(date.getDate() + 7)
      break
    case "next-month":
      date.setMonth(date.getMonth() + 1)
      break
    case "in-3-days":
      date.setDate(date.getDate() + 3)
      break
    default:
      break
  }

  return date.toISOString().split("T")[0]
}

export function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !dueDate) return

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate,
      priority,
    })

    setTitle("")
    setDescription("")
    setDueDate("")
    setPriority("medium")
  }

  const handleQuickDate = (preset: string) => {
    setDueDate(getQuickDate(preset))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Thêm nhiệm vụ mới</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors text-lg">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tên nhiệm vụ *</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Bạn cần làm gì?"
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Thêm chi tiết (không bắt buộc)"
              className="w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Ngày hết hạn *</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full mb-3"
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDate("today")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  dueDate === getQuickDate("today")
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Hôm nay
              </button>
              <button
                type="button"
                onClick={() => handleQuickDate("tomorrow")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  dueDate === getQuickDate("tomorrow")
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Ngày mai
              </button>
              <button
                type="button"
                onClick={() => handleQuickDate("in-3-days")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  dueDate === getQuickDate("in-3-days")
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Sau 3 ngày
              </button>
              <button
                type="button"
                onClick={() => handleQuickDate("next-week")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  dueDate === getQuickDate("next-week")
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Tuần sau
              </button>
              <button
                type="button"
                onClick={() => handleQuickDate("next-month")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all col-span-2 ${
                  dueDate === getQuickDate("next-month")
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Tháng sau
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mức độ quan trọng</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
              className="w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Thấp</option>
              <option value="medium">Trung bình</option>
              <option value="high">Cao</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
            >
              Thêm nhiệm vụ
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
