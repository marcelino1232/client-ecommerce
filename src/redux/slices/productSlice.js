import { createSlice } from "@reduxjs/toolkit";
import { products } from "../actions/productAction";

export const inicialState = {
  loading: false,
  results: [],
};

const productSlice = createSlice({
  name: "products",
  initialState: inicialState,
  extraReducers: (builder) => {
    builder.addCase(products.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(products.fulfilled, (state, actions) => {
      state.loading = false;
      state.results = actions.payload;
    });
    builder.addCase(products.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const productReducer = productSlice.reducer;
