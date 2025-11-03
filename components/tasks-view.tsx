"use client"

import { useState, useEffect } from "react"
import { useToast } from "./toast-provider"
import { TaskCard } from "./task-card"
import { AddTaskModal } from "./add-task-modal"
import { GreetingSection } from "./greeting-section"
import { useView } from "./view-context"
import { ViewModeToggle } from "./view-mode-toggle"

interface Task {
  id: string
  title: string
  description?: string
  dueDate: string
  priority: "low" | "medium" | "high"
  completed: boolean
}

export function TasksView() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { addToast } = useToast()
  const { viewMode } = useView()

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tasks")
      if (saved) setTasks(JSON.parse(saved))
    } catch (err) {
      console.error("Lỗi khi tải nhiệm vụ:", err)
    }
  }, [])

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks)
    try {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    } catch (err) {
      console.error("Lỗi khi lưu nhiệm vụ:", err)
    }
  }

  const handleAddTask = (newTask: Omit<Task, "id" | "completed">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
    }
    const updated = [task, ...tasks]
    saveTasks(updated)
    setIsAddModalOpen(false)
    addToast({ message: "Đã thêm nhiệm vụ mới 🎯", duration: 2500 })
  }

  const handleUpdateTask = (id: string, updatedFields: Partial<Task>) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, ...updatedFields } : t
    )
    saveTasks(updated)
    addToast({ message: "Đã cập nhật nhiệm vụ ✏️", duration: 2500 })
  }

  const handleToggleTask = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
    saveTasks(updated)

    const task = tasks.find((t) => t.id === id)
    if (task && !task.completed) {
      addToast({
        message: `"${task.title}" hoàn thành ✅`,
        action: { label: "Hoàn tác", onClick: () => handleUndoCompletion(id) },
        duration: 5000,
      })
    }
  }

  const handleUndoCompletion = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: false } : t
    )
    saveTasks(updated)
    addToast({ message: "Đã hoàn tác nhiệm vụ 🔄", duration: 2500 })
  }

  const handleDeleteTask = (id: string) => {
  const deletedTask = tasks.find((t) => t.id === id)
  const updated = tasks.filter((t) => t.id !== id)
  saveTasks(updated)
  addToast({ message: "Đã xoá nhiệm vụ 🗑️", duration: 2500 })
  if (deletedTask?.title) {
    localStorage.removeItem(`chat_${deletedTask.title}`)
  }
}


  const activeTasks = tasks.filter((t) => !t.completed)

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <GreetingSection />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Các nhiệm vụ</h2>
          <p className="text-muted-foreground">{activeTasks.length} nhiệm vụ</p>
        </div>
        <div className="hidden md:block">
          <ViewModeToggle />
        </div>
      </div>

      {viewMode === "board" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {activeTasks.length > 0 ? (
            activeTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                Không có nhiệm vụ nào. Chill thôi 😎
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3 mb-8 max-w-2xl">
          {activeTasks.length > 0 ? (
            activeTasks.map((task) => (
              <div
                key={task.id}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className="mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 border-primary hover:bg-primary/10 transition-colors flex items-center justify-center"
                  >
                    {task.completed && <span className="text-primary">✓</span>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{task.title}</h3>
                    {task.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {new Date(task.dueDate).toLocaleDateString("vi-VN", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex gap-2">
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Không có nhiệm vụ nào. Chill thôi 😎
              </p>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-2xl"
      >
        +
      </button>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTask}
      />
    </div>
  )
}