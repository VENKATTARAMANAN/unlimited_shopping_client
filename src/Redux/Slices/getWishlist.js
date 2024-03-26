import { createSlice } from "@reduxjs/toolkit";

export const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    value: [],
  },
  reducers: {
    Add_Wishlist:(state,action)=>{
        state.value =action.payload;
    }
  },
});

export const {Add_Wishlist}=WishlistSlice.actions;

export default WishlistSlice.reducer;