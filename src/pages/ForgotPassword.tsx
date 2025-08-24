import { useState } from "react";
import { forgotPasswordApi } from "../config/auth";
import { Input, Button, message } from "antd";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return message.warning("Vui lòng nhập email");
    try {
      setLoading(true);
      const res = await forgotPasswordApi(email);
      message.success(res.data.message || "Vui lòng kiểm tra email để đặt lại mật khẩu");
    } catch (err: any) {
      message.error(err.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow rounded bg-white">
      <h2 className="text-xl mb-4 font-semibold">Quên mật khẩu</h2>
      <Input
        placeholder="Nhập email của bạn..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        type="primary"
        className="mt-4 w-full"
        loading={loading}
        onClick={handleSubmit}
      >
        Gửi liên kết đặt lại mật khẩu
      </Button>
    </div>
  );
}
