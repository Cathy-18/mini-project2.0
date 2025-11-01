import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";

export default function Header() {
  const theme = useSelector((s) => s.theme.mode);
  const cartItems = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("currentUser");
    if (u) setUser(JSON.parse(u));
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    window.location.reload();
  };

  const cartCount = cartItems.reduce((sum, i) => sum + (i.qty || 0), 0);

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">🍔 Food Order</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/cart">Cart ({cartCount})</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <button onClick={() => dispatch(toggleTheme())} className="theme-toggle">
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </li>
          <li>
            {user ? (
              <>
                <span style={{ fontWeight: "bold" }}>{user.email}</span>
                <button onClick={logout} className="theme-toggle">Logout</button>
              </>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </li>
        </ul>
      </nav>

      <div className="banner">
        <div className="banner-content">
          <h1>Delicious Food, Delivered Fast 🍕</h1>
          <p>Order from your favorite restaurants with just a click!</p>
          <button
            className="banner-btn"
            onClick={() =>
              document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Order Now
          </button>
        </div>
      </div>
    </header>
  );
}
