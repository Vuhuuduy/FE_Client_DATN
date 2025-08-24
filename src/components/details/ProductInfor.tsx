"use client"
import { useState, useEffect } from "react"
import { Star, Heart, Plus, Minus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import SizeGuideModal from "./SizeGuideModal"
import { useCart } from "../../context/CartContext"
import { toast } from "react-toastify"

type Product = {
  name: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  soldCount: number
  sku: string
  brand: string
  colors: string[]
  sizes: string[]
  stock?: number
  [key: string]: any
}

type Props = {
  product: Product
  isAccessory?: boolean
}

export function ProductInfor({ product, isAccessory }: Props) {
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [openSizeGuide, setOpenSizeGuide] = useState(false)

  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (product.colors?.length > 0) {
      setSelectedColor(product.colors[0])
    }
    if (product.sizes?.length > 0) {
      setSelectedSize(product.sizes[0])
    }
  }, [product])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1)
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  const handleAddToCart = () => {
  if (!product) return;

  const item = {
    id: product.id, // thêm id vào đây
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    rating: product.rating,
    reviews: product.reviews,
    soldCount: product.soldCount,
    sku: product.sku,
    brand: product.brand,
    colors: product.colors,
    sizes: product.sizes,
    stock: product.stock,
    color: selectedColor,
    size: selectedSize,
    quantity,
  };

  addToCart(item);
  toast.success("Đã thêm vào giỏ hàng!");
  navigate("/cart");
};


  const handleBuyNow = () => {
  if (!product) return;

  const item = {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    rating: product.rating,
    reviews: product.reviews,
    soldCount: product.soldCount,
    sku: product.sku,
    brand: product.brand,
    colors: product.colors,
    sizes: product.sizes,
    stock: product.stock,
    color: selectedColor,
    size: selectedSize,
    quantity,
  };

  addToCart(item);
  navigate("/gio-hang", { state: { item } });
};


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold leading-snug">{product.name}</h1>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="font-semibold text-black">{product.rating}</span>
        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        <span>({product.reviews.toLocaleString()} đánh giá)</span>
        <span>• Đã bán {product.soldCount.toLocaleString()}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-red-600">{formatPrice(product.price)}</span>
        <span className="line-through text-gray-400 text-xl">
          {formatPrice(product.originalPrice)}
        </span>
        <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded">
          -{discountPercent}%
        </span>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Màu sắc: <span className="text-black">{selectedColor}</span>
        </p>
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 border rounded-md text-sm font-medium transition-all ${
                selectedColor === color
                  ? "border-red-600 text-red-600 bg-red-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {!isAccessory && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Kích thước: <span className="text-black">{selectedSize}</span>
          </p>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-10 border rounded-md text-sm font-medium transition-all ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <button
            onClick={() => setOpenSizeGuide(true)}
            className="mt-2 text-blue-600 text-sm hover:underline"
          >
            Hướng dẫn chọn size
          </button>
        </div>
      )}

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Số lượng</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increase")}
              className="px-3 py-2 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-gray-500">
            Còn lại: {product.stock || 99} sản phẩm
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-red-500 text-white py-3 rounded-md text-center font-semibold hover:bg-red-600 transition"
        >
          Thêm vào giỏ hàng
        </button>
        <button
          onClick={handleBuyNow}
          className="bg-orange-400 text-white py-3 px-6 rounded-md font-semibold hover:bg-orange-500 transition"
        >
          Mua ngay
        </button>
        <button className="border border-gray-300 p-3 rounded-md hover:border-black transition-colors">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>SKU:</span>
          <span>{product.sku}</span>
        </div>
        <div className="flex justify-between">
          <span>Thương hiệu:</span>
          <span>{product.brand}</span>
        </div>
        <div className="flex justify-between">
          <span>Tình trạng:</span>
          <span className="text-green-600 font-medium">Còn hàng</span>
        </div>
      </div>

      {!isAccessory && (
        <SizeGuideModal open={openSizeGuide} onClose={() => setOpenSizeGuide(false)} />
      )}
    </div>
  )
}
