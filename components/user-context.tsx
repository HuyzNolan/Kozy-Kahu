"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface UserContextType {
  name: string
  setName: (name: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("")

  return <UserContext.Provider value={{ name, setName }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }
  return context
}
