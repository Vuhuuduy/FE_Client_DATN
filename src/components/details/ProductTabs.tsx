"use client"
import { useState } from "react"

type ProductTabsProps = {
  description?: string
}

export function ProductTabs({ description }: ProductTabsProps) {
  const [tab, setTab] = useState<"description" | "review">("description")

  return (
    <div>
      <div className="border-b mb-4 flex gap-6">
        <button
          onClick={() => setTab("description")}
          className={`pb-2 font-semibold ${
            tab === "description" ? "border-b-2 border-black" : "text-gray-500"
          }`}
        >
          Mô tả
        </button>
        <button
          onClick={() => setTab("review")}
          className={`pb-2 font-semibold ${
            tab === "review" ? "border-b-2 border-black" : "text-gray-500"
          }`}
        >
          Đánh giá
        </button>
      </div>

      {tab === "description" && (
        <div className="text-gray-700 leading-relaxed">
          {description || "Nội dung mô tả đang được cập nhật."}
        </div>
      )}

      {tab === "review" && (
        <div className="text-gray-600">
          <p>Chưa có đánh giá nào cho sản phẩm này.</p>
        </div>
      )}
    </div>
  )
}
