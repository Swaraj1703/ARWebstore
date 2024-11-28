import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./WishList.css";

const WishList = ({ wishlist, onRemoveItem }) => {
  const [address, setAddress] = useState(""); // State for shipping address
  const [error, setError] = useState(""); // State for validation errors
  const [addressSubmitted, setAddressSubmitted] = useState(false); // Track if address is submitted
  const navigate = useNavigate(); // Hook for navigation

  const isEmpty = wishlist.length === 0;

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    return wishlist.reduce((total, item) => total + (item.price || 0), 0);
  };

  const EmptyCart = () => {
    return (
      <>
        <div className="alert">
          You have no items in your WishList, start adding some!
        </div>
        <Link to="/" className="button go-back">
          Go Back
        </Link>
      </>
    );
  };

  const handleRemoveItem = (id) => {
    onRemoveItem(id);
  };

  const FilledWishList = () => {
    return (
      <div className="wishlist-items">
        {wishlist.map((item) => (
          <div key={item.id} className="wishlist-item">
            <div className="wishlist-details">
              <div className="wishlist-name">{item.name}</div>
              <div className="wishlist-category">Category: {item.category}</div>
              <div className="wishlist-color">Color: {item.color}</div>
              <div className="wishlist-price">
                Price: ₹{item.price !== undefined ? item.price : "Not Available"}
              </div>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    );
  };

  const handleAddressSubmit = () => {
    if (!address.trim()) {
      setError("Please enter a valid shipping address.");
      return;
    }
    setAddressSubmitted(true); // Mark address as submitted
    setError(""); // Clear error
  };

  const handlePaymentClick = () => {
    const totalPrice = calculateTotalPrice(); // Calculate total price
    if (address.trim()) {
      // Navigate to Payment page with address and totalPrice as state
      navigate("/payment", { state: { address, totalPrice, wishlist } });
    } else {
      setError("Please enter a valid shipping address.");
    }
  };

  return (
    <div className="container">
      <h3 className="cart-title">Your WishList</h3>
      <div className="cart-grid">
        <div className="cart-items-container">
          <div className="cart-paper">
            <h5 className="cart-heading">Added Items</h5>
            <hr className="divider" />
            {isEmpty ? <EmptyCart /> : <FilledWishList />}
          </div>

          {/* Total Price Section */}
          {!isEmpty && (
            <div className="total-price-section">
              <h5>Total Price: ₹{calculateTotalPrice()}</h5>
            </div>
          )}

          {/* Address Input and Payment Section */}
          {!isEmpty && !addressSubmitted && (
            <div className="order-section">
              <textarea
                className="address-input"
                placeholder="Enter your shipping address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
              {error && <p className="error-message">{error}</p>}
              <button
                className="submit-address-button"
                onClick={handleAddressSubmit}
              >
                Submit Address
              </button>
            </div>
          )}

          {/* Payment Section */}
          {!isEmpty && addressSubmitted && (
            <div className="payment-section">
              <h5>Shipping Address: {address}</h5>
              <button className="pay-now-button" onClick={handlePaymentClick}>
                Pay Now
              </button>
            </div>
          )}

          {/* Button to View All Items in VR */}
          {!isEmpty && (
            <Link to="/vr-viewer">
              <button className="view-in-vr-button">View All in VR</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishList;
