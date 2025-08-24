import api from "../config/axios.customize";
import { CartItem } from "../context/CartContext";

// Lấy giỏ hàng
export const getCart = (userId: string) => api.get(`/cart/${userId}`);

// Thêm sản phẩm
export const addItemToCart = (userId: string, item: CartItem) =>
  api.post(`/cart/${userId}`, item);

// Xóa sản phẩm
export const removeItemFromCart = (
  userId: string,
  id: string,
  color: string,
  size: string
) => api.delete(`/cart/${userId}`, { data: { id, color, size } });

// Cập nhật số lượng
export const updateCartItemQuantity = (
  userId: string,
  id: string,
  color: string,
  size: string,
  quantity: number
) => api.put(`/cart/${userId}`, { id, color, size, quantity });

// Xóa toàn bộ giỏ hàng
export const clearUserCart = (userId: string) =>
  api.delete(`/cart/${userId}/clear`);