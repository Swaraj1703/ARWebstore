import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Auth
import { auth } from "../../firebase"; // Correct path for Firebase config

const SignIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const [signInDetails, setSignInDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // For navigation after successful login

  const handleOnchange = (e) => {
    setSignInDetails({
      ...signInDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (signInDetails.email === "" || signInDetails.password === "") {
      setError("Please fill in all the required fields");
      setLoading(false);
      return;
    }

    try {
      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, signInDetails.email, signInDetails.password);
      console.log("User signed in successfully:", signInDetails.email);
      navigate("/"); // Redirect to the homepage or protected route
    } catch (err) {
      setError("Invalid email or password"); // Set error message for invalid credentials
      console.error(err.message);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <main className="main-sign_in_container">
      <form onSubmit={handleSubmit} className="sign-in-container">
        <p className="error-paragraph">{error && `Error: ${error}`}</p>
        <h3>Sign in</h3>
        <div className="input-div">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleOnchange}
            value={signInDetails.email}
          />
        </div>
        <div className="input-div">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleOnchange}
            value={signInDetails.password}
          />
          <Link to="#" className="forgot-pass">
            Forgot password?
          </Link>
        </div>
        <button className="sign-in-button" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <p className="sign-in-redirect-p">
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </p>
      </form>
    </main>
  );
};

export default SignIn;
