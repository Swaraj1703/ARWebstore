const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const admin = require("firebase-admin"); // Firebase Admin SDK for Firestore
const bodyParser = require("body-parser"); // For parsing raw body in webhooks

const app = express();

// Initialize Stripe with secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51QQ3PUI10qGRy6C76xVit20bEBnFWcVqd5T0ENQeBnLnE5sAPYg4sHjvLQbFau1zBQBt3NyN60zcgPeTU96GiKoT00AYmX4RR4"); // Use environment variable or fallback

// Initialize Firebase Admin
try {
    const serviceAccount = require("./serviceAccountKey.json"); // Ensure correct path to your Firebase Admin key
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin SDK initialized successfully.");
} catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error.message);
    process.exit(1); // Exit if Firebase initialization fails
}

// Firestore instance
const firestore = admin.firestore();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from your frontend
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.raw({ type: "application/json" })); // Parse raw body for webhooks

// Test Route
app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

// Create Stripe Checkout Session and Store Order
app.post("/create-payment", async (req, res) => {
    const { items, currency = "inr", address, userId } = req.body;

    // Validate request payload
    if (!items || items.length === 0) {
        return res.status(400).json({ error: "No items provided for payment" });
    }
    if (!address) {
        return res.status(400).json({ error: "Shipping address is required" });
    }
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map((item) => ({
                price_data: {
                    currency: currency,
                    product_data: { name: item.name },
                    unit_amount: item.price * 100,
                },
                quantity: 1,
            })),
            mode: "payment",
            success_url: "http://localhost:3000/thank-you",
            cancel_url: "http://localhost:3000/cancel",
        });

        // Store order in Firestore
        const orderData = {
            items,
            address,
            totalPrice: items.reduce((total, item) => total + item.price, 0),
            userId,
            paymentStatus: "Pending",
            sessionId: session.id,
            createdAt: admin.firestore.Timestamp.now(),
        };
        await firestore.collection("orders").add(orderData);

        console.log("Order stored successfully:", orderData);

        // Send the Stripe Checkout URL to the frontend
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error("Error creating payment session or storing order:", error.message);
        res.status(500).json({ error: "Failed to create payment session. Please try again." });
    }
});

// Webhook to Update Payment Status
app.post("/webhook", async (req, res) => {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Use your Stripe webhook secret
    const sig = req.headers["stripe-signature"];

    if (!endpointSecret) {
        console.error("Webhook secret is not set. Ensure it is in the environment variables.");
        return res.status(400).send("Webhook secret is missing.");
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook error:", err.message);
        return res.status(400).send(`Webhook error: ${err.message}`);
    }

    // Handle events
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object;

            try {
                // Update order status in Firestore
                const ordersCollection = firestore.collection("orders");
                const orderSnapshot = await ordersCollection.where("sessionId", "==", session.id).get();

                if (!orderSnapshot.empty) {
                    const orderDoc = orderSnapshot.docs[0];
                    await orderDoc.ref.update({ paymentStatus: "Completed" });
                    console.log(`Order ${orderDoc.id} payment status updated to "Completed".`);
                } else {
                    console.error("No matching order found for session ID:", session.id);
                }
            } catch (err) {
                console.error("Error updating order status:", err.message);
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send("Webhook received.");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
