import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQty, removeFromCart, clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

export default function CartPage() {
  const cart = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (cart.length === 0)
    return (
      <div>
        <h2>Your cart is empty</h2>
        <Link to="/">Go to menu</Link>
      </div>
    );

  return (
    <div>
      <h2>Your Cart</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {cart.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{item.name}</strong>
              <div>${item.price.toFixed(2)}</div>
            </div>
            <div>
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) =>
                  dispatch(updateQty({ id: item.id, qty: +e.target.value }))
                }
                style={{ width: 60 }}
              />
              <button
                style={{ marginLeft: 8 }}
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
      <h3 style={{ marginTop: 12 }}>Total: ${total.toFixed(2)}</h3>
      <div style={{ marginTop: 12 }}>
        <Link to="/checkout">
          <button className="btn">Checkout</button>
        </Link>
        <button style={{ marginLeft: 8 }} onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}
