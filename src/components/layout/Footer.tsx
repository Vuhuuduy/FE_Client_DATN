import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">FASHION LUXURY</h3>
            <p className="text-gray-400 mb-4">Thương hiệu thời trang nam cao cấp hàng đầu Việt Nam</p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer transition-colors"
              >
                <FaFacebookF className="text-white" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer transition-colors"
              >
                <FaInstagram className="text-white" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer transition-colors"
              >
                <FaTwitter className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Sản phẩm</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Áo sơ mi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Vest & Blazer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Quần tây
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Phụ kiện
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Bảo mật
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Hotline: 1900 1234</li>
              <li>Email: fashion@luxury.vn</li>
              <li>Địa chỉ: Số 19 ngõ 74 đường Cầu Diễn-Phúc Diễn-Bắc Từ Liêm-hà Nội</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 FASHION LUXURY. Tất cả quyền được bảo lưu.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Điều khoản sử dụng
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Chính sách bảo mật
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
