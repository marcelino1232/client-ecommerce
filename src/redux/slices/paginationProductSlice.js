import { createSlice } from "@reduxjs/toolkit";
import { paginationProduct } from "../actions/productAction";

const initialState = {
  pageIndex: 0,
  pageSize: 2,
  pageCount: 0,
  totalCount: 0,
  loading: false,
  products: [],
  error: null,
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
      state.pageIndex = payload.pageIndex;
      state.pageSize = payload.pageSize;
      state.pageCount = payload.pageCount;
      state.products = payload.products;
      state.totalCount = payload.totalCount;
    });

    builder.addCase(paginationProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.products = [];
      state.error = payload;
    });
  },
});


export  const  paginationProductReducer = paginationProductSlice.reducer;