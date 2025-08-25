import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/axios.customize";
import { Product } from "../types/Product";
import ProductCard from "../components/HomeComponents/ProductCard"; // chỉnh path cho đúng

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/categories/${slug}/products`);
        setProducts(res.data.data);
      } catch (err) {
        console.error("Lỗi lấy sản phẩm theo danh mục:", err);
        setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="animate-pulse text-gray-500">Đang tải sản phẩm...</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Quay lại
      </button>

      <h2 className="text-xl font-semibold mb-4">
        Sản phẩm thuộc danh mục: <span className="text-blue-600">{slug}</span>
      </h2>

      {error && (
        <div className="text-red-600 font-semibold mb-4">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                ...product,
                id: product._id,
                image: product.imageUrl,
              }}
              showSoldCount
            />
          ))}
        </div>
      )}
    </div>
  );
}
