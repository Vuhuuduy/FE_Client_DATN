import { Star, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import ProductOptionSelect from "../product/ProductOptionSelect";

type Product = {
  id: number | string;
  name: string;
  image?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews?: number;
  soldCount?: number;
  isNew?: boolean;
  colors?: string[];
  sizes?: string[];
};

type ProductCardProps = {
  product: Product;
  showSoldCount?: boolean;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export default function ProductCard({
  product,
  showSoldCount = false,
}: ProductCardProps) {
  const [showOptions, setShowOptions] = useState(false);
  const { addToCart } = useCart();

  if (!product) return null;

  const {
    id,
    name,
    image,
    price,
    originalPrice,
    rating,
    reviews,
    soldCount,
    isNew,
    colors = [],      // fallback nếu undefined
    sizes = [],       // fallback nếu undefined
  } = product;

  return (
    <>
      <div className="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 relative">
        <Link to={`/product/${id}`}>
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={image || "https://placehold.co/300x400?text=No+Image"}
              alt={name}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {isNew && (
              <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                Mới
              </span>
            )}
            {showSoldCount && (
              <span className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Bán chạy
              </span>
            )}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setShowOptions(true);
                }}
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </Link>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({reviews || 0} đánh giá)
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">{formatPrice(price)}</span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
          </div>
          {showSoldCount && soldCount && (
            <div className="text-sm text-amber-600 font-medium">
              Đã bán: {soldCount} sản phẩm
            </div>
          )}
        </div>
      </div>

      {/* Popup chọn màu, size, số lượng */}
      {showOptions && (
        <ProductOptionSelect
          colors={colors}
          sizes={sizes}
          onConfirm={(color, size, quantity) => {
            addToCart({
              _id: String(id),
              name,
              image,
              price,
              color,
              size,
              quantity,
            });
            setShowOptions(false);
          }}
          onClose={() => setShowOptions(false)}
        />
      )}
    </>
  );
}
