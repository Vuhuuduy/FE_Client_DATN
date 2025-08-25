import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useVoucherContext } from "../context/VoucherContext";
import { addOrder, createVnpayPayment } from "../services/orderService";
import { IDiscount } from "../types/discount";
import { sendOrderEmail } from "../services/emailService";

export default function CheckoutPage() {
  const { cartItems, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const { vouchers, selectedVoucher, setSelectedVoucher, markVoucherUsed } =
    useVoucherContext();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [shippingFee, setShippingFee] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullname || "",
        phone: user.phoneNumber || "",
        email: user.email || "",
        address: user.address?.[0]?.detail || "",
        note: "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyVoucher = (voucher: any) => {
    const discount: IDiscount =
      typeof voucher.discountId === "string"
        ? ({} as IDiscount)
        : voucher.discountId;

    if (!discount || !discount._id) return;

    if (totalPrice < discount.minOrderValue) {
      toast.error(
        `Đơn hàng tối thiểu ${discount.minOrderValue.toLocaleString()}đ mới được áp dụng mã này`
      );
      return;
    }

    let amount = 0;
    if (discount.discount_type === "%") {
      amount = Math.floor((totalPrice * discount.discount_value) / 100);
    } else {
      amount = discount.discount_value;
    }

    if (amount > discount.maxDiscountValue) {
      amount = discount.maxDiscountValue;
    }

    setDiscountAmount(amount);
    setSelectedVoucher(voucher);
    toast.success(`Đã áp dụng voucher: ${discount.code}`);
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập trước khi đặt hàng!");
      return;
    }
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error("Vui lòng điền đầy đủ thông tin giao hàng!");
      return;
    }

    try {
      const orderPayload: any = {
        userId: user._id,
        orderItems: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          quantity: Number(item.quantity),
          price: Number(item.price),
          image: item.image,
          color: item.color,
          size: item.size,
        })),
        shippingInfo: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          email: formData.email,
          note: formData.note,
        },
        totalAmount: Number(totalPrice + shippingFee - discountAmount),
        paymentMethod,
        status: paymentMethod === "COD" ? "Chờ xác nhận" : "Chờ thanh toán",
        discountAmount: Number(discountAmount),
      };

      if (selectedVoucher) {
        orderPayload.couponId =
          typeof selectedVoucher.discountId === "string"
            ? selectedVoucher.discountId
            : selectedVoucher.discountId._id;
      }

      if (orderPayload.totalAmount <= 0) {
        toast.error("Tổng tiền không hợp lệ!");
        return;
      }

      console.log("======= ORDER PAYLOAD =======", orderPayload);

      if (paymentMethod === "COD") {
        const resOrder = await addOrder(orderPayload);
        const createdOrder = resOrder.data?.data;
        if (!createdOrder || !createdOrder._id) {
          toast.error(resOrder.data?.message || "Không thể tạo đơn hàng!");
          return;
        }

        toast.success("Đặt hàng thành công!");

        try {
          await sendOrderEmail(createdOrder._id);
        } catch (err) {
          console.error("Không gửi được email:", err);
        }

        if (selectedVoucher) {
          const discountId =
            typeof selectedVoucher.discountId === "string"
              ? selectedVoucher.discountId
              : selectedVoucher.discountId._id;
          await markVoucherUsed(discountId);
        }

        clearCart();
        navigate("/checkoutsuccess", { state: { order: createdOrder } });
      } else if (paymentMethod === "VNPay") {
        const resVnpay = await createVnpayPayment(orderPayload);

        if (resVnpay.data?.paymentUrl) {
          if (selectedVoucher) {
            const discountId =
              typeof selectedVoucher.discountId === "string"
                ? selectedVoucher.discountId
                : selectedVoucher.discountId._id;
            await markVoucherUsed(discountId);
          }
          clearCart();
          window.location.href = resVnpay.data.paymentUrl;
        } else {
          toast.error("Không thể tạo link thanh toán VNPay!");
        }
      }
    } catch (error: any) {
      console.error("❌ ORDER ERROR:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi đặt hàng!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form thông tin */}
        <div className="md:col-span-2 border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Thông tin giao hàng</h2>
          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-3"
          />
          <textarea
            name="note"
            placeholder="Ghi chú"
            value={formData.note}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Voucher Section */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Mã giảm giá</h3>
            {vouchers.length === 0 ? (
              <p className="text-gray-500">Bạn chưa lưu voucher nào</p>
            ) : (
              <div className="space-y-2">
                {vouchers.map((v) => {
                  const discount: IDiscount =
                    typeof v.discountId === "string"
                      ? ({} as IDiscount)
                      : v.discountId;

                  if (!discount || !discount._id) return null;

                  const isSelected =
                    selectedVoucher?._id === v._id ||
                    (typeof selectedVoucher?.discountId === "string"
                      ? selectedVoucher.discountId === v.discountId
                      : selectedVoucher?.discountId?._id === discount._id);

                  return (
                    <button
                      key={v._id}
                      onClick={() => applyVoucher(v)}
                      className={`w-full text-left px-4 py-2 rounded border ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {discount.code} -{" "}
                      {discount.discount_type === "%"
                        ? `${discount.discount_value}%`
                        : `${discount.discount_value.toLocaleString()}đ`}{" "}
                      | Đơn tối thiểu{" "}
                      {discount.minOrderValue.toLocaleString()}đ
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Đơn hàng của bạn</h2>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={`${item._id}-${item.color}-${item.size}`}
                className="flex justify-between text-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <span>
                  {item.name} ({item.color}/{item.size}) x {item.quantity}
                </span>
                <span>{(item.price || 0).toLocaleString()}₫</span>
              </div>
            ))}
          </div>
          <hr className="my-3" />
          <div className="flex justify-between">
            <span>Tạm tính</span>
            <span>{totalPrice.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between">
            <span>Giảm giá</span>
            <span className="text-red-600">
              -{discountAmount.toLocaleString()}₫
            </span>
          </div>
          <div className="flex justify-between">
            <span>Phí vận chuyển</span>
            <span>{shippingFee.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Tổng cộng</span>
            <span>
              {(totalPrice + shippingFee - discountAmount).toLocaleString()}₫
            </span>
          </div>

          {/* Chọn phương thức thanh toán */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Phương thức thanh toán</h3>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Thanh toán khi nhận hàng (COD)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="VNPay"
                checked={paymentMethod === "VNPay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Thanh toán online (VNPay)
            </label>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
}
