import { createSlice } from "@reduxjs/toolkit";
import { getOrderById } from "../../actions/orderAction";

const initialState = {
  loading: false,
  statusCode: 0,
  response: null,
};

const orderByIdSlice = createSlice({
  name: "orderById",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getOrderById.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getOrderById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.response = payload.response;
    });

    builder.addCase(getOrderById.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
    });
  },
});

export const orderByIdReducer = orderByIdSlice.reducer;
