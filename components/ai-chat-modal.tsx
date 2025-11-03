"use client"

import { useState, useRef, useEffect } from "react"
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface AIChatModalProps {
  isOpen: boolean
  onClose: () => void
  taskTitle: string
}

const AI_SUGGESTIONS = [
  "Bạn có muốn tôi hỗ trợ để bắt đầu nhiệm vụ này không?",
  "Tôi có thể giúp bạn viết, lập kế hoạch hoặc tạo ra ý tưởng!",
  "Bạn cần sự trợ giúp để thay đổi cách tiếp cận của mình?",
]

function renderContent(content: string) {
  const blockRegex = /\$\$(.+?)\$\$|\\\[(.+?)\\\]/g
  const parts = content.split(blockRegex).filter(Boolean)

  return (
    <>
      {parts.map((part, i) => {
        if (blockRegex.test(part)) {
          return <BlockMath key={i} math={part} />
        } else {
          const inlineParts = part.split(/\$(.+?)\$|\\\((.+?)\\\)/g).filter(Boolean)
          return (
            <span key={i}>
              {inlineParts.map((p, j) =>
                /\$(.+?)\$|\\\((.+?)\\\)/.test(p) ? <InlineMath key={j} math={p} /> : p
              )}
            </span>
          )
        }
      })}
    </>
  )
}

export function AIChatModal({ isOpen, onClose, taskTitle }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(`chat_${taskTitle}`)
      if (saved) {
        setMessages(JSON.parse(saved))
      } else {
        const greeting: Message = {
          id: "0",
          role: "assistant",
          content: AI_SUGGESTIONS[Math.floor(Math.random() * AI_SUGGESTIONS.length)],
        }
        setMessages([greeting])
      }
    }
  }, [isOpen, taskTitle])

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_${taskTitle}`, JSON.stringify(messages))
    }
  }, [messages, taskTitle])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          taskTitle,
        }),
      })

      const data = await res.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "Xin lỗi, hiện tại tôi đang không khả dụng, vui lòng thử lại",
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 2).toString(), role: "assistant", content: "Lỗi kết nối với AI, vui lòng thử lại " },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg w-full md:max-w-md h-[80vh] md:h-[600px] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="font-bold text-foreground">Trợ lý AI</h2>
            <p className="text-xs text-muted-foreground">{taskTitle}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors text-lg">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-primary to-accent text-white rounded-br-none"
                    : "bg-muted text-foreground rounded-bl-none"
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">
                  {renderContent(message.content)}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nói gì đó với trợ lý AI..."
              className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-lg"
            >
              ➤
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
