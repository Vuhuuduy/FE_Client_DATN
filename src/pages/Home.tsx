import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Components
import Hero from "../components/HomeComponents/Hero";
import Categories from "../components/HomeComponents/Categories";
import BrandStory from "../components/HomeComponents/BrandStory";
import Services from "../components/HomeComponents/Services";
import Newsletter from "../components/HomeComponents/Newsletter";
import ProductCard from "../components/HomeComponents/ProductCard";
import AllProducts from "../components/HomeComponents/AllProducts";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        console.log("API response:", res.data);

        // Điều chỉnh tuỳ thuộc vào cấu trúc dữ liệu thực tế
        const productList = res.data?.data || res.data?.products || [];

        setProducts(productList);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero section */}
      <Hero />

      {/* Categories */}
      <Categories />

      {/* Tất cả sản phẩm */}
      {/* <div className="py-10 px-4 md:px-8 lg:px-16">
        <h2 className="text-2xl font-bold mb-6">Tất cả sản phẩm</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard
                key={product._id}
                product={product}
                showSoldCount
              />
            ))
          ) : (
            <p>Đang tải sản phẩm hoặc không có sản phẩm nào.</p>
          )}
        </div>
      </div> */}
      < AllProducts/>

      {/* Brand Story */}
      <BrandStory />

      {/* Services */}
      <Services />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;
