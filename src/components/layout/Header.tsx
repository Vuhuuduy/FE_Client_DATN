import React, { useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { ShoppingBag, User, Search, Menu, X } from "lucide-react"
import CartIcon from "../Cart/CartIcon"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>("")
  const navigate = useNavigate()
  const location = useLocation()

 useEffect(() => {
  const token = localStorage.getItem("token");
  setIsLoggedIn(!!token); // kiểm tra token thay vì user

  const params = new URLSearchParams(location.search);
  const kw = params.get("keyword") || "";
  setKeyword(kw);
}, [location.search]);

const handleUserClick = () => {
  const user = localStorage.getItem("user");
  navigate(user ? "/user" : "/login");
};



const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setIsLoggedIn(false);
  navigate("/login");
};

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`)
    }
  }

  const handleSearchClick = () => {
    if (keyword.trim() !== "") {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`)
    }
  }

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm text-gray-600 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <span>Miễn phí vận chuyển cho đơn hàng trên 5.000.000đ</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/support" className="hover:text-black transition-colors">
              Hỗ trợ
            </Link>
            <Link to="/order-tracking" className="hover:text-black transition-colors">
              Theo dõi đơn hàng
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-black">
              FASHION LUXURY
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/allproduct" className="text-gray-700 hover:text-black transition-colors font-medium">
                Sản Phẩm
              </Link>
              <Link to="/top-products" className="text-gray-700 hover:text-black transition-colors font-medium">
                Bán chạy
              </Link>
              <Link to="/new" className="text-gray-700 hover:text-black transition-colors font-medium">
                Tin tức
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-black transition-colors font-medium">
               Liên Hệ
              </Link>
              {/* <Link to="/sale" className="text-gray-700 hover:text-black transition-colors font-medium">
                Sale
              </Link> */}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2">
              <Search className="h-4 w-4 text-gray-400 cursor-pointer" onClick={handleSearchClick} />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={keyword}
                onChange={handleKeywordChange}
                onKeyDown={handleSearchKeyDown}
                className="border-0 bg-transparent focus:outline-none text-sm w-48"
              />
            </div>

            {/* User */}
            <button className="p-2 hover:bg-gray-100 rounded-full" onClick={handleUserClick} aria-label="Người dùng">
              <User className="h-5 w-5" />
            </button>

            {/* Cart */}
            <CartIcon />
            {/* Nếu CartIcon đã có icon giỏ hàng rồi thì nên bỏ <ShoppingBag /> */}
            {/* <ShoppingBag className="h-5 w-5" /> */}

            {/* Mobile menu toggle */}
            <button
              aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link
              to="/bo-suu-tap-moi"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-black transition-colors font-medium"
            >
              Bộ sưu tập mới
            </Link>
            <Link
              to="/ao-so-mi"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-black transition-colors font-medium"
            >
              Áo sơ mi
            </Link>
            <Link
              to="/vest-blazer"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-black transition-colors font-medium"
            >
              Vest & Blazer
            </Link>
            <Link
              to="/phu-kien"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-black transition-colors font-medium"
            >
              Phụ kiện
            </Link>
            <Link
              to="/sale"
              onClick={() => setIsMenuOpen(false)}
              className="block text-red-600 hover:text-red-700 transition-colors font-medium"
            >
              Sale
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
