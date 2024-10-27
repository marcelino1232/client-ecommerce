import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "../../actions/orderAction";

const initialState = {
  loading: false,
  statusCode: 0,
  data: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.data = payload.data;
    });
    builder.addCase(getOrders.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
    });
  },
});


export const orderReducer = orderSlice.reducer;