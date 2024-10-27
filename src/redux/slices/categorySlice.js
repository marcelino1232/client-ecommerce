import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../actions/categoryAction";

export const initialState = {
  loadingCategory: false,
  statusCode:0,
  data: []
};

const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(categories.pending, (state) => {
      state.loadingCategory = true;
    });

    builder.addCase(categories.fulfilled, (state, { payload }) => {
      state.loadingCategory = false;
      state.statusCode = payload.statusCode;
      state.data = payload.data;
    });

    builder.addCase(categories.rejected, (state, { payload }) => {
      state.loadingCategory = false;
      state.statusCode = payload.statusCode;
      state.errors = payload.errors;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
