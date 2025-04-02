// AdminOrderDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { IOrder } from "../../../ecommerce-api/src/models/IOrder";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import { API_URL } from "../services/baseService";

export const AdminOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/orders/${id}`)
      .then((res) => res.json())
      .then(setOrder)
      .catch(() => setError("Failed to load order"));
  }, [id]);

  const handleDeleteItem = async (itemId: number) => {
    await fetch(`${API_URL}/order-items/${itemId}`, { method: "DELETE" });
    setOrder((prev) =>
      prev
        ? {
            ...prev,
            order_items: prev.order_items.filter((item) => item.id !== itemId),
          }
        : prev
    );
  };

  const handleUpdateQuantity = async (itemId: number, newQty: number) => {
    await fetch(`/api/order-items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQty }),
    });

    setOrder((prev) =>
      prev
        ? {
            ...prev,
            order_items: prev.order_items.map((item) =>
              item.id === itemId ? { ...item, quantity: newQty } : item
            ),
          }
        : prev
    );
  };

  if (error) return <p>{error}</p>;
  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/admin/orders"
        className="text-blue-500 hover:underline flex items-center gap-2 mb-6"
      >
        <FaArrowLeft />
        Back to Orders List
      </Link>

      <h1 className="text-3xl font-bold mb-4">Order #{order.id}</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Customer Info</h2>
        <p>
          {order.customer_firstname} {order.customer_lastname}
        </p>
        <p>{order.customer_email}</p>
        <p>{order.customer_phone}</p>
        <p>
          {order.customer_street_address}, {order.customer_postal_code},{" "}
          {order.customer_city}
        </p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Info</h2>
        <p>Total: ${order.total_price}</p>
        <p>Status: {order.order_status}</p>
        <p>Payment: {order.payment_status}</p>
        <p>Created: {new Date(order.created_at).toLocaleString()}</p>
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        {order.order_items.length === 0 ? (
          <p>No items in this order.</p>
        ) : (
          <ul className="divide-y">
            {order.order_items.map((item) => (
              <li
                key={item.id}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{item.product_name}</p>
                  <p>
                    Price: ${item.price} | Quantity: {item.quantity}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(
                        item.id as number,
                        Number(e.target.value)
                      )
                    }
                    className="w-16 p-1 border rounded"
                  />
                  <button
                    onClick={() => handleDeleteItem(item.id as number)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Item"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
