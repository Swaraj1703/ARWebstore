import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShippingAddress.css";

const ShippingAddress = ({ onSaveAddress }) => {
  const [address, setAddress] = useState(""); // State for the shipping address
  const [error, setError] = useState(""); // State for validation errors
  const navigate = useNavigate(); // Hook to navigate to another route

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the address input
    if (!address.trim()) {
      setError("Please enter a valid shipping address.");
      return;
    }

    // Save the address to App.js state
    onSaveAddress(address);

    // Navigate to the Payment page
    navigate("/payment");
  };

  return (
    <div className="shipping-container">
      <h3>Shipping Details</h3>
      <form onSubmit={handleSubmit} className="shipping-form">
        <textarea
          placeholder="Enter your shipping address here..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="address-input"
        ></textarea>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-address-button">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default ShippingAddress;
