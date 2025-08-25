// ContactPage.tsx
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import axios from "axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await axios.post("http://localhost:8888/api/contact", formData);
      setStatus("Đã gửi đến Fashion Luxury, vui lòng chờ phản hồi!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("❌ Gửi thất bại, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Liên Hệ Với Chúng Tôi</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* ===== Thông tin liên hệ ===== */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Thông tin liên hệ</h2>
          <p className="text-gray-600">
            Nếu bạn có bất kỳ thắc mắc nào về sản phẩm hoặc dịch vụ, hãy liên hệ với chúng tôi qua thông tin sau:
          </p>
          <div className="flex items-center gap-3">
            <Phone className="text-blue-600" />
            <span>Hotline: 0386466521</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-blue-600" />
            <span>Email: fashion@luxury.vn</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-blue-600" />
            <span>Địa chỉ: Số 19 ngõ 74 đường Cầu Diễn - Phúc Diễn - Bắc Từ Liêm - Hà Nội</span>
          </div>

          {/* Google Map */}
          <div className="w-full h-64 rounded-lg overflow-hidden shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.307060973234!2d105.739!3d21.023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b02d0f1e17%3A0xa72b5a4f3c!2zQ-G7lW5nIENhdSBExKFpbiwgUGjDumMgRMawxqFuLCBC4bqhYyBU4buLIEjhuq11IE7DqmksIEjhuqFp!5e0!3m2!1svi!2s!4v1690000000000!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* ===== Form liên hệ ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Gửi tin nhắn</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Họ và tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Nhập họ tên của bạn"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Tin nhắn</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Nhập nội dung tin nhắn..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Đang gửi..." : "Gửi"}
            </button>
          </form>
          {status && <p className="mt-3 text-sm">{status}</p>}
        </div>
      </div>
    </div>
  );
}
