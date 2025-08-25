import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8888/api/categories/active");
        setCategories(res.data.data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">🧭 Danh mục nổi bật</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Khám phá các sản phẩm chất lượng từ các bộ sưu tập hàng đầu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category: any, index) => (
            <Link
              to={`/category/${category.slug}`}
              key={index}
              className="group overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-80">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-2xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
