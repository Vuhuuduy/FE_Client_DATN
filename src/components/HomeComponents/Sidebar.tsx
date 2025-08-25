import { FaStar, FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import api from "../../config/axios.customize"; // axios instance đã setup

// ==== Kiểu dữ liệu ====
type Category = {
  _id: string;
  name: string;
};

type FilterType = {
  category: string[];
  price: string[];
  rating: number[];
};

type SidebarProps = {
  onFilterChange: (filters: FilterType) => void;
};

// ==== Component Sidebar ====
export default function Sidebar({ onFilterChange }: SidebarProps) {
  const ratings = [5, 4, 3, 2, 1];

  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<FilterType>({
    category: [],
    price: [],
    rating: [],
  });

  // Lấy categories từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        const list: Category[] = res.data?.data ?? [];
        setCategories(list);
      } catch (err) {
        console.error("Lỗi load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Bật/tắt checkbox
  const handleCheckbox = (type: keyof FilterType, value: string | number) => {
    const isChecked = filters[type].includes(value as never);
    const updated = isChecked
      ? filters[type].filter((v) => v !== value)
      : [...filters[type], value];

    const newFilters = { ...filters, [type]: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <aside className="w-[240px] shrink-0">
      <h3 className="font-semibold mb-4 text-base">BỘ LỌC TÌM KIẾM</h3>

      {/* Danh mục */}
      <div className="mb-6">
        <p className="font-medium text-sm mb-2">Danh Mục</p>
        <div className="space-y-1 text-sm">
          {categories.map((cat) => (
            <label className="block" key={cat._id}>
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.category.includes(cat._id)}
                onChange={() => handleCheckbox("category", cat._id)}
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      {/* Khoảng giá */}
      <div className="mb-6">
        <p className="font-medium text-sm mb-2">Khoảng giá</p>
        <div className="space-y-1 text-sm">
          {["0-100000", "100000-300000", "300000-500000", "500000-999999999"].map(
            (range, idx) => (
              <label className="block" key={range}>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={filters.price.includes(range)}
                  onChange={() => handleCheckbox("price", range)}
                />
                {[
                  "Dưới 100.000đ",
                  "100.000đ - 300.000đ",
                  "300.000đ - 500.000đ",
                  "Trên 500.000đ",
                ][idx]}
              </label>
            )
          )}
        </div>
      </div>

      {/* Đánh giá */}
      <div>
        <p className="font-medium text-sm mb-2">Đánh giá</p>
        <div className="space-y-2 text-sm">
          {ratings.map((rating) => (
            <label className="flex items-center" key={rating}>
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.rating.includes(rating)}
                onChange={() => handleCheckbox("rating", rating)}
              />
              <span className="flex items-center text-yellow-500">
                {Array.from({ length: 5 }).map((_, index) =>
                  index < rating ? (
                    <FaStar key={index} />
                  ) : (
                    <FaRegStar key={index} />
                  )
                )}
                <span className="ml-1 text-black">trở lên</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
