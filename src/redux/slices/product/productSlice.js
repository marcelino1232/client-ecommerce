import { createSlice } from "@reduxjs/toolkit";
import { getProductByCategoryId, products } from "../../actions/productAction";

export const inicialState = {
  loadingCat: false,
  results: null,
};

const productSlice = createSlice({
  name: "products",
  initialState: inicialState,
  extraReducers: (builder) => {
    builder.addCase(products.pending, (state) => {
      state.loadingCat = true;
    });

    builder.addCase(products.fulfilled, (state, actions) => {
      state.loadingCat = false;
      state.results = actions.payload;
    });
    builder.addCase(products.rejected, (state, { payload }) => {
      state.loadingCat = false;
      state.error = payload;
    });
  },
});

export const productReducer = productSlice.reducer;
