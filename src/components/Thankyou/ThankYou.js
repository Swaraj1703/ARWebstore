import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./ThankYou.css"; // Optional CSS for styling

const ThankYou = () => {
  const location = useLocation(); // Access data passed from the payment process
  const { orderId, totalPrice, address } = location.state || {}; // Extract data from state

  return (
    <div className="thank-you-container">
      <h1>Thank You for Your Purchase!</h1>
      <p>Your order has been successfully placed.</p>

      {orderId && (
        <div className="order-details">
          <h2>Order Details</h2>
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Total Price:</strong> ₹{totalPrice}</p>
          <p><strong>Shipping Address:</strong> {address}</p>
        </div>
      )}

      <p>We hope you enjoy your purchase!</p>
      <Link to="/" className="back-to-home">
        Go Back to Home
      </Link>
    </div>
  );
};

export default ThankYou;
