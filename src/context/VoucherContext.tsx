import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import {
  getUserVouchers,
  assignVoucherToUser,
  useVoucher,
} from "../services/voucherService";
import { IUserVoucher } from "../types/discount";

interface VoucherContextType {
  allVouchers: IUserVoucher[];
  vouchers: IUserVoucher[];
  takenVoucherIds: string[];
  selectedVoucher: IUserVoucher | null;
  setSelectedVoucher: (voucher: IUserVoucher | null) => void;
  addVoucher: (discountId: string) => Promise<IUserVoucher | null>;
  markVoucherUsed: (discountId: string) => Promise<void>;
  fetchUserVouchers: () => Promise<void>;   // 👈 thêm vào context
}

const VoucherContext = createContext<VoucherContextType | undefined>(undefined);

const extractVoucherData = (res: any): IUserVoucher[] => {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.data?.data)) return res.data.data;
  return [];
};

export const VoucherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [allVouchers, setAllVouchers] = useState<IUserVoucher[]>([]);
  const [vouchers, setVouchers] = useState<IUserVoucher[]>([]);
  const [takenVoucherIds, setTakenVoucherIds] = useState<string[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<IUserVoucher | null>(
    null
  );

  // 📌 Load voucher user khi login
  const fetchUserVouchers = async () => {
    if (!user?._id) {
      setAllVouchers([]);
      setVouchers([]);
      setTakenVoucherIds([]);
      setSelectedVoucher(null);
      return;
    }

    try {
      const res = await getUserVouchers(user._id);
      const voucherData = extractVoucherData(res);

      setAllVouchers(voucherData);
      setVouchers(voucherData.filter((v) => !v.used));

      const ids = voucherData.map((v) =>
        typeof v.discountId === "string" ? v.discountId : v.discountId._id
      );
      setTakenVoucherIds(ids);

      // validate selectedVoucher
      if (selectedVoucher) {
        const stillExists = voucherData.some(
          (v) =>
            (typeof v.discountId === "string"
              ? v.discountId
              : v.discountId._id) ===
            (typeof selectedVoucher.discountId === "string"
              ? selectedVoucher.discountId
              : selectedVoucher.discountId?._id)
        );
        if (!stillExists) setSelectedVoucher(null);
      }
    } catch (err) {
      console.error("❌ fetchUserVouchers error:", err);
      setAllVouchers([]);
      setVouchers([]);
      setTakenVoucherIds([]);
      setSelectedVoucher(null);
    }
  };

  useEffect(() => {
    fetchUserVouchers();
  }, [user?._id]);

  // 📌 Thêm voucher cho user
  const addVoucher = async (discountId: string) => {
    if (!user?._id) return null;
    try {
      const res = await assignVoucherToUser(user._id, discountId);
      const data: IUserVoucher = res?.data?.data || res?.data || res;

      if (!data || !data._id) return null;

      // 👉 thay vì chỉ update state cục bộ, gọi lại fetch để đồng bộ chắc chắn
      await fetchUserVouchers();

      // nếu chưa dùng thì chọn luôn
      if (!data.used) setSelectedVoucher(data);

      return data;
    } catch (err) {
      console.error("❌ addVoucher error:", err);
      return null;
    }
  };

  // 📌 Đánh dấu voucher đã dùng
const markVoucherUsed = async (discountId: string) => {
  if (!user?._id) return;
  try {
    // Gọi API
    await useVoucher(user._id, discountId);

    // 👉 Update local state ngay lập tức
    setVouchers((prev) => prev.filter((v) => {
      const id = typeof v.discountId === "string" ? v.discountId : v.discountId._id;
      return id !== discountId;
    }));

    setAllVouchers((prev) =>
      prev.map((v) => {
        const id = typeof v.discountId === "string" ? v.discountId : v.discountId._id;
        if (id === discountId) return { ...v, used: true };
        return v;
      })
    );

    // Nếu voucher đang chọn thì clear nó
    if (selectedVoucher) {
      const sId =
        typeof selectedVoucher.discountId === "string"
          ? selectedVoucher.discountId
          : selectedVoucher.discountId?._id;
      if (sId === discountId) setSelectedVoucher(null);
    }

    // 👉 Sau đó gọi fetch để đồng bộ lại với BE
    fetchUserVouchers();
  } catch (err) {
    console.error("❌ markVoucherUsed error:", err);
  }
};


  return (
    <VoucherContext.Provider
      value={{
        allVouchers,
        vouchers,
        takenVoucherIds,
        selectedVoucher,
        setSelectedVoucher,
        addVoucher,
        markVoucherUsed,
        fetchUserVouchers,   // 👈 export ra cho FE khác xài được
      }}
    >
      {children}
    </VoucherContext.Provider>
  );
};

export const useVoucherContext = () => {
  const context = useContext(VoucherContext);
  if (!context) throw new Error("useVoucherContext phải trong VoucherProvider");
  return context;
};
