import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/real-estate/api/forgotpassword/request", {
        email,
      });
      setMessage(response.data);
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      setMessage(error.response?.data || "Something went wrong.");
    }
  };

  return (
    <div className="forgot-password">
      <div className="formContainer">
        <form onSubmit={handleRequestOtp}>
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Request OTP</button>
          {message && <p className="message">{message}</p>}
          <a href="/login">Back to Login</a>
        </form>
      </div>
      <div className="imgContainer">
        <img src='/bg.png' alt="Forgot Password" />
      </div>
    </div>
  );
};

export default ForgotPassword;
