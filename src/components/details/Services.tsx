import { Truck, RotateCcw, Shield } from "lucide-react"

export function Services() {
  return (
    <section className="py-16 bg-gray-50 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Giao hàng miễn phí</h3>
            <p className="text-gray-600">Miễn phí vận chuyển cho đơn hàng trên 5 triệu đồng</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Đổi trả dễ dàng</h3>
            <p className="text-gray-600">Chính sách đổi trả trong vòng 30 ngày</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bảo hành chất lượng</h3>
            <p className="text-gray-600">Cam kết chất lượng cao cấp và bền bỉ</p>
          </div>
        </div>
      </div>
    </section>
  )
}
