import { useEffect, useState } from "react";
import { fetchOrdersByUser, updateOrder } from "../../services/orderService";
import { addComment, getCommentsByProduct } from "../../services/commentService";
import { IOrder } from "../../types/order";
import { useAuth } from "../../context/AuthContext";

const TABS = [
  { key: "Chờ xác nhận", label: "Chờ xác nhận" },
  { key: "Đã xác nhận", label: "Đã xác nhận" },
  { key: "Đang giao hàng", label: "Đang giao hàng" },
  { key: "Đã hoàn thành", label: "Hoàn thành" },
  { key: "Đã hủy", label: "Đã hủy" },
];

const normalizeStatus = (status: string) =>
  status?.trim().toLowerCase().replace("đã ", "").replace(/\s+/g, " ");

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  // Modal state
  const [reviewProduct, setReviewProduct] = useState<{ productId: string; name: string } | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // List productIds đã đánh giá
  const [reviewedProducts, setReviewedProducts] = useState<string[]>([]);

  useEffect(() => {
    if (!user?._id) return;
    getOrders();
  }, [user]);

  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await fetchOrdersByUser(user._id);
      const fetchedOrders = res.data.orders || [];
      setOrders(fetchedOrders);

      // Kiểm tra sản phẩm đã đánh giá
      const reviewedIds: string[] = [];
      for (const order of fetchedOrders) {
        for (const item of order.orderItems) {
          if (!item.productId?._id) continue;
          const commentsRes = await getCommentsByProduct(item.productId._id);
          const userComment = commentsRes.data.data.find((c) => c.userId._id === user._id);
          if (userComment) reviewedIds.push(item.productId._id);
        }
      }
      setReviewedProducts(reviewedIds);
    } catch (error) {
      console.error("Lỗi lấy lịch sử đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;
    const reason = window.prompt("Vui lòng nhập lý do hủy đơn:");
    if (!reason || reason.trim() === "") return alert("Bạn phải nhập lý do để hủy đơn.");
    try {
      await updateOrder(id, { status: "Đã hủy", cancelReason: reason });
      await getOrders();
      alert("Hủy đơn thành công!");
    } catch (err) {
      console.error(err);
      alert("Hủy đơn thất bại, vui lòng thử lại.");
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewProduct || !comment.trim()) return alert("Vui lòng nhập nội dung đánh giá!");
    try {
      await addComment(reviewProduct.productId, { rating, content: comment });
      alert("Đánh giá thành công!");

      // Cập nhật reviewedProducts để hiển thị nút Mua lại
      setReviewedProducts((prev) => [...prev, reviewProduct.productId]);
      setReviewProduct(null);
      setComment("");
      setRating(5);
    } catch (err) {
      console.error("Lỗi gửi đánh giá:", err);
      alert("Gửi đánh giá thất bại.");
    }
  };

  const filteredOrders = orders.filter((order) => normalizeStatus(order.status) === normalizeStatus(activeTab));
  const toggleOrder = (id: string) => setOpenOrderId(openOrderId === id ? null : id);

  if (loading) return <p>Đang tải đơn hàng...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📦 Lịch sử mua hàng</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 ${activeTab === tab.key ? "border-b-2 border-orange-500 text-orange-500 font-medium" : "text-gray-600"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredOrders.length > 0 ? (
        <ul className="space-y-4">
          {filteredOrders.map((order) => (
            <li key={order._id} className="border rounded-lg shadow-sm overflow-hidden bg-white">
              <div
                className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                onClick={() => toggleOrder(order._id)}
              >
                <div>
                  <p className="font-semibold text-gray-800">Mã đơn: #{order._id.slice(-6)}</p>
                  <p className="text-sm text-gray-500">
                    Ngày đặt: {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-gray-800">{order.totalAmount.toLocaleString("vi-VN")}₫</p>
                  <span className="inline-block mt-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">{order.status}</span>
                </div>
              </div>

              {openOrderId === order._id && (
                <div className="p-4 border-t bg-gray-50 space-y-3">
                  {order.orderItems?.map((item) => {
                    const productId = item.productId?._id || "";
                    const hasReviewed = reviewedProducts.includes(productId);

                    return (
                      <div key={productId} className="flex items-center gap-4 p-2 bg-white rounded shadow-sm">
                        <img
                          src={item.productId?.imageUrl || item.image || "https://via.placeholder.com/60"}
                          alt={item.productId?.name || item.name || "Sản phẩm"}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.productId?.name || item.name || "Sản phẩm"}</p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} × {item.price.toLocaleString("vi-VN")}₫
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <p className="font-semibold text-gray-800">{(item.quantity * item.price).toLocaleString("vi-VN")}₫</p>

                          {/* Nếu đã đánh giá → Mua lại, chưa đánh giá → Viết đánh giá */}
                          {normalizeStatus(order.status) === "hoàn thành" && (
                            <>
                              {hasReviewed ? (
                                <button
                                  onClick={() => window.location.href = `/product/${productId}`}
                                  className="text-green-600 text-sm hover:underline"
                                >
                                  Mua lại
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    setReviewProduct({ productId, name: item.productId?.name || "Sản phẩm" })
                                  }
                                  className="text-blue-500 text-sm hover:underline"
                                >
                                  Viết đánh giá
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {order.cancelReason && <p className="text-red-600 font-medium">Lý do hủy: {order.cancelReason}</p>}
                  {normalizeStatus(order.status) === "chờ xác nhận" && (
                    <button onClick={() => handleCancelOrder(order._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                      Hủy đơn
                    </button>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Không có đơn hàng nào.</p>
      )}

      {/* Modal đánh giá */}
      {reviewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Đánh giá sản phẩm: {reviewProduct.name}</h3>
            <label className="block mb-2">Số sao:</label>
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded px-2 py-1 mb-4 w-full"
            />
            <textarea
              placeholder="Nhập nội dung đánh giá..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border rounded w-full p-2 h-24 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setReviewProduct(null)} className="px-4 py-2 bg-gray-300 rounded">
                Hủy
              </button>
              <button onClick={handleSubmitReview} className="px-4 py-2 bg-blue-500 text-white rounded">
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
