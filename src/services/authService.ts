// src/services/authService.ts
import api from "../config/axios.customize";
import type {
  ILoginPayload,
  IRegisterPayload,
  ISocialLoginPayload,
  IAuthResponse,
  IUser,
} from "../types/auth";

// ==========================
// Cũ: hàm lưu token & user
// ==========================
const saveAuthData = (token: string, user: IUser) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

// ==========================
// Cũ: Register
// ==========================
export const register = async (payload: IRegisterPayload) => {
  const res = await api.post<IAuthResponse>("/register", payload);
  if (res.data.token && res.data.user) {
    saveAuthData(res.data.token, res.data.user);
  }
  return res;
};

// ==========================
// Cũ: Login
// ==========================
export const login = async (payload: ILoginPayload) => {
  const res = await api.post<IAuthResponse>("/login", payload);
  if (res.data.token && res.data.user) {
    saveAuthData(res.data.token, res.data.user);
  }
  return res;
};

// ==========================
// Cũ: Social login (gửi req)
// ==========================
export const socialLogin = async (payload: ISocialLoginPayload) => {
  const res = await api.post<IAuthResponse>("/auth/social-login", payload);
  if (res.data.token && res.data.user) {
    saveAuthData(res.data.token, res.data.user);
  }
  return res;
};

// ==========================
// Cũ: Fetch user
// ==========================
export const fetchUserById = (userId: string) =>
  api.get<IUser>(`/users/${userId}`);

// ==========================
// Cũ: Update user
// ==========================
export const updateUser = (
  userId: string,
  payload: Partial<IUser>,
  token: string
) =>
  api.put<IUser>(`/users/${userId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// ==========================
// ✅ Mới: Handle callback social login
// ==========================
export const handleSocialCallback = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const userStr = params.get("user");

  if (token && userStr) {
    try {
      const user = JSON.parse(decodeURIComponent(userStr));
      saveAuthData(token, user);
      return { token, user };
    } catch {
      return null;
    }
  }
  return null;
};
// src/services/authService.ts

export const changePassword = (
  userId: string,
  payload: { oldPassword: string; newPassword: string },
  token: string
) =>
  api.put(`/users/${userId}/change-password`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
