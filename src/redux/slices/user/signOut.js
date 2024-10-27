
import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "../../actions/userAction";

const initialState = {
  loading: false,
  response: null,
  error: null,
};

const signOutSlice = createSlice({
  name: "signOut",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOut.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signOut.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.response = payload;
    });
    builder.addCase(signOut.rejected, (state, { payload }) => {
      state.loading = false;
      state.response = null;
      state.error = payload;
    });
  },
});


export const signOutReducer = signOutSlice.reducer;