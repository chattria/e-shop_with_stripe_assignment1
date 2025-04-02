import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { API_URL } from "../services/baseService";
import { ICustomer } from "../../../ecommerce-api/src/models/ICustomer";
import { CartItem } from "../module/ICartItem";

export const Payment = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleCheckout = async () => {
      try {
        const cart: CartItem[] = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
        const customer: Omit<ICustomer, "id" | "created_at" | "password"> =
          JSON.parse(localStorage.getItem("customer") || "{}");

        if (!cart.length || !customer.email) {
          setError("Missing cart or customer data.");
          return;
        }
        let customer_id: number | null = null;
        try {
          // 1. Check if customer exists
          const customerRes = await axios.get<ICustomer>(
            `${API_URL}/customers/email/${customer.email}`
          );

          customer_id = customerRes?.data?.id;
        } catch (error: any) {
          if (error.response && error.response.status === 404) {
            console.log("Customer not found, will create a new one.");
          }
        }
        // 2. If not found, create customer
        if (!customer_id) {
          const createCustomerRes = await axios.post<ICustomer>(
            "http://localhost:3000/customers",
            customer
          );
          customer_id = createCustomerRes.data.id;
        }

        // 3. Create order
        const orderItems = cart.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          unit_price: item.product.price,
        }));
        console.log("🧾 Order payload:", {
          customer_id,
          total_price: cart.reduce(
            (total, item) => total + item.quantity * item.product.price,
            0
          ),
          payment_status: "Unpaid",
          payment_id: "",
          order_status: "Pending",
          order_items: orderItems,
        });
        const orderRes = await axios.post("http://localhost:3000/orders", {
          customer_id,
          total_price: cart.reduce(
            (total, item) => total + item.quantity * item.product.price,
            0
          ),
          payment_status: "Unpaid",
          payment_id: "",
          order_status: "Pending",
          order_items: orderItems,
        });

        const order = orderRes.data;
        const order_id = order.id;

        // 4. Call Stripe session
        const stripeRes = await axios.post(
          "http://localhost:3000/stripe/create-checkout-session",
          {
            line_items: cart.map((item) => ({
              name: item.product.name,
              amount: item.product.price * 100,
              quantity: item.quantity,
            })),
            order_id,
          }
        );

        const { session_id, checkout_url } = stripeRes.data;

        // 5. Update order with Stripe session_id
        await axios.patch(`http://localhost:3000/orders/${order.id}`, {
          payment_id: session_id,
          payment_status: "Unpaid",
          order_status: "Pending",
        });

        // 6. Redirect to Stripe
        window.location.href = checkout_url;
      } catch (err: any) {
        console.error("Checkout error", err);
        setError("Something went wrong during checkout. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    handleCheckout();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md text-center">
      {loading && (
        <p className="text-lg font-semibold">Processing checkout...</p>
      )}
      {error && (
        <div className="text-red-600 bg-red-100 p-4 rounded">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
