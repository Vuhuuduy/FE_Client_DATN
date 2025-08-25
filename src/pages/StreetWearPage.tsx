// src/pages/CasualWearPage.tsx
import { useEffect, useState } from "react";
import ProductCard from "../components/HomeComponents/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  soldCount: number;
  isNew: boolean;

  // Thêm các field nếu ProductCard yêu cầu
  images?: string[];
  brand?: string;
  sku?: string;
  colors?: string[];
  sizes?: string[];
  vouchers?: {
    code: string;
    discount: string;
  }[];
}

const casualProducts: Product[] = [
  {
    id: 28,
    name: "Áo Polo Nam Thời Trang",
    price: 450000,
    originalPrice: 590000,
    image: "https://images.unsplash.com/photo-1564460576398-3fcae1d51a1d?w=500&h=600&fit=crop",
    rating: 5,
    reviews: 88,
    soldCount: 310,
    isNew: true,
  },
  {
    id: 29,
    name: "Quần Chinos Co Giãn",
    price: 520000,
    originalPrice: 690000,
    image: "https://images.unsplash.com/photo-1581591524426-9612b6d39b37?w=500&h=600&fit=crop",
    rating: 4,
    reviews: 64,
    soldCount: 189,
    isNew: false,
  },
  {
    id: 30,
    name: "Áo Thun Tay Ngắn Form Rộng",
    price: 320000,
    originalPrice: 420000,
    image: "https://images.unsplash.com/photo-1520975922203-29d89b7b8c91?w=500&h=600&fit=crop",
    rating: 4,
    reviews: 42,
    soldCount: 142,
    isNew: true,
  },
];

const StreetWearPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(casualProducts);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Thời trang dạo phố</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default StreetWearPage;
