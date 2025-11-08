import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req) {
  try {
    const { messages, taskTitle } = await req.json()

    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: `
Bạn là trợ lý AI trong app quản lý nhiệm vụ.
- Giữ giọng thân thiện, ngắn gọn, thực tế.
- Giải thích nhanh nội dung file hoặc nhiệm vụ.
- Nếu phân số chứa biến (ví dụ \frac{1}{2} m v^2), trả về dạng text thuần: 1/2 m v^2, KHÔNG dùng \frac
- Nếu phân số nhỏ (ví dụ 1/2, 3/4, 5/6), trả về dạng text thuần "1/2", KHÔNG dùng \\frac{}{}.
- Tất cả công thức toán học phải dùng LaTeX chuẩn:
  + Inline: $...$, ví dụ $a^2 + b^2$
  + Block: $$...$$, ví dụ $$x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$$
- Không giải thích trong dấu math, chỉ giải thích ngắn ngoài math.
- Text ngoài math phải ngắn gọn, thực tế, không lan man.
          `,
        },
        ...messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        {
          role: "system",
          content: `Nhiệm vụ hiện tại: ${taskTitle || "Chưa có tiêu đề nhiệm vụ."}`,
        },
      ],
    })

    const reply = completion.output_text || "Xin lỗi, tôi không thể phản hồi lúc này 😅"
    return NextResponse.json({ reply })
  } catch (err) {
    console.error("❌ AI error:", err)
    return NextResponse.json({ reply: "Lỗi máy chủ hoặc API 😢", error: err.message }, { status: 500 })
  }
}
