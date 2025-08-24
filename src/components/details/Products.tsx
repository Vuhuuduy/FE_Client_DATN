export interface Voucher {
  title: string
  condition: string
  expiry: string
}

export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  brand: string
  sku: string
  colors: string[]
  sizes: string[]
  soldCount: number
  vouchers: Voucher[]
}

export const products: Product[] = [
  {
    id: 1,
    name: "Áo Sơ Mi Premium Cotton",
    price: 2890000,
    originalPrice: 3200000,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",
    rating: 5,
    reviews: 24,
    brand: "Thời Trang Cao Cấp",
    sku: "SKU-0001",
    colors: ["Trắng", "Xanh nhạt", "Hồng"],
    sizes: ["S", "M", "L", "XL"],
    soldCount: 250,
    vouchers: [
      { title: "Giảm ₫20k", condition: "Đơn tối thiểu ₫150k", expiry: "31.07.2025" },
      { title: "Giảm ₫40k", condition: "Đơn tối thiểu ₫437k", expiry: "31.07.2025" },
      { title: "Giảm 12% - Giảm tối đa ₫35k", condition: "Đơn tối thiểu ₫150k", expiry: "21.07.2025" },
    ],
  },
  {
    id: 2,
    name: "Vest Wool Cao Cấp",
    price: 8900000,
    originalPrice: 9500000,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    rating: 5,
    reviews: 18,
    brand: "Thời Trang Doanh Nhân",
    sku: "SKU-0002",
    colors: ["Đen", "Xám", "Navy"],
    sizes: ["M", "L", "XL", "XXL"],
    soldCount: 190,
    vouchers: [
      { title: "Giảm ₫50k", condition: "Đơn từ ₫800k", expiry: "31.07.2025" },
      { title: "Giảm 10% - Tối đa ₫100k", condition: "Đơn từ ₫1 triệu", expiry: "31.07.2025" },
    ],
  },
  {
    id: 3,
    name: "Vest Wool Cao Cấp",
    price: 8900000,
    originalPrice: 9500000,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    rating: 5,
    reviews: 18,
    brand: "Thời Trang Doanh Nhân",
    sku: "SKU-0002",
    colors: ["Đen", "Xám", "Navy"],
    sizes: ["M", "L", "XL", "XXL"],
    soldCount: 190,
    vouchers: [
      { title: "Giảm ₫50k", condition: "Đơn từ ₫800k", expiry: "31.07.2025" },
      { title: "Giảm 10% - Tối đa ₫100k", condition: "Đơn từ ₫1 triệu", expiry: "31.07.2025" },
    ],
  },
  {
    id: 4,
    name: "Vest Wool Cao Cấp",
    price: 8900000,
    originalPrice: 9500000,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    rating: 5,
    reviews: 18,
    brand: "Thời Trang Doanh Nhân",
    sku: "SKU-0002",
    colors: ["Đen", "Xám", "Navy"],
    sizes: ["M", "L", "XL", "XXL"],
    soldCount: 190,
    vouchers: [
      { title: "Giảm ₫50k", condition: "Đơn từ ₫800k", expiry: "31.07.2025" },
      { title: "Giảm 10% - Tối đa ₫100k", condition: "Đơn từ ₫1 triệu", expiry: "31.07.2025" },
    ],
  },
  {
    id: 5,
    name: "Vest Wool Cao Cấp",
    price: 8900000,
    originalPrice: 9500000,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    rating: 5,
    reviews: 18,
    brand: "Thời Trang Doanh Nhân",
    sku: "SKU-0002",
    colors: ["Đen", "Xám", "Navy"],
    sizes: ["M", "L", "XL", "XXL"],
    soldCount: 190,
    vouchers: [
      { title: "Giảm ₫50k", condition: "Đơn từ ₫800k", expiry: "31.07.2025" },
      { title: "Giảm 10% - Tối đa ₫100k", condition: "Đơn từ ₫1 triệu", expiry: "31.07.2025" },
    ],
  },
  // Các sản phẩm khác giữ nguyên như đã có...
  // Bỏ qua ở đây do quá dài, bạn có thể copy từ phần trước và dán vào tiếp tục
]
