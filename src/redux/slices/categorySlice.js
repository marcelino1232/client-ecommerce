import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../actions/categoryAction";

export const initialState = {
  loadingCategory: false,
  results: [],
  error: null,
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
      state.results = payload;
    });

    builder.addCase(categories.rejected, (state, { payload }) => {
      state.loadingCategory = false;
      state.results = [];
      state.error = payload;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
