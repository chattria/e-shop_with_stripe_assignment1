import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import { IOrder } from "../../../ecommerce-api/src/models/IOrder";
import { API_URL } from "../services/baseService";

export const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!sessionId) return;

      console.log("Session ID from URL:", sessionId);

      try {
        // Get order by Stripe session ID
        const response = await axios.get(
          `${API_URL}/orders/payment/${sessionId}`
        );
        const orderData = response.data;
        setOrder(orderData);

        // Update order status to 'Paid' and 'Received'
        await axios.patch(`${API_URL}/orders/${orderData.id}`, {
          payment_status: "Paid",
          payment_id: sessionId,
          order_status: "Received",
        });

        // Clear localStorage
        localStorage.removeItem("cart");
        localStorage.removeItem("customer");

        setLoading(false);
      } catch (err) {
        console.error("Failed to confirm order:", err);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading order confirmation...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-600">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6">🎉 Order Confirmed</h1>

      <h2 className="text-xl font-semibold mb-2">Customer Info</h2>
      <div className="mb-4 text-sm text-gray-700">
        <p>
          {order.customer_firstname} {order.customer_lastname}
        </p>
        <p>{order.customer_email}</p>
        <p>{order.customer_phone}</p>
        <p>
          {order.customer_street_address}, {order.customer_postal_code}{" "}
          {order.customer_city}, {order.customer_country}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
      <ul className="mb-4 text-sm text-gray-700 space-y-2">
        {order.order_items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>
              {item.product_name} x {item.quantity}
            </span>
            <span>{item.unit_price * item.quantity} SEK</span>
          </li>
        ))}
      </ul>

      <div className="text-right text-lg font-semibold">
        Total: {order.total_price} SEK
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Back to Shop
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
