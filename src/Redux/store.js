import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/pizzaSlice";
import  WishlistSlice  from "./Slices/getWishlist";

export default configureStore({
  reducer: {
    cartArr: cartSlice,
    wishlist:WishlistSlice
  },
});
