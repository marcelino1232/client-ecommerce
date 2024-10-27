import { createSlice } from "@reduxjs/toolkit";
import { paginationProduct } from "../../actions/productAction";

const initialState = {
  loading: false,
  statusCode: 0,
  response:null
};

const paginationProductSlice = createSlice({
  name: "paginationProduct",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(paginationProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(paginationProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.response = payload.response;
    });

    builder.addCase(paginationProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.response = payload.response;
    });
  },
});

export const paginationProductReducer = paginationProductSlice.reducer;
