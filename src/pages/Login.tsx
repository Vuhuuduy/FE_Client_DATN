import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import api from "../config/axios.customize";
import { useAuth } from "../context/AuthContext";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // 👉 THÊM DÒNG NÀY

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { email, password } = form;
    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ Email và Mật khẩu.");
      return;
    }

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      toast.error("Email không hợp lệ.");
      return;
    }

    try {
      const res = await api.post("/login", { email, password });
      const { token, user } = res.data;

      if (!token || !user) {
        toast.error("Đăng nhập thất bại: Thiếu dữ liệu từ server.");
        return;
      }

      login(user, token); // 👉 GỌI LOGIN context
      toast.success("🎉 Đăng nhập thành công!");
      navigate("/"); // 👉 CHUYỂN HƯỚNG SAU ĐĂNG NHẬP
    } catch (err: any) {
      const msg = err.response?.data?.message || "Đăng nhập thất bại!";
      toast.error(msg);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:8888/api/auth/google";
  };

  const loginWithFacebook = () => {
    window.location.href = "http://localhost:8888/api/auth/facebook";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(/bgAuth.jpg)` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0" />

      <div className="w-full max-w-md bg-black/50 backdrop-blur-md text-white shadow-2xl rounded-3xl px-8 py-10 relative z-10">
        <h2 className="text-3xl font-bold font-serif text-center mb-8">Đăng nhập</h2>

        <div className="space-y-4 mb-8">
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 border border-white/30 rounded-lg py-2.5 bg-white/10 hover:bg-white/20 transition text-white"
          >
            <FcGoogle size={22} />
            <span>Đăng nhập với Google</span>
          </button>
          <button
            onClick={loginWithFacebook}
            className="w-full flex items-center justify-center gap-3 bg-[#1877f2] text-white rounded-lg py-2.5 hover:bg-[#166fe0] transition"
          >
            <FaFacebook size={20} />
            <span>Đăng nhập với Facebook</span>
          </button>
        </div>

        <div className="relative my-6">
          <hr className="border-white/20" />
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black/60 px-3 text-sm text-white/70">
            hoặc
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
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
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-3 text-white/70 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex justify-end">
  <Link
    to="/forgot-password"
    className="text-sm text-white/70 hover:text-white underline"
  >
    Quên mật khẩu?
  </Link>
</div>

          <button
            type="submit"
            className="w-full bg-white text-black rounded-lg py-3 font-semibold hover:bg-gray-200 transition"
          >
            Đăng nhập
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-white/80">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="underline text-white">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
