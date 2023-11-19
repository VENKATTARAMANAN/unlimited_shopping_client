import { createSlice } from "@reduxjs/toolkit";
export const categorySlice = createSlice({
  name: "categoryArr",
  intialState: {
    categorydata:[],
  },
  reducers: {
    CATEGORY_DATA: (state, action) => {
      state.categorydata = [action.payload];
    },
  },
});

export const { CATEGORY_DATA } = categorySlice.actions;
export default categorySlice.reducer;
