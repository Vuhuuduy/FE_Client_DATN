// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { IUser } from "../types/auth";
import { handleSocialCallback } from "../services/authService"; // ✅ import mới

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  login: (userData: IUser, token: string) => void;
  logout: () => void;
  updateUser: (updatedFields: Partial<IUser>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // ✅ Mới: check callback từ Google/Facebook
      const socialData = handleSocialCallback();
      if (socialData) {
        setUser(socialData.user);
        setToken(socialData.token);
        // Xóa query khỏi URL sau khi xử lý
        window.history.replaceState({}, document.title, window.location.pathname);
        setLoading(false);
        return;
      }

      // Cũ: load từ localStorage
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser) as IUser);
        setToken(storedToken);
      }
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  // Cũ: Đồng bộ với localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }

    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [user, token]);

  // Cũ: login
  const login = (userData: IUser, token: string) => {
    setUser(userData);
    setToken(token);
  };

  // Cũ: updateUser
  const updateUser = (updatedFields: Partial<IUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        ...updatedFields,
        address: updatedFields.address ?? prev.address,
      };
    });
  };

  // Cũ: logout
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Cũ: Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được dùng bên trong AuthProvider");
  }
  return context;
};
