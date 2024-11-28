import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { address, totalPrice, wishlist } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState(""); // Track selected payment method
  const [error, setError] = useState(""); // Validation errors
  const [isProcessing, setIsProcessing] = useState(false); // Loading state

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    setError("");
    setIsProcessing(true);

    try {
      // Send payment request to the backend
      const response = await axios.post("http://localhost:5000/create-payment", {
        items: wishlist.map((item) => ({
          name: item.name,
          price: item.price,
        })), // Include items in the payment
        currency: "inr", // Payment currency
      });

      // Extract the URL for Stripe Checkout
      const { url } = response.data;
      if (url) {
        // Redirect to the Stripe-hosted checkout page
        window.location.href = url;
      } else {
        setError("Failed to create payment session. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      setError("There was an error processing your payment. Please try again.");
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
