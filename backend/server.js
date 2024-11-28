const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();
const stripe = Stripe("sk_test_51QQ3PUI10qGRy6C76xVit20bEBnFWcVqd5T0ENQeBnLnE5sAPYg4sHjvLQbFau1zBQBt3NyN60zcgPeTU96GiKoT00AYmX4RR4"); // Replace with your actual Stripe Secret Key

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from your frontend
app.use(express.json()); // To parse JSON request bodies

// Test Route
app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

// Create Stripe Checkout Session Route
app.post("/create-payment", async (req, res) => {
    const { items, currency } = req.body; // Expect items and currency in the request body

    // Validate request payload
    if (!items || items.length === 0) {
        return res.status(400).json({ error: "No items provided for payment" });
    }

    try {
        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"], // Specify allowed payment methods
            line_items: items.map((item) => ({
                price_data: {
                    currency: currency || "inr", // Default to INR if not provided
                    product_data: {
                        name: item.name, // Item name
                    },
                    unit_amount: item.price * 100, // Convert price to smallest currency unit (e.g., paise/cents)
                },
                quantity: 1, // Default to 1 for simplicity
            })),
            mode: "payment", // Mode of payment
            success_url: "http://localhost:3000/Thankyou", // Redirect to Thank You page on success
            cancel_url: "http://localhost:3000/cancel", // Redirect to Cancel page on failure
        });

        // Send the Stripe Checkout URL to the frontend
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error("Error creating payment session:", error.message);
        res.status(500).json({ error: "Failed to create payment session. Please try again." });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
