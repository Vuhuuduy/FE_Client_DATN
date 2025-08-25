import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleDecrease = (item: any) => {
    if (item.quantity > 1) {
      updateQuantity(item._id, item.color, item.size, item.quantity - 1);
    }
  };

  const handleIncrease = (item: any) => {
    updateQuantity(item._id, item.color, item.size, item.quantity + 1);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item._id}-${item.color}-${item.size}`}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p>Màu: {item.color} | Size: {item.size}</p>
                    <p>{item.price.toLocaleString()}₫</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleDecrease(item)}><Minus /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item)}><Plus /></button>
                </div>
                <button
                  className="text-red-500"
                  onClick={() => removeFromCart(item._id, item.color, item.size)}
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-lg font-bold">Tổng: {totalPrice.toLocaleString()}₫</p>
            <div className="flex gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={() => clearCart()}
              >
                Xóa tất cả
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => navigate("/checkout")}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}