import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/Product";
import ProductCard from "./ProductCard";

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8888/api/products")
      .then((res) => {
        console.log("HTTP status:", res.status);
        return res.json();
      })
      .then((json) => {
        console.log("API response:", json);
        if (json.success && Array.isArray(json.data)) {
          setProducts(json.data);
        } else {
          console.warn("API trả về sai định dạng hoặc thiếu dữ liệu.");
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi fetch API:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tất cả sản phẩm</h2>
            <p className="text-gray-600 text-lg">
              Khám phá mọi mặt hàng mà chúng tôi đang có
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Đang tải sản phẩm...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">Không có sản phẩm nào</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products
              .filter((prod) => prod.stock > 0 && prod.status === "Sẵn") // 👈 lọc theo tiếng Việt
              .map((prod) => (
                <ProductCard
                  key={prod._id}
                  product={{
                    id: prod._id!,
                    name: prod.name,
                    image: prod.imageUrl,
                    price: prod.price,
                    originalPrice: prod.originalPrice,
                    rating: prod.rating,
                    reviews: prod.reviews,
                    soldCount: prod.soldCount,
                    isNew: prod.isNew,
                  }}
                  showSoldCount
                />
              ))}

          </div>
        )}
      </div>
    </section>
  );
}
