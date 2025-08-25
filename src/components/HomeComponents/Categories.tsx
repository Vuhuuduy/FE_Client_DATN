import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <div className="relative px-6 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Danh mục nổi bật</h2>

      {/* Nút cuộn trái/phải */}
      <Button
        icon={<LeftOutlined />}
        onClick={scrollLeft}
        className="category-scroll-left"
        style={{
          position: "absolute",
          left: -10,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      />
      <Button
        icon={<RightOutlined />}
        onClick={scrollRight}
        className="category-scroll-right"
        style={{
          position: "absolute",
          right: -10,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      />

      {/* Slider: max 3 card hiển thị */}
      <div className="flex justify-center">
  <div
    ref={scrollRef}
    className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
    style={{ width: "calc(300px * 3 + 2 * 16px)" }}
  >
    {categories.map((category: any) => (
      <Link key={category._id} to={`/category/${category.slug}`}>
        <div className="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-[300px] shrink-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={category.imageUrl || "https://placehold.co/300x320?text=No+Image"}
              alt={category.name}
              className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 truncate">
              {category.name}
            </h3>
            {category.description && (
              <p className="text-sm text-gray-500 line-clamp-2">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>

    </div>
  );
};

export default CategorySlider;
