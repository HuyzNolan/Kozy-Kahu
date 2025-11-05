import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const messages = JSON.parse(formData.get("messages") as string)
    const taskTitle = formData.get("taskTitle") as string
    const file = formData.get("file") as File | null

    let fileRef: string | null = null

    if (file) {
      const arrayBuffer = await file.arrayBuffer()
      const blob = new Blob([arrayBuffer], { type: file.type })

      const upload = await client.files.create({
        file: blob,
        purpose: "assistants",
      })

      fileRef = upload.id
    }

    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content:
            "Bạn là trợ lý AI trong app quản lý nhiệm vụ. Hãy giữ giọng thân thiện, ngắn gọn, thực tế và giúp người dùng hiểu nhanh nội dung file hoặc nhiệm vụ.",
        },
        ...messages.map((m: any) => ({
          role: m.role,
          content: `${m.role === "user" ? "Người dùng" : "AI"}: ${m.content}`,
        })),
        {
          role: "system",
          content: `Nhiệm vụ hiện tại: ${taskTitle || "Chưa có tiêu đề nhiệm vụ."}`,
        },
      ],
      ...(fileRef
        ? {
            attachments: [
              {
                file_id: fileRef,
              },
            ],
          }
        : {}),
    })

    const reply =
      completion.output_text || "Xin lỗi, tôi không thể phản hồi lúc này 😅"

    return NextResponse.json({ reply })
  } catch (err: any) {
    console.error("❌ AI error:", err)
    return NextResponse.json(
      { reply: "Lỗi máy chủ hoặc API 😢", error: err.message },
      { status: 500 }
    )
  }
}
