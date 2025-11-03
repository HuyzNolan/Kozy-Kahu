import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  const { messages, taskTitle } = await req.json()

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Bạn là trợ lý AI trong app quản lý nhiệm vụ. Giữ giọng thân thiện, ngắn gọn và thực tế.",
        },
        ...messages.map((m) => ({
          role: m.role,
          content: `${m.role === "user" ? "Người dùng" : "AI"}: ${m.content}`,
        })),
        {
          role: "system",
          content: `Nhiệm vụ hiện tại: ${taskTitle}`,
        },
      ],
    })

    const reply = completion.choices[0].message?.content || "Xin lỗi, tôi không có phản hồi phù hợp 😅"
    return NextResponse.json({ reply })
  } catch (err) {
    console.error("AI error:", err)
    return NextResponse.json({ reply: "Lỗi kết nối máy chủ 😢" }, { status: 500 })
  }
}
