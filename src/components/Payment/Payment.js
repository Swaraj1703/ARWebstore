import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase"; // Import Firebase auth
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { address, totalPrice, wishlist } = location.state || {
    address: "No Address Provided",
    totalPrice: 0,
    wishlist: [],
  };

  const [paymentMethod, setPaymentMethod] = useState(""); // Track selected payment method
  const [error, setError] = useState(""); // Validation errors
  const [isProcessing, setIsProcessing] = useState(false); // Loading state
  const [userId, setUserId] = useState(null); // Store user ID

  // Get the authenticated user's ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); // Set the user ID
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const validateInputs = () => {
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return false;
    }
    if (!userId) {
      setError("User ID is required to proceed with payment.");
      return false;
    }
    if (!wishlist || wishlist.length === 0) {
      setError("Your wishlist is empty. Please add items before proceeding.");
      return false;
    }
    if (!address || address.trim() === "No Address Provided") {
      setError("Shipping address is invalid or missing.");
      return false;
    }
    if (totalPrice <= 0) {
      setError("Total price is invalid.");
      return false;
    }
    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Validate inputs before proceeding
    if (!validateInputs()) {
      return;
    }

    setError("");
    setIsProcessing(true);

    try {
      console.log("Initiating payment with items:", wishlist);

      // Send payment request to the backend
      const response = await axios.post("http://localhost:5000/create-payment", {
        items: wishlist.map((item) => ({
          name: item.name,
          price: item.price,
        })), // Include items in the payment
        address, // Include the shipping address
        userId, // Include the authenticated user's ID
        currency: "inr", // Payment currency
      });

      console.log("Backend response:", response.data);

      // Extract the URL for Stripe Checkout
      const { url } = response.data;
      if (url) {
        // Notify the user and redirect to the Stripe-hosted checkout page
        alert("Redirecting to Stripe for payment...");
        window.location.href = url;
      } else {
        setError("Failed to create payment session. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      setError(
        error.response?.data?.error ||
          "There was an error processing your payment. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-container">
      <h3>Payment Details</h3>
      <form onSubmit={handlePayment} className="payment-form">
        <h4>Total Price: ₹{totalPrice}</h4>
        <h5>Shipping Address:</h5>
        <p>{address}</p>

        {/* Payment Method Options */}
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="payment-method"
              value="Credit Card"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="payment-method"
              value="UPI"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>
          <label>
            <input
              type="radio"
              name="payment-method"
              value="Cash on Delivery"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          className="submit-payment-button"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Confirm Payment"}
        </button>
      </form>
    </div>
  );
};

export default Payment;
