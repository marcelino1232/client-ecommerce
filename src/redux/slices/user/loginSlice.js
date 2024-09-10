import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../actions/userAction";

const initialState = {
  loading: false,
  response: null,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.response = payload;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false;
      state.response = null;
      state.error = payload;
    });
  },
});


export const loginReducer = loginSlice.reducer;