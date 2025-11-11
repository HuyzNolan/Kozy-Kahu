"use client"

export function InspirationView() {
  const inspirations = [
    {
      id: 1,
      title: "Chia nhỏ mục tiêu",
      description:
        "Đừng để những nhiệm vụ lớn làm bạn choáng ngợp. Hãy chia chúng thành từng bước nhỏ, dễ hoàn thành hơn để giữ đà tiến triển.",
      icon: "📋",
    },
    {
      id: 2,
      title: "Quản lý thời gian thông minh",
      description:
        "Dành ra những khung giờ cụ thể cho các nhiệm vụ quan trọng nhất. Khi đến giờ, hãy tập trung toàn bộ năng lượng vào công việc đó.",
      icon: "⏱️",
    },
    {
      id: 3,
      title: "Áp dụng kỹ thuật Pomodoro",
      description:
        "Làm việc tập trung trong 25 phút, sau đó nghỉ ngắn 5 phút. Chu trình này giúp bạn duy trì sự tỉnh táo và tránh kiệt sức.",
      icon: "🍅",
    },
    {
      id: 4,
      title: "Xác định ưu tiên",
      description:
        "Phân loại nhiệm vụ theo mức độ khẩn cấp và quan trọng. Bắt đầu với việc tạo ra giá trị lớn nhất cho bạn.",
      icon: "📊",
    },
    {
      id: 5,
      title: "Ăn mừng tiến bộ",
      description:
        "Đừng quên khen thưởng bản thân cho những gì bạn đã hoàn thành. Niềm vui nhỏ hôm nay sẽ tạo động lực lớn cho ngày mai.",
      icon: "🎉",
    },
    {
      id: 6,
      title: "Tổng kết cuối ngày",
      description:
        "Trước khi nghỉ ngơi, hãy nhìn lại những gì bạn đã đạt được và lập kế hoạch ngắn gọn cho ngày tiếp theo.",
      icon: "🔍",
    },
  ]

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">✨</span>
          <h2 className="text-3xl font-bold text-foreground">Mẹo năng suất mỗi ngày</h2>
        </div>
        <p className="text-muted-foreground">
          Những ý tưởng nhỏ giúp bạn duy trì động lực và làm việc hiệu quả hơn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inspirations.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

