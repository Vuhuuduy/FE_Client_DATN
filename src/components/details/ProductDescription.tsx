type Props = {
  description: string
}

export function ProductDescription({ description }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Mô tả sản phẩm</h3>
      <p className="text-gray-600">{description}
        Sản phẩm được làm từ chất liệu cao cấp, thiết kế hiện đại, tôn dáng và phù hợp với nhiều hoàn cảnh sử dụng như đi làm, dự tiệc, hay đi chơi.
      </p>
    </div>
  )
}
