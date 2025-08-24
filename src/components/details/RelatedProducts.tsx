import { Star, Heart } from "lucide-react"

type Product = {
  id: string | number
  name: string
  image?: string
  price: number
  originalPrice?: number
  rating: number // từ 0 đến 5
}

type RelatedProductsProps = {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Sản phẩm liên quan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
                  Thêm vào giỏ
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < product.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
