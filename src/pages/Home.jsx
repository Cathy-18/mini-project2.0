import React, { useState } from "react";
import defaultProducts from "../data/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function Home() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(defaultProducts.map((p) => p.category))];

  const filteredProducts = defaultProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <section id="menu-section">
        <h2>🍽️ Our Menu</h2>

        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        />

        {/* 🏷 Category Filter */}
        <div
          className="category-buttons"
          style={{ marginBottom: "15px", display: "flex", flexWrap: "wrap", gap: "10px" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`filter-btn ${category === cat ? "active" : ""}`}
              style={{
                padding: "8px 15px",
                borderRadius: "20px",
                border: "1px solid gray",
                backgroundColor: category === cat ? "#f97316" : "#eee",
                color: category === cat ? "white" : "black",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🍕 Product Grid */}
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProducts.map((item) => (
            <div key={item.id} className="card">
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: "180px", borderRadius: "8px" }}
              />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>
                <strong>${item.price.toFixed(2)}</strong>
              </p>
              <button
                onClick={() => dispatch(addToCart(item))}
                className="btn"
                style={{
                  backgroundColor: "#f97316",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
