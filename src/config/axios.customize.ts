import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8888/api", // chỉnh lại URL BE nếu cần
});

// Gắn token vào mỗi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Xử lý lỗi response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Nếu bị khóa tài khoản → đá luôn ra login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login?blocked=true";
    }

    if (error.response?.status === 401) {
      // Nếu token hết hạn hoặc chưa login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
