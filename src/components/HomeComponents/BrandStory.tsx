import { motion } from "framer-motion"

export default function BrandStory() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Câu chuyện <span className="text-amber-500">thương hiệu</span>
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Từ năm <span className="text-white font-medium">2010</span>, <strong>FASHION LUXURY</strong> đã không
              ngừng kiến tạo những trang phục nam cao cấp, kết hợp giữa nghệ thuật thời trang cổ điển và xu hướng hiện đại.
            </p>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              Với đội ngũ thiết kế tài năng và chất liệu cao cấp được tuyển chọn kỹ lưỡng, mỗi sản phẩm đều mang trong
              mình sự hoàn hảo về <strong>chất lượng</strong> và <strong>phong cách</strong>.
            </p>
            <button className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:opacity-90 text-black px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 shadow-md">
              Tìm hiểu thêm
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop"
              alt="Brand Story"
              className="rounded-xl w-full shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
