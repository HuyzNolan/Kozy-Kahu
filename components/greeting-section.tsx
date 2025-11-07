"use client"

import { useEffect, useState } from "react"
import { useUser } from "./user-context"

export function GreetingSection() {
  const { name } = useUser()
  const [greeting, setGreeting] = useState("")
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening">("morning")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) {
      setTimeOfDay("morning")
      setGreeting("Chào buổi sáng")
    } else if (hour < 18) {
      setTimeOfDay("afternoon")
      setGreeting("Chào buổi chiều")
    } else {
      setTimeOfDay("evening")
      setGreeting("Chào buổi tối")
    }

    const messages = [
      "Hãy làm cho ngày hôm nay trở nên hiệu quả 💪",
      "Một nhiệm vụ nhỏ cũng là một bước tiến lớn ✨",
      "Đừng đợi cảm hứng — hãy tạo ra nó 🎨",
      "Cà phê + tập trung = thành công ☕⚡",
      "Làm tốt hơn hôm qua một chút thôi cũng đủ 💯",
      "Từng sự cố gắng đều đáng giá 🧠",
      "Đặt mục tiêu và bắn trúng nó 🎯",
      "Hôm nay không làm thì mai cũng phải làm thôi 😎",
    ]
    setMessage(messages[Math.floor(Math.random() * messages.length)])
  }, [])

  const displayText = name ? `${greeting}, ${name}` : "Hôm nay bạn cảm thấy thế nào ?"

  const getGradientClass = () => {
    switch (timeOfDay) {
      case "morning":
        return "from-blue-400 to-blue-600"
      case "afternoon":
        return "from-amber-400 to-orange-500"
      case "evening":
        return "from-purple-500 to-indigo-700"
      default:
        return "from-blue-400 to-blue-600"
    }
  }

  return (
    <div
      className={`bg-gradient-to-r ${getGradientClass()} rounded-2xl p-8 md:p-10 mb-8 shadow-lg`}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
        {displayText}
      </h1>
      <p className="mt-3 text-lg md:text-xl font-medium text-white/90">
        {message}
      </p>
    </div>
  )
}
