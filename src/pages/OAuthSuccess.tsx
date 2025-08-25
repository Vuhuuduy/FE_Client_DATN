// pages/OAuthSuccess.tsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuthSuccess = () => {
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const user = query.get("user");

    if (token && user) {
      // Lưu token và user vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);

      // Redirect sang trang chủ hoặc trang người dùng
      nav("/");
    } else {
      // Nếu không có token hoặc user -> quay lại login
      nav("/login");
    }
  }, [location, nav]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default OAuthSuccess;
