import ProductCard from "./ProductCard"

interface Product {
  id: string | number
  name: string
  image?: string
  price: number
  originalPrice?: number
  rating: number
  reviews?: number
  soldCount?: number
  isNew?: boolean
}

interface ProductGridProps {
  title: string
  subtitle: string
  products?: Product[]
  showSoldCount?: boolean
  bgColor?: string
}

export default function ProductGrid({
  title,
  subtitle,
  products = [],
  showSoldCount = false,
  bgColor = "bg-white",
}: ProductGridProps) {
  return (
    <section className={`${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-0">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-0">{title}</h2>
            <p className="text-gray-600 text-lg">{subtitle}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} showSoldCount={showSoldCount} />
          ))}
        </div>
      </div>
    </section>
  )
}
