"use client"

import { useState } from "react"
import  AIChatModal  from "./ai-chat-modal"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"

interface Task {
  id: string
  title: string
  description?: string
  dueDate: string
  priority: "low" | "medium" | "high"
  completed: boolean
}

interface TaskCardProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updatedTask: Partial<Task>) => void
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
    case "low":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getDaysRemaining = (dueDate: string) => {
  const today = new Date()
  const due = new Date(dueDate)
  const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (diff < 0) return "Quá hạn"
  if (diff === 0) return "Hạn thực hiện: Hôm nay"
  if (diff === 1) return "Hạn thực hiện: Ngày mai"
  return `Hạn thực hiện: ${diff} ngày`
}

export function TaskCard({ task, onToggle, onDelete, onUpdate }: TaskCardProps) {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || "")
  const [editPriority, setEditPriority] = useState(task.priority)
  const [editDueDate, setEditDueDate] = useState(task.dueDate)

  const handleDeleteConfirm = () => {
    onDelete(task.id)
    setIsDeleteDialogOpen(false)
  }

  const handleSaveEdit = () => {
    onUpdate(task.id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      dueDate: editDueDate,
    })
    setIsEditMode(false)
  }

  const handleCancelEdit = () => {
    setEditTitle(task.title)
    setEditDescription(task.description || "")
    setEditPriority(task.priority)
    setEditDueDate(task.dueDate)
    setIsEditMode(false)
  }

  if (isEditMode) {
    return (
      <div className="bg-card border-2 border-primary/40 rounded-2xl p-4 md:p-6 shadow-md transition-all">
        
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">Tên nhiệm vụ</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-input border border-border rounded-xl px-4 py-2.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm md:text-base"
              placeholder="Tên nhiệm vụ"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">Mô tả (không bắt buộc)</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full bg-input border border-border rounded-xl px-4 py-2.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-sm md:text-base"
              placeholder="Thêm mô tả (không bắt buộc)"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">Mức độ quan trọng</label>
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as "low" | "medium" | "high")}
                className="w-full bg-input border border-border rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm md:text-base"
              >
                <option value="low">Thấp</option>
                <option value="medium">Trung bình</option>
                <option value="high">Cao</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">Ngày hết hạn</label>
              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="w-full bg-input border border-border rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm md:text-base"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <button
              onClick={handleSaveEdit}
              className="flex-1 bg-gradient-to-r from-primary to-accent text-white font-semibold py-2.5 md:py-3 rounded-xl hover:opacity-90 transition-opacity text-sm md:text-base"
            >
              ✓ Lưu thay đổi
            </button>
            <button
              onClick={handleCancelEdit}
              className="flex-1 bg-muted text-foreground font-semibold py-2.5 md:py-3 rounded-xl hover:bg-muted/80 transition-colors text-sm md:text-base"
            >
              ✕ Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className={`bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow ${
          task.completed ? "opacity-60" : ""
        }`}
      >
        <div className="flex items-start gap-3 mb-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="w-5 h-5 rounded-full border-2 border-primary cursor-pointer mt-1 accent-primary flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-foreground ${task.completed ? "line-through text-muted-foreground" : ""}`}
            >
              {task.title}
            </h3>
            {task.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <span className="text-xs text-muted-foreground">{getDaysRemaining(task.dueDate)}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsAIChatOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white text-sm font-medium py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            ⚡Trợ lý AI
          </button>
          <button
            onClick={() => setIsEditMode(true)}
            className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
            title="Chỉnh sửa nhiệm vụ"
          >
            ✎
          </button>
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-muted rounded-lg transition-colors"
            title="Xóa nhiệm vụ"
          >
            🗑️
          </button>
        </div>
      </div>

      <AIChatModal isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} taskTitle={task.title} />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        taskTitle={task.title}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </>
  )
}
