import { createSlice } from "@reduxjs/toolkit";
import { getReviewByProductId } from "../../actions/reviewAction";

const inicialState = {
  loading: false,
  statusCode: 0,
  response: null,
  update: false,
};

const reviewByProductIdSlice = createSlice({
  name: "reviewByProductId",
  initialState: inicialState,
  reducers: {
    cleanReview: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReviewByProductId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReviewByProductId.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.response = payload.response;
      state.update = !state.update;
    });
    builder.addCase(getReviewByProductId.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
    });
  },
});

export const { cleanReview } = reviewByProductIdSlice.actions;
export const reviewByProductIdReducer = reviewByProductIdSlice.reducer;
