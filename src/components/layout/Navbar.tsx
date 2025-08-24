"use client"

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, ShoppingBag, User, Search } from "lucide-react"

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleUserClick = () => {
    const user = localStorage.getItem("user")
    if (user) {
      navigate("/user") // hoặc "/profile" tùy bạn đặt route
    } else {
      navigate("/login")
    }
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-black">
            LUXE MEN
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-black transition-colors font-medium">
              Trang chủ
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-black transition-colors font-medium">
              Giới thiệu
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-black transition-colors font-medium">
              Sản phẩm
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-black transition-colors font-medium">
              Liên hệ
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Tìm kiếm">
              <Search className="h-5 w-5" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Người dùng"
              onClick={handleUserClick}
            >
              <User className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative" aria-label="Giỏ hàng">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-black transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Trang chủ
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-black transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Giới thiệu
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-black transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Sản phẩm
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-black transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Liên hệ
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
