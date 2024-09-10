import { createSlice } from "@reduxjs/toolkit";
import { register } from "../../actions/userAction";

const initialState = {
  loading: false,
  response: null,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.response = payload;
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.loading = false;
      state.response = null;
      state.error = payload;
    });
  },
});

export const registerReducer = registerSlice.reducer;
