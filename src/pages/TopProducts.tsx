import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message, Modal, Button } from "antd";
import ProductCard from "../components/HomeComponents/ProductCard"; // 👈 y chang AllProducts

interface TopProduct {
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  totalSold: number;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
}

export default function TopProducts() {
  const [data, setData] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // Modal state
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TopProduct | null>(null);
  const [color, setColor] = useState<string>("Đen");
  const [size, setSize] = useState<string>("S");
  const [quantity, setQuantity] = useState<number>(1);

useEffect(() => {
  fetch("http://localhost:8888/api/stats/top-products?limit=10")
    .then((res) => res.json())
    .then((json) => {
      // lọc chỉ các sản phẩm còn stock > 0
      const availableProducts = json.filter((prod: any) => prod.stock > 0);
      setData(availableProducts);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Lỗi fetch top products:", err);
      setLoading(false);
    });
}, []);


  const handleOpenModal = (product: TopProduct) => {
    setSelectedProduct(product);
    setColor("Đen");
    setSize("S");
    setQuantity(1);
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (!userId) {
      message.warning("Vui lòng đăng nhập để thêm giỏ hàng");
      return;
    }
    if (!selectedProduct) return;

    try {
      const res = await fetch(`http://localhost:8888/api/cart/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.productId,
          quantity,
          color,
          size,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        message.success(`Đã thêm "${selectedProduct.name}" vào giỏ hàng`);
        setOpen(false);
      } else {
        message.error(json.message || "Có lỗi khi thêm vào giỏ hàng");
      }
    } catch (err) {
      console.error(err);
      message.error("Có lỗi khi thêm vào giỏ hàng");
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Top 10 sản phẩm bán chạy
            </h2>
            <p className="text-gray-600 text-lg">
              Những mặt hàng được khách hàng yêu thích nhất
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Đang tải sản phẩm...</p>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500">Không có sản phẩm nào</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.map((prod) => (
              <ProductCard
                key={prod.productId}
                product={{
                  id: prod.productId,
                  name: prod.name,
                  image: prod.imageUrl,
                  price: prod.price,
                  originalPrice: prod.originalPrice ?? prod.price,
                  rating: prod.rating ?? 0,
                  reviews: prod.reviews ?? 0,
                  soldCount: prod.totalSold,
                  isNew: prod.isNew ?? false,
                }}
                showSoldCount
                onAddToCart={() => handleOpenModal(prod)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
