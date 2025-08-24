import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { register } from "../services/authService";
import { IRegisterPayload } from "../types/auth";

interface FormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = form;

    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      toast.error("Email không hợp lệ.");
      return;
    }

    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không trùng khớp.");
      return;
    }

    try {
      const payload: IRegisterPayload = {
        fullname: name,
        email,
        phoneNumber: phone,
        password,
      };

      const res = await register(payload);
      toast.success("🎉 Đăng ký thành công! Đăng nhập ngay.");
      nav("/login");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Đăng ký thất bại. Thử lại.";
      toast.error(msg);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: "url(/bgAuth.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0" />

      <div className="w-full max-w-md bg-black/50 backdrop-blur-md text-white shadow-2xl rounded-3xl px-8 py-10 relative z-10">
        <h2 className="text-3xl font-bold font-serif text-center mb-8">
          Create new account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <input
            type="text"
            name="name"
            placeholder="Họ tên"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 rounded-lg bg-white/10 border border-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 rounded-lg bg-white/10 border border-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            Đăng ký
          </button>
        </form>

        <p className="mt-8 text-center text-white/80 text-sm">
          Đã có tài khoản?{" "}
          <Link to="/login" className="underline text-white">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
