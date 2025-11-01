import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === form.email);

    if (exists) {
      setError("Email already registered.");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created! You can sign in now.");
    navigate("/signin");
  };

  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="btn">Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}
