import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  colors: string[];
  sizes: string[];
  onConfirm: (color: string, size: string, quantity: number) => void;
  onClose: () => void;
};

const DEFAULT_COLORS = ["đen", "trắng", "xám", "kaki"];
const DEFAULT_SIZES = ["S", "M", "L", "XL"];

export default function ProductOptionSelect({
  colors,
  sizes,
  onConfirm,
  onClose,
}: Props) {
  const actualColors = colors.length > 0 ? colors : DEFAULT_COLORS;
  const actualSizes = sizes.length > 0 ? sizes : DEFAULT_SIZES;

  const [selectedColor, setSelectedColor] = useState(actualColors[0]);
  const [selectedSize, setSelectedSize] = useState(actualSizes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleConfirm = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Vui lòng chọn đầy đủ màu sắc và kích thước!");
      return;
    }

    onConfirm(selectedColor, selectedSize, quantity);
    toast.success("🛒 Thêm vào giỏ hàng thành công!");
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[350px] shadow">
        <h3 className="text-lg font-semibold mb-4">Chọn tuỳ chọn</h3>

        {/* Màu sắc */}
        <div className="mb-4">
          <p className="font-medium mb-1">Màu sắc:</p>
          <div className="flex gap-3 flex-wrap">
            {actualColors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 border rounded-full text-sm capitalize ${
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

        {/* Kích thước */}
        <div className="mb-4">
          <p className="font-medium mb-1">Chọn size:</p>
          <div className="flex gap-3 flex-wrap">
            {actualSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-1 border rounded text-sm uppercase ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Số lượng */}
        <div className="mb-4">
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
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 border rounded flex items-center justify-center text-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* Hành động */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-300 text-black px-4 py-1 rounded"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="bg-black text-white px-4 py-1 rounded"
            onClick={handleConfirm}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
