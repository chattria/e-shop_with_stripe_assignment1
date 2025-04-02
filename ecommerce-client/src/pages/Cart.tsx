import { useCart } from "../hooks/useCart";
import { FaCartShopping } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

export const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    totalCartPrice,
    handleChangeQuantity,
    handleRemoveFromCart,
    handleResetCart,
  } = useCart();

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md">
      <div className="flex gap-3 items-center mb-6">
        <FaCartShopping size={25} />
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.product.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold truncate max-w-xs">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.product.price} SEK each
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleChangeQuantity(item.product, -1)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleChangeQuantity(item.product, 1)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                    >
                      +
                    </button>
                  </div>
                  <p className="w-24 text-right font-semibold">
                    {item.product.price * item.quantity} SEK
                  </p>
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="text-xl font-bold">Total: {totalCartPrice} SEK</p>
            <div className="flex gap-5">
              <button
                onClick={handleResetCart}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 cursor-pointer"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/customerform")}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
