import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";

function Navbar() {
  const [userId, setUserId] = useState(localStorage.getItem("id") || null);
  const navigate = useNavigate();

  // Function to check localStorage and update state
  const updateUser = () => {
    setUserId(localStorage.getItem("id"));
  };

  useEffect(() => {
    updateUser(); // Initial check

    // Listener for storage changes (cross-tab support)
    const handleStorageChange = () => updateUser();
    
    // Listener for our custom event (same-tab updates)
    const handleCustomEvent = () => updateUser();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userUpdated", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userUpdated", handleCustomEvent);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");

    // Trigger the custom event to update UI
    window.dispatchEvent(new Event("userUpdated"));

    navigate("/login");
  };

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo1.png" alt="Logo" />
          <span>KD Estate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Price</Link>
      </div>
      <div className="right">
        {userId ? (
          <>
            <span className="userId">User ID: {userId}</span>
            <button className="logout" onClick={handleLogout}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/signup" className="register">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
