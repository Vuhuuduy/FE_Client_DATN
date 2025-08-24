import api from "../config/axios.customize";
import { IDiscount, IUserVoucher } from "../types/discount";

// ======================
// VOUCHER SERVICE
// ======================

// Lấy danh sách tất cả voucher (admin hoặc user)
export const getAllDiscounts = async () => {
  try {
    const res = await api.get<IDiscount[]>("/discounts");
    console.log("✅ getAllDiscounts response:", res.data);
    return res;
  } catch (err: any) {
    console.error("❌ getAllDiscounts error:", err.response?.data || err.message);
    throw err;
  }
};

// Lấy voucher của 1 user
export const getUserVouchers = async (userId: string) => {
  try {
    console.log("➡️ getUserVouchers gọi với userId:", userId);
    const res = await api.get<IUserVoucher[]>(`/voucher/${userId}`);
    console.log("✅ getUserVouchers response:", res.data);
    return res;
  } catch (err: any) {
    console.error("❌ getUserVouchers error:", err.response?.data || err.message);
    throw err;
  }
};

// Gán voucher cho user (phát voucher)
export const assignVoucherToUser = async (userId: string, discountId: string) => {
  try {
    console.log("➡️ assignVoucherToUser payload:", { userId, discountId });
    const res = await api.post<IUserVoucher>(`/voucher/${userId}`, {
      discountId, // body phải có discountId
    });
    console.log("✅ assignVoucherToUser response:", res.data);
    return res;
  } catch (err: any) {
    console.error("❌ assignVoucherToUser error:", err.response?.data || err.message);
    throw err;
  }
};

// Xóa voucher của user
export const removeVoucherFromUser = async (userId: string, discountId: string) => {
  try {
    console.log("➡️ removeVoucherFromUser gọi:", { userId, discountId });
    const res = await api.delete(`/voucher/${userId}/${discountId}`);
    console.log("✅ removeVoucherFromUser response:", res.data);
    return res;
  } catch (err: any) {
    console.error("❌ removeVoucherFromUser error:", err.response?.data || err.message);
    throw err;
  }
};

// Đánh dấu voucher đã dùng
export const useVoucher = async (userId: string, discountId: string) => {
  try {
    console.log("➡️ useVoucher gọi:", { userId, discountId });
    const res = await api.patch<IUserVoucher>(`/voucher/${userId}/${discountId}/use`);
    console.log("✅ useVoucher response:", res.data);
    return res;
  } catch (err: any) {
    console.error("❌ useVoucher error:", err.response?.data || err.message);
    throw err;
  }
};