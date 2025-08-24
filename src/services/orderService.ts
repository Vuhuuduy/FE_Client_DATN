import api from "../config/axios.customize";
import { IOrder, IOrderPayload } from "../types/order";

// ======================
// ORDER API
// ======================
export const getAllOrders = () => api.get<IOrder[]>("/orders");
export const getOrderById = (id: string) => api.get<IOrder>(`/orders/${id}`);
export const addOrder = (payload: IOrderPayload) => api.post<IOrder>("/orders", payload);
export const updateOrder = (id: string, payload: IOrderPayload) =>
  api.put<IOrder>(`/orders/${id}`, payload);
export const updateOrderStatus = (id: string, status: string) =>
  api.patch<IOrder>(`/orders/${id}/status`, { status });
export const deleteOrder = (id: string) =>
  api.delete<{ message: string }>(`/orders/${id}`);
export const fetchOrdersByUser = (userId: string) =>
  api.get<IOrder[]>(`/orders/user/${userId}`);

// ======================
// VNPay API
// ======================
// FE sẽ gửi payload giống như tạo đơn hàng
export const createVnpayPayment = (payload: IOrderPayload) =>
  api.post<{ paymentUrl: string }>("/vnpay/create_payment_url", payload);


