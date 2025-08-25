import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/details/BreadCrumb";
import { ProductDescription } from "../components/details/ProductDescription";
import { ProductFeatures } from "../components/details/ProductFeatures";
import { ProductCare } from "../components/details/ProductCare";
import { Services } from "../components/details/Services";
import { ProductReviews } from "../components/details/ProductReviews";
import { RelatedProducts } from "../components/details/RelatedProducts";
import SizeGuideModal from "../components/details/SizeGuideModal";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import api from "../config/axios.customize";
import { IDiscount } from "../types/discount";
import ShopVoucher from "../components/details/ShopVoucher";

type Variant = {
  _id: string;
  name: string;
  image_URL?: string;
  additionalPrice: number;
  stock: number;
};

type Product = {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  brand: string;
  sku: string;
  colors: string[];
  sizes: string[];
  soldCount: number;
  vouchers: IDiscount[];
  isAccessory?: boolean;
  variants?: Variant[];
  stock?: number;
};

type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState<boolean>(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [totalStock, setTotalStock] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const raw = res.data?.data ?? res.data;

        const safeImages = Array.isArray(raw.images)
          ? raw.images
          : raw.imageUrl
          ? [raw.imageUrl]
          : raw.image
          ? [raw.image]
          : [];

        const safeVariants: Variant[] = Array.isArray(raw.variants)
          ? raw.variants.map((v: any) => ({
              _id: String(v._id),
              name: v.name || `${v.color} - ${v.size}`,
              image_URL: v.image_URL || raw.image || safeImages[0] || "",
              additionalPrice: Number(v.price) - Number(raw.price) || 0,
              stock: Number(v.stock_quantity) || 0,
            }))
          : [];

        const safeProduct: Product = {
          _id: raw._id,
          name: raw.name || "Sản phẩm không tên",
          price: Number(raw.price) || 0,
          originalPrice: Number(raw.originalPrice) || 0,
          image: raw.image || safeImages[0] || "",
          images: safeImages,
          rating: Number(raw.rating) || 0,
          reviews: Number(raw.reviews) || 0,
          brand: raw.brand || "",
          sku: raw.sku || "",
          colors:
            raw.colors && raw.colors.length
              ? raw.colors
              : ["Trắng", "Đen", "Xám", "Kaki"],
          sizes:
            raw.sizes && raw.sizes.length
              ? raw.sizes
              : ["S", "M", "L", "XL"],
          soldCount: Number(raw.soldCount) || 0,
          vouchers: raw.vouchers || [],
          isAccessory: raw.isAccessory || false,
          variants: safeVariants,
          stock: Number(raw.stock) || 0,
        };

        setProduct(safeProduct);
        setMainImage(safeProduct.images[0] || safeProduct.image || "");
        setSelectedColor(safeProduct.colors[0] || "");
        setSelectedSize(safeProduct.sizes[0] || "");

        const total =
          safeVariants.reduce(
            (sum, v) => sum + (v.stock || 0),
            safeProduct.stock || 0
          ) || 0;
        setTotalStock(total);
      } catch (error) {
        console.error("Lỗi khi load sản phẩm:", error);
        toast.error("Không tìm thấy sản phẩm.");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-10 text-red-500">
        Đang tải sản phẩm...
      </div>
    );
  }

  const displayPrice = selectedVariant
    ? product.price + selectedVariant.additionalPrice
    : product.price;

  const maxStock = selectedVariant?.stock ?? product.stock ?? 100;

  const handleAddToCart = () => {
    if (quantity > maxStock) {
      toast.error("Số lượng vượt quá tồn kho.");
      return;
    }

    const item: CartItem = {
      _id: String(product._id),
      name:
        product.name + (selectedVariant ? ` (${selectedVariant.name})` : ""),
      price: displayPrice,
      image: mainImage,
      color: selectedColor,
      size: selectedSize,
      quantity,
    };
    addToCart(item);
    toast.success("🛒 Đã thêm vào giỏ hàng!");
  };

  const handleBuyNow = () => {
    if (quantity > maxStock) {
      toast.error("Số lượng vượt quá tồn kho.");
      return;
    }

    const item: CartItem = {
      _id: String(product._id),
      name:
        product.name + (selectedVariant ? ` (${selectedVariant.name})` : ""),
      price: displayPrice,
      image: mainImage,
      color: selectedColor,
      size: selectedSize,
      quantity,
    };
    addToCart(item);
    navigate("/checkout", { state: { cartItems: [item] } });
  };

  const variantOptions: Variant[] = [
    {
      _id: "original",
      name: "Sản phẩm gốc",
      image_URL: product.image,
      additionalPrice: 0,
      stock: product.stock || 0,
    },
    ...(product.variants || []),
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <BreadCrumb productName={product.name} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Hình ảnh */}
        <div className="relative">
          <img
            src={mainImage}
            alt="Main"
            className={`w-full h-[450px] object-cover rounded-xl border ${
              maxStock === 0 ? "opacity-50" : ""
            }`}
          />
          {maxStock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl">
              <span className="text-white font-bold text-xl">Hết hàng</span>
            </div>
          )}
          {variantOptions.length > 0 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {variantOptions.map((variant) => (
                <div
                  key={variant._id}
                  onClick={() => {
                    if (variant.stock === 0) return;
                    if (variant._id === "original") {
                      setSelectedVariant(null);
                      setMainImage(product.image);
                    } else {
                      setSelectedVariant(variant);
                      if (variant.image_URL) setMainImage(variant.image_URL);
                    }
                  }}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200
                    ${variant.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}
                    ${
                      (variant._id === "original" && !selectedVariant) ||
                      selectedVariant?._id === variant._id
                        ? "border-orange-500"
                        : "border-gray-300"
                    }`}
                >
                  <img
                    src={variant.image_URL || product.image}
                    alt={variant.name}
                    className="w-full h-full object-cover"
                  />
                  {variant.stock === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-xs">
                      Hết hàng
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Thông tin */}
        <div className="flex flex-col gap-3">
          <ShopVoucher vouchers={product.vouchers} />

          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-xl text-red-500 font-bold">
            {displayPrice.toLocaleString("vi-VN")} ₫
          </p>
          <p className="text-sm text-gray-500">
            Tổng tồn kho: {totalStock} sản phẩm
          </p>

          {/* Màu sắc */}
          <div>
            <p className="font-medium mb-1">Màu sắc:</p>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 border rounded-full ${
                    selectedColor === color
                      ? "bg-black text-white border-black"
                      : "border-gray-300"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <div className="flex items-center gap-4 mb-1">
              <p className="font-medium">Chọn size:</p>
            </div>
            <div className="flex gap-3 mb-1">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-1 border rounded ${
                    selectedSize === s
                      ? "bg-black text-white border-black"
                      : "border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              className="text-sm text-blue-600 underline"
              onClick={() => setIsSizeModalOpen(true)}
            >
              Hướng dẫn chọn size
            </button>
            <SizeGuideModal
              open={isSizeModalOpen}
              onClose={() => setIsSizeModalOpen(false)}
            />
          </div>

          {/* Số lượng */}
          <div>
            <p className="font-medium mb-1">Số lượng:</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 border rounded flex items-center justify-center text-lg"
              >
                -
              </button>
              <span className="w-10 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                className="w-8 h-8 border rounded flex items-center justify-center text-lg"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Tối đa: {maxStock} sản phẩm
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleAddToCart}
              disabled={maxStock === 0}
              className={`flex-1 py-2 rounded text-sm ${
                maxStock === 0
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              Thêm vào giỏ hàng
            </button>
            <button
              onClick={handleBuyNow}
              disabled={maxStock === 0}
              className={`flex-1 py-2 rounded text-sm ${
                maxStock === 0
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              Mua Ngay
            </button>
          </div>
        </div>
      </div>

      {/* Nội dung mô tả */}
      <div className="mt-16 space-y-16">
        <ProductDescription description="Đây là mô tả sản phẩm chi tiết." />
        <ProductFeatures />
        <ProductCare />
        <ProductReviews productId={product._id} rating={product.rating} reviewCount={product.reviewCount} />

        <Services />
        <RelatedProducts products={[]} />
      </div>
    </div>
  );
}
