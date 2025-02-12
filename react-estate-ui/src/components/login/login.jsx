import "./login.scss";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Logging in with:", formData);


      // Send request with FormData
      const response = await axios.post("http://localhost:8080/real-estate/api/auth/login",formData);

      const { token, role, userId } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("id", userId);
      setTimeout(() => {
        window.location.reload(); // 👈 Ensures UI updates immediately
      }, 100);

      // Redirect based on role
      if (role === "OWNER") {
        navigate("/owner", { replace: true });
      } else {
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleLogin}>
          <h1>Welcome back</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          <Link to="/signup">Don't have an account?</Link>
          <br/>
          <Link to="/forgot-password">Forgot Password?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Background" />
      </div>
    </div>
  );
}

export default LoginPage;
