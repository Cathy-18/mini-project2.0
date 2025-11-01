import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

export default function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const cart = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  function handleSubmit(e) {
    e.preventDefault();
    alert(
      `Order placed!\n\nName: ${name}\nAddress: ${address}\nTotal: $${total.toFixed(
        2
      )}`
    );
    dispatch(clearCart());
  }

  return (
    <div>
      <h2>Checkout</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 10, maxWidth: 400 }}
      >
        <label>
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Address:
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <div>Total: ${total.toFixed(2)}</div>
        <button className="btn">Place Order</button>
      </form>
    </div>
  );
}
