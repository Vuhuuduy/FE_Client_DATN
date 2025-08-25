"use client"

import { useNavigate } from "react-router-dom"
import { Star, Heart, Sparkles } from "lucide-react"

type Product = {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  isNew: boolean
  soldCount?: number
}

export default function NewProducts() {
  const navigate = useNavigate()

  const newProducts: Product[] = [
    {
      id: 1,
      name: "Áo Sơ Mi Premium Cotton",
      price: 2890000,
      originalPrice: 3200000,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 24,
      isNew: true,
    },
    {
      id: 2,
      name: "Vest Wool Cao Cấp",
      price: 8900000,
      originalPrice: 9500000,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 18,
      isNew: false,
    },
    {
      id: 3,
      name: "Quần Tây Slim Fit",
      price: 1890000,
      originalPrice: 2100000,
      image: "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?w=400&h=500&fit=crop",
      rating: 4,
      reviews: 32,
      isNew: true,
    },
    {
      id: 4,
      name: "Blazer Linen Luxury",
      price: 5490000,
      originalPrice: 6200000,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 15,
      isNew: false,
    },
    {
      id: 5,
      name: "Áo Polo Premium",
      price: 1590000,
      originalPrice: 1890000,
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop",
      rating: 4,
      reviews: 28,
      isNew: true,
    },
    {
      id: 6,
      name: "Quần Chinos Cao Cấp",
      price: 2190000,
      originalPrice: 2490000,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 21,
      isNew: true,
    },
    {
      id: 7,
      name: "Áo Khoác Denim Premium",
      price: 3490000,
      originalPrice: 3890000,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop",
      rating: 4,
      reviews: 19,
      isNew: true,
    },
    {
      id: 8,
      name: "Áo Sweater Cashmere",
      price: 4290000,
      originalPrice: 4790000,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 16,
      isNew: false,
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
              <Sparkles className="text-indigo-500" />
              Sản phẩm mới
            </h2>
            <p className="text-gray-600 text-lg">Khám phá những thiết kế mới nhất dành cho bạn</p>
          </div>
          <button
            onClick={() => navigate("/all")}
            className="hidden md:flex border border-gray-300 hover:border-black px-6 py-2 rounded-md transition-colors"
          >
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Mới ra mắt
                  </span>
                )}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
                    Xem chi tiết
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < product.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.reviews} đánh giá)</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-sm text-indigo-600 font-medium">
                  Đã bán: {product.soldCount ?? 0} sản phẩm
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
