import { useLocation, useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById } from "../services/orderService";

export default function CheckoutSuccessPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const orderDbId = searchParams.get("orderId") || searchParams.get("orderDbId");
  const status = searchParams.get("status");

  const [order, setOrder] = useState(location.state?.order || null);

  // 🔎 Debug query params & state
  console.log("🔎 [DEBUG] Query Params:", Object.fromEntries(searchParams));
  console.log("🔎 [DEBUG] orderDbId:", orderDbId);
  console.log("🔎 [DEBUG] status:", status);
  console.log("🔎 [DEBUG] order (từ location.state):", order);

  useEffect(() => {
    if (!order && orderDbId) {
      console.log("📡 [DEBUG] Gọi API getOrderById:", orderDbId);
      getOrderById(orderDbId)
        .then((res) => {
          console.log("✅ [DEBUG] API Response object:", res);
          console.log("✅ [DEBUG] API Response data:", res.data);

          // Chuẩn hoá dữ liệu trả về
          const orderData = res.data?.data || res.data;
          console.log("🟢 [DEBUG] orderData sau khi tách:", orderData);

          setOrder(orderData);
        })
        .catch((err) => {
          console.error("❌ [DEBUG] Lỗi khi fetch order:", err);
        });
    }
  }, [orderDbId, order]);

  // 🔎 Debug khi state order thay đổi
  useEffect(() => {
    console.log("🟢 [DEBUG] order state sau khi set:", order);
  }, [order]);

  if (!order) {
    return (
      <div className="text-center mt-10">
        {status === "failed" ? (
          <p className="text-red-500">
            Thanh toán thất bại hoặc đơn hàng không tồn tại.
          </p>
        ) : (
          <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
        )}
        <Link to="/" className="text-blue-500 underline">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        ✅ Đặt hàng thành công!
      </h2>

      {status === "success" && (
        <div className="mb-6 p-4 border rounded bg-green-50">
          <h3 className="font-semibold mb-2 text-green-700">
            Thanh toán VNPay thành công
          </h3>
          <p>
            <strong>Mã đơn hàng:</strong> {order._id}
          </p>
          <p>
            <strong>Số tiền thanh toán:</strong>{" "}
            {order.totalAmount?.toLocaleString()}₫
          </p>
          <p>
            <strong>Trạng thái:</strong> {order.status || "Chờ xác nhận"}
          </p>
        </div>
      )}

      <h3 className="font-semibold mb-2">Thông tin giao hàng</h3>
      <p>
        <strong>Họ tên:</strong> {order.shippingInfo?.fullName}
      </p>
      <p>
        <strong>SĐT:</strong> {order.shippingInfo?.phone}
      </p>
      <p>
        <strong>Địa chỉ:</strong> {order.shippingInfo?.address}
      </p>
      <p>
        <strong>Ghi chú:</strong> {order.shippingInfo?.note || "Không có"}
      </p>

      <h3 className="font-semibold mt-6 mb-2">Sản phẩm đã đặt</h3>
<ul className="space-y-4">
  {order.orderItems?.map((item, index) => (
    <li
      key={index}
      className="flex items-center gap-4 border rounded-lg p-3 shadow-sm bg-white"
    >
      {/* Ảnh sản phẩm */}
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md border"
        />
      )}

      {/* Thông tin sản phẩm */}
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-gray-600 text-sm">
          Số lượng: {item.quantity}
        </p>
        <p className="text-gray-800 font-semibold">
          Giá: {item.price.toLocaleString()}₫
        </p>
      </div>
    </li>
  ))}
</ul>


      <h3 className="mt-4 font-bold text-xl">
        Tổng cộng: {order.totalAmount?.toLocaleString()}₫
      </h3>

      <Link
        to="/"
        className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Tiếp tục mua sắm
      </Link>
    </div>
  );
}
