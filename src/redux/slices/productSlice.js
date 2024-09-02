import { createSlice } from "@reduxjs/toolkit";
import { products } from "../actions/productAction";

export const inicialState = {
  loading: false,
  min: 0,
  max: 1000,
  count: 0,
  page: 0,
  pageIndex: 0,
  countByPage: 0,
  results: [],
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState: inicialState,
  extraReducers: (builder) => {
    builder.addCase(products.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(products.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(products.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});


export const productReducer = productSlice.reducer;