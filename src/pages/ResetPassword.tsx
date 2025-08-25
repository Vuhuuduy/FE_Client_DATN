import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPasswordApi } from "../config/auth";
import { Input, Button, message } from "antd";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // loại bỏ query string (nếu có) trong token
  const cleanToken = token?.split("?")[0] || "";

  const handleReset = async () => {
    if (!newPassword) return message.warning("Vui lòng nhập mật khẩu mới");
    if (!cleanToken) return message.error("Token không hợp lệ");

    try {
      setLoading(true);
      console.log("📌 Token gửi đi:", cleanToken);
      console.log("📌 Mật khẩu gửi đi:", newPassword);

      const res = await resetPasswordApi(cleanToken, newPassword);

      console.log("📌 Response:", res.data);

      message.success(res.data.message || "Đặt lại mật khẩu thành công");
      navigate("/login");
    } catch (err: any) {
      console.error("❌ Error:", err.response?.data || err.message);
      message.error(err.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow rounded bg-white">
      <h2 className="text-xl mb-4 font-semibold">Đặt lại mật khẩu</h2>
      <Input.Password
        placeholder="Nhập mật khẩu mới..."
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button
        type="primary"
        className="mt-4 w-full"
        loading={loading}
        onClick={handleReset}
      >
        Đặt lại mật khẩu
      </Button>
    </div>
  );
}
