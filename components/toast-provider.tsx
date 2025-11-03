"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export interface Toast {
  id: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => string
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = { ...toast, id, duration: toast.duration || 5000 }

    setToasts((prev) => [...prev, newToast])

    if (newToast.duration) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-blue-600 text-white px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <span className="text-sm font-medium">{toast.message}</span>
          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick()
                removeToast(toast.id)
              }}
              className="text-white font-semibold hover:bg-blue-700 px-3 py-1 rounded-lg transition-colors text-sm"
            >
              {toast.action.label}
            </button>
          )}
          <button onClick={() => removeToast(toast.id)} className="text-white hover:opacity-80 transition-opacity">
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
