// src/pages/NewCollection.tsx

import ProductCard from "../components/HomeComponents/ProductCard";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  soldCount: number;
  isNew: boolean;
};

const newProducts: Product[] = [
  {
    id: 1,
    name: "Áo Sơ Mi Premium Cotton",
    image: "https://via.placeholder.com/300x400",
    price: 2890000,
    originalPrice: 3200000,
    rating: 5,
    reviews: 24,
    soldCount: 100,
    isNew: true,
  },
  {
    id: 2,
    name: "Vest Wool Cao Cấp",
    image: "https://via.placeholder.com/300x400",
    price: 8900000,
    originalPrice: 9500000,
    rating: 5,
    reviews: 18,
    soldCount: 75,
    isNew: true,
  },
  {
    id: 3,
    name: "Quần Tây Slim Fit",
    image: "https://via.placeholder.com/300x400",
    price: 1890000,
    originalPrice: 2100000,
    rating: 4,
    reviews: 32,
    soldCount: 150,
    isNew: true,
  },
  {
    id: 4,
    name: "Blazer Linen Luxury",
    image: "https://via.placeholder.com/300x400",
    price: 5490000,
    originalPrice: 6200000,
    rating: 5,
    reviews: 15,
    soldCount: 50,
    isNew: true,
  },
  {
    id: 5,
    name: "Áo Thun Họa Tiết",
    image: "https://via.placeholder.com/300x400",
    price: 890000,
    originalPrice: 990000,
    rating: 4,
    reviews: 8,
    soldCount: 60,
    isNew: true,
  },
  {
    id: 6,
    name: "Quần Kaki Nam",
    image: "https://via.placeholder.com/300x400",
    price: 1190000,
    originalPrice: 1450000,
    rating: 4,
    reviews: 10,
    soldCount: 45,
    isNew: true,
  },
  {
    id: 7,
    name: "Áo Hoodie Streetwear",
    image: "https://via.placeholder.com/300x400",
    price: 1290000,
    originalPrice: 1580000,
    rating: 5,
    reviews: 12,
    soldCount: 80,
    isNew: true,
  },
  {
    id: 8,
    name: "Áo Khoác Gió Nam",
    image: "https://via.placeholder.com/300x400",
    price: 1690000,
    originalPrice: 1990000,
    rating: 4,
    reviews: 22,
    soldCount: 95,
    isNew: true,
  },
];

export default function NewCollection() {
  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">✨ Bộ sưu tập mới</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} showSoldCount />
          ))}
        </div>
      </section>
    </div>
  );
}
