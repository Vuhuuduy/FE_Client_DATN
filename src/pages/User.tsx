// src/pages/UserPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { fetchUserById, updateUser, changePassword } from "../services/authService"; // ✅ thêm changePassword
import { fetchOrdersByUser } from "../services/orderService";
import { useAuth } from "../context/AuthContext";

import type { IUser } from "../types/auth";
import type { IOrder } from "../types/order";
import OrderHistory from "../components/HomeComponents/OrderHistory";
import { useVoucherContext } from "../context/VoucherContext";

const UserPage = () => {
  const navigate = useNavigate();
  const { user: authUser, token, logout, login } = useAuth();
  const { vouchers: savedVouchers } = useVoucherContext();
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [editForm, setEditForm] = useState<Partial<IUser>>({});
  const [isEditing, setIsEditing] = useState(false);

  // 🔑 State đổi mật khẩu
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showChangePass, setShowChangePass] = useState(false);

  useEffect(() => {
    setIsAuthLoaded(true);
  }, []);

  useEffect(() => {
    if (!authUser?._id || !token) {
      toast.error("Bạn chưa đăng nhập");
      navigate("/login");
      return;
    }

    // Lấy thông tin user
    fetchUserById(authUser._id)
      .then((res) => {
        const userData: IUser = {
          ...res.data,
          address: Array.isArray(res.data.address) ? res.data.address : [],
        };
        setUser(userData);
        setEditForm(userData);
      })
      .catch(() => {
        toast.error("Phiên đăng nhập đã hết hạn.");
        logout();
        navigate("/login");
      });

    // Lấy lịch sử đơn hàng
    fetchOrdersByUser(authUser._id)
      .then((res) => {
        if (res.data && Array.isArray(res.data.orders)) {
          setOrders(res.data.orders);
        } else if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          setOrders([]);
        }
      })
      .catch(() => toast.error("Không tải được đơn hàng."));
  }, [authUser, token, navigate, logout]);

  // Hàm lưu thay đổi thông tin
  const handleSave = async () => {
    if (!user?._id || !token) return;

    try {
      const res = await updateUser(user._id, editForm, token);
      toast.success("Cập nhật thành công!");

      const updatedUser: IUser = {
        ...user,
        ...res.data,
        address: Array.isArray(res.data?.address)
          ? res.data.address
          : user.address || [],
      };

      setUser(updatedUser);
      setEditForm(updatedUser);
      setIsEditing(false);

      login(updatedUser, token);
    } catch (error) {
      console.error("Update user failed:", error);
      toast.error("Cập nhật thất bại.");
    }
  };

  // Hàm đổi mật khẩu
  const handleChangePassword = async () => {
    if (!user?._id || !token) return;

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      await changePassword(user._id, { oldPassword, newPassword }, token);
      toast.success("Đổi mật khẩu thành công!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowChangePass(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Đổi mật khẩu thất bại");
    }
  };

  if (!isAuthLoaded) return <p>Đang tải...</p>;
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Thông tin cá nhân</h1>
      <div className="mb-6">
        {/* Họ tên */}
        <label className="block font-medium">Họ tên</label>
        <input
          type="text"
          value={editForm.fullname || ""}
          onChange={(e) =>
            setEditForm((prev) => ({ ...prev, fullname: e.target.value }))
          }
          disabled={!isEditing}
          className="border p-2 rounded w-full"
        />

        {/* Email */}
        <label className="block font-medium mt-4">Email</label>
        <input
          type="email"
          value={user.email}
          disabled
          className="border p-2 rounded w-full"
        />

        {/* Số điện thoại */}
        <label className="block font-medium mt-4">Số điện thoại</label>
        <input
          type="tel"
          value={editForm.phoneNumber || ""}
          onChange={(e) =>
            setEditForm((prev) => ({ ...prev, phoneNumber: e.target.value }))
          }
          disabled={!isEditing}
          className="border p-2 rounded w-full"
        />

        {/* Địa chỉ */}
        <label className="block font-medium mt-4">Địa chỉ</label>
        <input
          type="text"
          value={editForm.address?.[0]?.detail || ""}
          onChange={(e) => {
            setEditForm((prev) => {
              const updatedAddress = Array.isArray(prev.address)
                ? [...prev.address]
                : [{}];
              updatedAddress[0] = {
                ...updatedAddress[0],
                detail: e.target.value,
              };
              return { ...prev, address: updatedAddress };
            });
          }}
          disabled={!isEditing}
          className="border p-2 rounded w-full"
        />

        {/* Nút hành động */}
        <div className="mt-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Lưu
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditForm(user);
                }}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Hủy
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>

      {/* Đổi mật khẩu */}
      <div className="mb-6">
        <button
          onClick={() => setShowChangePass((prev) => !prev)}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          {showChangePass ? "Ẩn đổi mật khẩu" : "Đổi mật khẩu"}
        </button>

        {showChangePass && (
          <div className="mt-4 border p-4 rounded bg-gray-50">
            <label className="block font-medium">Mật khẩu cũ</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <label className="block font-medium mt-4">Mật khẩu mới</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <label className="block font-medium mt-4">Xác nhận mật khẩu</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <div className="mt-4">
              <button
                onClick={handleChangePassword}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Lưu mật khẩu
              </button>
            </div>
          </div>
        )}
      </div>


  {/* Voucher đã lưu */}
      {savedVouchers.length > 0 && ( // sửa lại: > 0 thay vì >= 0
        <div className="mb-6 p-4 border rounded-xl shadow-sm bg-white">
          <h2 className="font-semibold text-lg mb-3 text-green-700">
            🎟️ Mã giảm giá của bạn
          </h2>
          <div className="space-y-3">
            {savedVouchers.map((v) => (
              <div
                key={v._id}
                className="p-3 border rounded-lg bg-green-50 border-green-200"
              >
                <p className="text-red-500 font-bold text-lg">
                  {v.discountId?.code ?? "Mã không rõ"}
                </p>

                <p className="text-gray-700">
                  {v.discountId?.discount_type === "%"
                    ? `Giảm ${v.discountId?.discount_value ?? 0}%`
                    : `Giảm ${(v.discountId?.discount_value ?? 0).toLocaleString()}đ`}
                </p>

                <p className="text-gray-500 text-sm">
                  HSD:{" "}
                  {v.discountId?.date?.[1]
                    ? new Date(v.discountId.date[1]).toLocaleDateString("vi-VN")
                    : "Không rõ"}
                </p>

                <p className="text-sm">
                  Trạng thái:{" "}
                  {v.used ? (
                    <span className="text-red-600 font-medium">Đã dùng</span>
                  ) : (
                    <span className="text-green-600 font-medium">Chưa dùng</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* Lịch sử mua hàng */}
      <OrderHistory orders={orders} />

      {/* Đăng xuất */}
      <div className="mt-6">
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default UserPage;
