import { createSlice } from "@reduxjs/toolkit";
import { getReview } from "../../actions/reviewAction";

const inicialState = {
  loading: false,
  statusCode: 0,
  data: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState: inicialState,
  extraReducers: (builder) => {
    builder.addCase(getReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReview.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.data = payload.data;
    });
    builder.addCase(getReview.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
    });
  },
});

export const reviewReducer = reviewSlice.reducer;
