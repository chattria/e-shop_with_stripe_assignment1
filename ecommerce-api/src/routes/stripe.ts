import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// POST /stripe/create-checkout-session
router.post("/create-checkout-session", async (req, res) => {
  const { line_items, order_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `http://localhost:5173/confirmation?session_id={CHECKOUT_SESSION_ID}`, // Adjust frontend URL
      cancel_url: `http://localhost:5173/cart`, // Or your cancel page
      line_items: line_items.map((item: any) => ({
        price_data: {
          currency: "sek",
          product_data: {
            name: item.name,
          },
          unit_amount: item.amount,
        },
        quantity: item.quantity,
      })),
      metadata: {
        order_id: order_id.toString(),
      },
    });

    res.json({
      session_id: session.id,
      checkout_url: session.url,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Stripe session creation failed" });
  }
});

export default router;
