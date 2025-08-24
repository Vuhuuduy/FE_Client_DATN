import { IDiscount } from "../types/discount";
import { useVoucherContext } from "../context/VoucherContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function MyVoucher() {
  const { vouchers, selectedVoucher, setSelectedVoucher } = useVoucherContext();
  const navigate = useNavigate();

  const applyVoucher = (voucher: any) => {
    const discount: IDiscount =
      typeof voucher.discountId === "string"
        ? ({} as IDiscount)
        : voucher.discountId;

    if (!discount || !discount._id) return;

    // ✅ chỉ set voucher vào context
    setSelectedVoucher(voucher);
    toast.success(`Đã chọn voucher: ${discount.code}`);

    // ✅ chuyển sang AllProduct
    navigate("/allproduct");
  };

  return (
    <div className="mt-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🎟️ Mã giảm giá của bạn</h2>

      {vouchers.length === 0 ? (
        <p className="text-gray-500">Bạn chưa lưu voucher nào.</p>
      ) : (
        <ul className="space-y-4">
          {vouchers.map((v) => {
            const discount: IDiscount =
              typeof v.discountId === "string"
                ? ({} as IDiscount)
                : v.discountId;

            if (!discount || !discount._id) return null;

            const isSelected =
              selectedVoucher?._id === v._id ||
              (typeof selectedVoucher?.discountId === "string"
                ? selectedVoucher.discountId === v.discountId
                : selectedVoucher?.discountId?._id === discount._id);

            return (
              <li
                key={v._id}
                className="border rounded-lg shadow-sm bg-white overflow-hidden hover:shadow-md transition"
              >
                <div className="flex justify-between items-center p-4 bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {discount.code}
                    </p>
                    <p className="text-sm text-gray-500">
                      Giảm{" "}
                      {discount.discount_type === "%"
                        ? `${discount.discount_value || 0}%`
                        : `${Number(discount.discount_value || 0).toLocaleString()}đ`}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Đơn tối thiểu:{" "}
                      {Number(discount.minOrderValue || 0).toLocaleString()}đ
                    </p>
                  </div>
                  <button
                    onClick={() => applyVoucher(v)}
                    className={`px-4 py-2 rounded font-medium transition ${
                      isSelected
                        ? "bg-green-500 text-white"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                  >
                    {isSelected ? "Dùng ngay" : "Dùng ngay"}
</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}