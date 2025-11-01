import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function ProductPage() {
  const { id } = useParams();
  const product = useSelector((s) =>
    s.products.list.find((p) => p.id === id)
  );
  const dispatch = useDispatch();

  if (!product) return <h2>Product not found</h2>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", borderRadius: 10 }}
      />
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>${product.price.toFixed(2)}</h3>
        <button className="btn" onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
