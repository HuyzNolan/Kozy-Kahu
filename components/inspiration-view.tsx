"use client"

export function InspirationView() {
  const inspirations = [
    {
      id: 1,
      title: "Chia nhỏ nhiệm vụ",
      description: "Những nhiệm vụ lớn khiến bạn cảm thấy quá sức. Hãy thử chia nhỏ chúng thành các bước nhỏ hơn, dễ quản lý hơn.",
      icon: "📋",
    },
    {
      id: 2,
      title: "Phân thời gian",
      description: "Dành ra những khoảng thời gian cụ thể để tập trung vào những nhiệm vụ quan trọng nhất của bạn.",
      icon: "⏱️",
    },
    {
      id: 3,
      title: "Kỹ thuật Pomodoro",
      description: "Làm việc theo khoảng thời gian 25 phút với những khoảng nghỉ ngắn để duy trì sự tập trung và năng lượng.",
      icon: "🍅",
    },
    {
      id: 4,
      title: "Ưu tiên nhiệm vụ",
      description: "Phân loại nhiệm vụ theo mức độ khẩn cấp và tầm quan trọng để tập trung vào những gì thực sự quan trọng.",
      icon: "📊",
    },
    {
      id: 5,
      title: "Ăn mừng",
      description: "Ghi nhận những nhiệm vụ đã hoàn thành. Những chiến thắng nhỏ sẽ tạo động lực cho các việc khác.",
      icon: "🎉",
    },
    {
      id: 6,
      title: "Đánh giá và nhận xét",
      description: "Kết thúc mỗi ngày bằng cách xem lại những gì bạn đã hoàn thành và lập kế hoạch cho ngày mai.",
      icon: "🔍",
    },
  ]

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">✨</span>
          <h2 className="text-3xl font-bold text-foreground">Các mẹo hữu dụng</h2>
        </div>
        <p className="text-muted-foreground">Mẹo và chiến lược để tăng năng suất của bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inspirations.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
