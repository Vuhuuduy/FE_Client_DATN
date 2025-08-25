import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = () => {
    if (!email) return
    // Thực hiện hành động gửi email ở đây
    console.log("Email submitted:", email)
  }

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Đăng ký nhận tin tức mới nhất</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Cập nhật những xu hướng thời trang mới nhất, ưu đãi độc quyền và bộ sưu tập mới
        </p>
        <div className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <button
            onClick={handleSubmit}
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-md font-semibold transition-colors"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </section>
  )
}
