import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Import Firebase Auth functions
import { auth } from "../../firebase.js"; // Corrected the path to Firebase configuration
import "./SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Add a success message
  const [loading, setLoading] = useState(false); // Add loading state
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleOnchange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    // Validation checks
    if (
      !userDetails.name ||
      !userDetails.email ||
      !userDetails.password ||
      !userDetails.confirm_password
    ) {
      setError("Please fill in all the required fields");
      setLoading(false);
      return;
    }

    if (userDetails.password !== userDetails.confirm_password) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: userDetails.name,
      });

      setSuccess(true);
      console.log("User registered successfully:", userDetails.email);

      // Reset form fields
      setUserDetails({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    } catch (err) {
      setError(err.message); // Show Firebase error message
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <main className="main-sign_up_container">
      <form onSubmit={handleSubmit} className="sign-up-container">
        {error && <p className="error-paragraph">Error: {error}</p>}
        {success && (
          <p className="success-paragraph">
            Account created successfully! You can now{" "}
            <Link to="/sign-in">Sign In</Link>.
          </p>
        )}
        <h3>Sign up</h3>
        <div className="inputs"></div>
        <div className="input-div">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            onChange={handleOnchange}
            value={userDetails.name}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            onChange={handleOnchange}
            value={userDetails.email}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            onChange={handleOnchange}
            value={userDetails.password}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            name="confirm_password"
            id="confirm_password"
            type="password"
            onChange={handleOnchange}
            value={userDetails.confirm_password}
            required
          />
        </div>
        <button className="sign-up-button" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </button>
        <p className="sign-up-redirect-p">
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </p>
      </form>
    </main>
  );
};

export default SignUp;
