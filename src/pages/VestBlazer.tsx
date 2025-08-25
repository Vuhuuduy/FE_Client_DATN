import ProductCard from "../components/HomeComponents/ProductCard";
import { useEffect, useState } from "react";
import BreadCrumb from "../components/details/BreadCrumb";

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  soldCount: number;
  isNew?: boolean;
}

export default function VestBlazer() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts: Product[] = [
      {
        id: 2,
        name: "Vest Wool Cao Cấp",
        price: 8900000,
        originalPrice: 9500000,
        image:
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
        rating: 5,
        reviews: 18,
        soldCount: 190,
        isNew: true,
      },
      {
        id: 4,
        name: "Blazer Linen Luxury",
        price: 5490000,
        originalPrice: 6200000,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
        rating: 5,
        reviews: 15,
        soldCount: 172,
      },
      {
        id: 12,
        name: "Blazer Navy Premium",
        price: 6290000,
        originalPrice: 6890000,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
        rating: 5,
        reviews: 94,
        soldCount: 178,
      },
      {
        id: 9,
        name: "Vest Đen Classic",
        price: 7890000,
        originalPrice: 8500000,
        image:
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
        rating: 5,
        reviews: 156,
        soldCount: 324,
      },
    ];

    setProducts(allProducts);
  }, []);

  return (
    <div className="bg-white">
      <BreadCrumb productName="Vest & Blazer" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Vest & Blazer Cao Cấp</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} showSoldCount />
          ))}
        </div>
      </div>
    </div>
  );
}
