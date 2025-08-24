import React, { useEffect, useState } from "react";
import { getAllDiscounts } from "../../services/voucherService";
import { useVoucherContext } from "../../context/VoucherContext";
import { IDiscount } from "../../types/discount";
import { ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";

export default function ShopVoucher() {
  const [discounts, setDiscounts] = useState<IDiscount[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [openVoucher, setOpenVoucher] = useState<string | null>(null);

  const {
    addVoucher,
    selectedVoucher,
    takenVoucherIds, // danh sách voucher đã claim
  } = useVoucherContext();

  // =========================
  // FETCH VOUCHERS TỪ BE
  // =========================
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const res = await getAllDiscounts();
        const discountsData: IDiscount[] =
          Array.isArray(res)
            ? res
            : Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res?.data?.data)
            ? res.data.data
            : [];
        setDiscounts(discountsData);
      } catch (err) {
        console.error("❌ Lỗi khi load discounts:", err);
        setDiscounts([]);
      }
    };
    fetchDiscounts();
  }, []);

  // =========================
  // FILTER CHỈ CÒN VOUCHER CHƯA CLAIM
  // =========================
  const availableDiscounts = discounts.filter(
    (discount) => !takenVoucherIds.includes(String(discount._id))
  );

  // =========================
  // HANDLE GET VOUCHER
  // =========================
  const handleGetVoucher = async (discountId: string) => {
    try {
      const newVoucher = await addVoucher(discountId);
      if (newVoucher) {
        toast.success("🎉 Nhận voucher thành công!");
        // Cập nhật lại danh sách voucher => bỏ voucher đã nhận
        setDiscounts((prev) =>
          prev.filter((d) => String(d._id) !== discountId)
        );
      } else {
        toast.error("❌ Không thể nhận voucher này!");
      }
    } catch (err) {
      console.error("❌ handleGetVoucher error:", err);
      toast.error("Đã xảy ra lỗi khi nhận voucher!");
    }
  };

  // id voucher đang chọn
  const selectedId =
    typeof selectedVoucher?.discountId === "string"
      ? selectedVoucher.discountId
      : selectedVoucher?.discountId?._id || "";

  return (
    <div className="p-4">
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="text-xl font-semibold mb-2">🎟️ Shop Vouchers</h2>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </div>

      {/* Danh sách vouchers */}
      {expanded && (
        <div className="mt-3 space-y-3">
{availableDiscounts.map((discount) => {
            const dId = String(discount._id);
            const isOpen = openVoucher === dId;
            const isSelected = selectedId === dId;

            return (
              <div
                key={dId}
                className="border rounded-xl shadow-sm bg-white transition"
              >
                {/* Header voucher */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => setOpenVoucher(isOpen ? null : dId)}
                >
                  <div>
                    <h3 className="font-bold text-lg">{discount.code}</h3>
                    <p className="text-sm text-gray-500">
                      {discount.discount_type === "%"
                        ? `${discount.discount_value}%`
                        : `${discount.discount_value.toLocaleString()}đ`}{" "}
                      | Đơn tối thiểu {discount.minOrderValue.toLocaleString()}đ
                    </p>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>

                {/* Nội dung mở rộng */}
                {isOpen && (
                  <div className="px-4 pb-4 text-sm text-gray-700 space-y-2">
                    <p>
                      HSD:{" "}
                      {discount.date?.[1]
                        ? new Date(discount.date[1]).toLocaleDateString("vi-VN")
                        : "Không rõ"}
                    </p>

                    <button
                      onClick={() => handleGetVoucher(dId)}
                      className="mt-1 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      + Lấy voucher
                    </button>

                    {isSelected && (
                      <span className="block text-purple-600 font-medium">
                        ⭐ Đang chọn
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {availableDiscounts.length === 0 && (
            <p className="text-gray-500">
              Hiện tại không còn voucher nào để lấy
            </p>
          )}
        </div>
      )}
    </div>
  );
}