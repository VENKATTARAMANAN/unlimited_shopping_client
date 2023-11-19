import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/pizzaSlice";
import getcartslice from "./Slices/getcartslice";
import { categorySlice } from "./Slices/categoryslice";

export default configureStore({
  reducer: {
    cartArr: cartSlice,
    getCartArr: getcartslice,
    categoryArr:categorySlice,
  },
});
