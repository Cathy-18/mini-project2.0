import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProduct } from "../redux/productSlice";

export default function Admin() {
  const products = useSelector((s) => s.products.list);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  function handleAdd(e) {
    e.preventDefault();
    if (!form.name || !form.price) return;
    dispatch(addProduct({ ...form, price: Number(form.price) }));
    setForm({ name: "", price: "", category: "", image: "", description: "" });
  }

  return (
    <div>
      <h2>Admin — Manage Products</h2>
      <form
        onSubmit={handleAdd}
        style={{ display: "grid", gap: 8, maxWidth: 400, marginBottom: 20 }}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className="btn" type="submit">
          Add Product
        </button>
      </form>

      <div style={{ display: "grid", gap: 10 }}>
        {products.map((p) => (
          <div
            key={p.id}
            className="card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{p.name}</strong> - ${p.price}
            </div>
            <button
              className="btn"
              style={{ background: "#f33" }}
              onClick={() => dispatch(deleteProduct(p.id))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
