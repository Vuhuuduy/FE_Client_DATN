import { Truck, RotateCcw, Shield, LucideIcon } from "lucide-react"

interface Service {
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: Truck,
    title: "Giao hàng miễn phí",
    description: "Miễn phí vận chuyển cho đơn hàng trên 5 triệu đồng",
  },
  {
    icon: RotateCcw,
    title: "Đổi trả dễ dàng",
    description: "Chính sách đổi trả trong vòng 30 ngày",
  },
  {
    icon: Shield,
    title: "Bảo hành chất lượng",
    description: "Cam kết chất lượng cao cấp và bền bỉ",
  },
]

export default function Services() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
