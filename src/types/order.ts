import api from "../config/axios.customize";

// ======================
// ORDER TYPES
// ======================

// Item trong đơn hàng
export interface IOrderItem {
  productId: string;
  name?: string;      // BE có field này
  quantity: number;
  price: number;      // BE bắt buộc
  image?: string;     // BE có field này

}

// Thông tin giao hàng
export interface IShippingInfo {
  fullName: string;
  address: string;
  phone: string;
  email?: string;
  note?: string;
}

// Payload khi tạo / cập nhật đơn hàng
export interface IOrderPayload {
  userId?: string; // Có thể null nếu chưa đăng nhập
  orderItems: IOrderItem[]; // đồng bộ với BE (không còn "items" nữa)
  shippingInfo: IShippingInfo;
  totalAmount: number;
  paymentMethod: "COD" | "BANKING" | "VNPAY"; // BE là string
  status?: "Chờ xác nhận" | "Đã xác nhận" | "Đang giao hàng" | "Đã hủy" | "Đã hoàn thành" | "Đã hoàn tiền";
  couponId?: string | null;
  discountAmount?: number;
   cancelReason?: string | null; //thêm để gửi lên khi hủy đơn
   
}

// Kiểu đầy đủ đơn hàng trả về từ BE
export interface IOrder extends IOrderPayload {
  _id: string;
  createdAt: string;
  updatedAt: string;
}


// ======================
// ORDER API
// ======================
export const fetchOrdersByUser = (userId: string) =>
  api.get<IOrder[]>(`/orders/user/${userId}`);
