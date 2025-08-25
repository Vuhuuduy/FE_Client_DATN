import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/HomeComponents/Sidebar";
import ProductGrid from "../components/HomeComponents/ProductGrid";

interface Product {
  id: string;
  name: string;
  imageUrl?: string;
  price: number;
  stock: number;
  category?: { name: string };
  rating?: number;
}

interface Filters {
  category: string[];
  price: string[];
  rating: number[];
}

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function SearchPage() {
  const query = useQuery();
  const keyword = query.get("keyword")?.toLowerCase() || "";

  const [filters, setFilters] = useState<Filters>({
    category: [],
    price: [],
    rating: [],
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params: any = {};
        if (keyword) params.keyword = keyword;
        if (filters.category.length > 0) params.category = filters.category.join(",");
        if (filters.price.length > 0) params.price = filters.price.join(",");
        if (filters.rating.length > 0) params.rating = filters.rating.join(",");

        const res = await axios.get("http://localhost:8888/api/search", { params });

        if (res.data.success) {
          const mapped = res.data.data.map((p: any) => ({
            id: p._id,
            name: p.name,
            imageUrl: p.imageUrl,
            price: p.price,
            stock: p.stock,
            category: p.category,
            rating: p.rating,
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error("Search API error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, filters]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Sidebar onFilterChange={setFilters} />
        </div>
        <div className="col-span-9">
          {loading ? (
            <p className="text-center py-10">Đang tải...</p>
          ) : (
            <ProductGrid
              products={products}
              title={keyword ? `Kết quả cho "${keyword}"` : "Tất cả sản phẩm"}
              subtitle=""
            />
          )}
        </div>
      </div>
    </div>
  );
}
