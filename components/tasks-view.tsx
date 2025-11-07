"use client"

import { useState, useEffect, useMemo } from "react"
import { useToast } from "./toast-provider"
import { TaskCard } from "./task-card"
import { AddTaskModal } from "./add-task-modal"
import { GreetingSection } from "./greeting-section"

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

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tasks")
      const savedTasks: Task[] = saved ? JSON.parse(saved) : []

      const lastReset = localStorage.getItem("lastResetDate")
      const today = new Date().toDateString()

      if (lastReset !== today) {
        const resetTasks = savedTasks.map((t) =>
          t.completed ? { ...t, completed: false } : t
        )
        localStorage.setItem("tasks", JSON.stringify(resetTasks))
        localStorage.setItem("lastResetDate", today)
        setTasks(resetTasks)
        if (savedTasks.some((t) => t.completed)) {
          console.log("🌞 Chào ngày mới! Nhiệm vụ đã được reset lại để bắt đầu lại từ đầu.")
        }
      } else {
        setTasks(savedTasks)
      }
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

  // ===== PHÂN LOẠI NHIỆM VỤ =====
  const { todayTasks, futureTasks, overdueTasks, completedTasks } = useMemo(() => {
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    const today: Task[] = []
    const future: Task[] = []
    const overdue: Task[] = []
    const completed: Task[] = []

    for (const t of tasks) {
      const due = new Date(t.dueDate)
      if (t.completed) {
        completed.push(t)
      } else if (due < startOfToday) {
        overdue.push(t)
      } else if (due >= startOfToday && due < endOfToday) {
        today.push(t)
      } else if (due >= endOfToday) {
        future.push(t)
      }
    }

    const sortByDate = (a: Task, b: Task) =>
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()

    today.sort(sortByDate)
    future.sort(sortByDate)
    overdue.sort(sortByDate)
    completed.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())

    return { todayTasks: today, futureTasks: future, overdueTasks: overdue, completedTasks: completed }
  }, [tasks])

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <GreetingSection />

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Các nhiệm vụ</h2>
        <p className="text-muted-foreground">{tasks.length} nhiệm vụ tổng cộng</p>
      </div>

      {overdueTasks.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-3 text-red-500">⚠️ Nhiệm vụ quá hạn</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {overdueTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={handleToggleTask} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
            ))}
          </div>
        </div>
      )}

      {todayTasks.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-3 text-blue-500">📅 Nhiệm vụ hôm nay</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={handleToggleTask} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
            ))}
          </div>
        </div>
      )}

      {futureTasks.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-3 text-purple-500">⏳ Nhiệm vụ sắp tới</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {futureTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={handleToggleTask} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-3 text-green-600">✅ Nhiệm vụ đã hoàn thành trong hôm nay</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-80">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={handleToggleTask} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
            ))}
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground text-lg">Không có nhiệm vụ nào. Chill thôi 😎</p>
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
