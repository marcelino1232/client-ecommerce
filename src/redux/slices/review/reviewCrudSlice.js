import { createSlice } from "@reduxjs/toolkit";
import {
  addToReview,
  removeReview,
  updateReview,
} from "../../actions/reviewAction";

const inicialState = {
  loading: false,
  statusCode: 0,
  success: null,
  message: "",
  update: false,
};

const reviewCrudSlice = createSlice({
  name: "reviewCrud",
  initialState: inicialState,
  extraReducers: (builder) => {
    builder.addCase(addToReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToReview.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.success = payload.success;
      state.message = payload.message;
      state.update = !state.update;
    });
    builder.addCase(addToReview.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
    });

    builder.addCase(updateReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateReview.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.success = payload.success;
      state.message = payload.message;
      state.update = !state.update;
    });
    builder.addCase(updateReview.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
    });

    builder.addCase(removeReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeReview.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.success = payload.success;
      state.message = payload.message;
      state.update = !state.update;
    });
    builder.addCase(removeReview.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
    });
  },
});

export const reviewCrudReducer = reviewCrudSlice.reducer;
