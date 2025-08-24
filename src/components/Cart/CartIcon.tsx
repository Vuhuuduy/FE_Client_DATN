// src/components/CartIcon.tsx
import { ShoppingBag } from "lucide-react"
import { useCart } from "../../context/CartContext"
import { Link } from "react-router-dom"

function CartIcon() {
  const { cartItems } = useCart()
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <Link to="/gio-hang" className="relative">
      <ShoppingBag className="w-6 h-6 text-black" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  )
}

export default CartIcon
