import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/real-estate/api/forgotpassword/verify",
        {
          email,
          otp,
          password,
        }
      );
      setMessage(response.data);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data || "Invalid OTP or error occurred.");
    }
  };

  return (
    <div className="reset-password">
      <div className="formContainer">
        <form onSubmit={handleVerifyOtp}>
          <h2>Verify OTP & Reset Password</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Verify OTP & Reset Password</button>
          {message && <p className="error-message">{message}</p>}
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Reset Password" />
      </div>
    </div>
  );
};

export default ResetPassword;
