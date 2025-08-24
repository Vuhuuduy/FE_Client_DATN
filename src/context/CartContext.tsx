import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  getCart, 
  addItemToCart, 
  removeItemFromCart, 
  updateCartItemQuantity, 
  clearUserCart 
} from "../services/cartService";
import { useAuth } from "./AuthContext";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: string, color: string, size: string) => Promise<void>;
  updateQuantity: (id: string, color: string, size: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Lấy giỏ hàng khi user đăng nhập hoặc reload
  useEffect(() => {
    const fetchCart = async () => {
      if (!user?._id && !user?.email) return;
      try {
        const res = await getCart(user._id || user.email);
        setCartItems(res.data || []);
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
      }
    };
    fetchCart();
  }, [user?._id, user?.email]);

  const addToCart = async (item: CartItem) => {
    if (!user?._id && !user?.email) return;
    try {
      const res = await addItemToCart(user._id || user.email, item);
      setCartItems(res.data || []);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  const removeFromCart = async (id: string, color: string, size: string) => {
    if (!user?._id && !user?.email) return;
    try {
      const res = await removeItemFromCart(user._id || user.email, id, color, size);
      setCartItems(res.data || []);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const updateQuantity = async (id: string, color: string, size: string, quantity: number) => {
    if (!user?._id && !user?.email) return;
    try {
      const res = await updateCartItemQuantity(user._id || user.email, id, color, size, quantity);
      setCartItems(res.data || []);
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  };

  const clearCart = async () => {
    if (!user?._id && !user?.email) return;
    try {
      const res = await clearUserCart(user._id || user.email);
      setCartItems(res.data || []);
    } catch (error) {
      console.error("Lỗi khi xóa toàn bộ giỏ hàng:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart phải được dùng bên trong CartProvider");
  return context;
};