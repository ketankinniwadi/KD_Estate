import "./signuppage.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    role: "USER", // Default role set to USER
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "USER", // Ensure role is always set
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post("http://localhost:8080/real-estate/api/auth/register", formData);
      console.log("Signup Successful:", response.data);
      navigate("/login"); // Redirect to login after successful signup
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input name="name" type="text" placeholder="Username" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          
          {/* Role Dropdown */}
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="USER">User</option>
            <option value="OWNER">Owner</option>
          </select>

          <button type="submit">Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default SignUpPage;
