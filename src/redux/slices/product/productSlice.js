import { createSlice } from "@reduxjs/toolkit";
import { getProductByCategory } from "../../actions/productAction";

export const inicialState = {
  loading: false,
  statusCode:0,
  data: null,
};

const productSlice = createSlice({
  name: "products",
  initialState: inicialState,
  extraReducers: (builder) => {
    builder.addCase(getProductByCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getProductByCategory.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.data = payload.data;
    });
    builder.addCase(getProductByCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
    });
  },
});

export const productReducer = productSlice.reducer;
