"use client"
import { useState } from "react"
import { Share2 } from "lucide-react"

type ProductImageGalleryProps = {
  images?: string[]
  productName?: string
}

export function ProductImageGallery({ images = [], productName = "Sản phẩm" }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const fallbackImage = "https://placehold.co/300x400?text=No+Image"

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-lg bg-gray-100">
        <img
          src={images[selectedImage] || fallbackImage}
          alt={productName}
          className="w-full h-[600px] object-cover"
        />
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative overflow-hidden rounded-lg border-2 transition-colors ${
                selectedImage === index ? "border-black" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={img || fallbackImage}
                alt={`${productName} ${index + 1}`}
                className="w-full h-24 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
