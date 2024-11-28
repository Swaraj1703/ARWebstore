import React from "react";
import { Link } from "react-router-dom";
import "./ThankYou.css"; // Optional CSS for styling

const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <h1>Thank You for Your Purchase!</h1>
      <p>Your order has been successfully placed.</p>
      <p>We hope you enjoy your purchase!</p>
      <Link to="/" className="back-to-home">
        Go Back to Home
      </Link>
    </div>
  );
};

export default ThankYou;
