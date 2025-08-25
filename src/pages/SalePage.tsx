import ProductCard from "../components/HomeComponents/ProductCard";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  soldCount: number;
};

const saleProducts: Product[] = [
  {
    id: 21,
    name: "Áo Hoodie Nỉ Bông",
    price: 890000,
    originalPrice: 1290000,
    image: "https://images.unsplash.com/photo-1618354691317-35c5d7fe49f3?w=400&h=500&fit=crop",
    rating: 5,
    reviews: 142,
    soldCount: 354,
  },
  {
    id: 22,
    name: "Quần Short Linen",
    price: 490000,
    originalPrice: 690000,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop",
    rating: 4,
    reviews: 89,
    soldCount: 276,
  },
  {
    id: 23,
    name: "Áo Khoác Dù Mỏng",
    price: 1090000,
    originalPrice: 1490000,
    image: "https://images.unsplash.com/photo-1602810317756-03e2ca9e7a1d?w=400&h=500&fit=crop",
    rating: 5,
    reviews: 198,
    soldCount: 401,
  },
  {
    id: 24,
    name: "Thắt Lưng Nam Da Bò",
    price: 590000,
    originalPrice: 890000,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224b345?w=400&h=500&fit=crop",
    rating: 4,
    reviews: 71,
    soldCount: 223,
  },
];

export default function SalePage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Sản phẩm giảm giá</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} showSoldCount />
          ))}
        </div>
      </div>
    </div>
  );
}
