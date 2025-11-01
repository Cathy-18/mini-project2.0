import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    theme: themeReducer,
  },
});

export default store;
