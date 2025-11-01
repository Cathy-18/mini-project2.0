import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import defaultProducts from "../data/products";

const saved = localStorage.getItem("products");

const initialState = {
  list: saved ? JSON.parse(saved) : defaultProducts,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = { id: uuidv4(), ...action.payload };
      state.list.unshift(newProduct);
      localStorage.setItem("products", JSON.stringify(state.list));
    },
    deleteProduct: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
      localStorage.setItem("products", JSON.stringify(state.list));
    },
  },
});

export const { addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
