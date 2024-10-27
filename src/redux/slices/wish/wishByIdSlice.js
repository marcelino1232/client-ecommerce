import { createSlice } from "@reduxjs/toolkit";
import { addToWish, getWishById, removeWish } from "../../actions/WishAction";

export const initialState = {
  loading: false,
  wish: null,
  update: false,
};

const wishByIdSlice = createSlice({
  name: "wishByIdSlice",
  initialState: initialState,
  reducers: {
    onloadingWish: (state) => {
      state.update = !state.update;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToWish.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addToWish.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.wish = payload.wish;
    });

    builder.addCase(addToWish.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getWishById.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getWishById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.wish = payload.wish;
    });

    builder.addCase(getWishById.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(removeWish.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(removeWish.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.wish = payload.wish;
      state.update = !payload.update;
    });

    builder.addCase(removeWish.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { onloadingWish } = wishByIdSlice.actions;

export const wishByIdReducer = wishByIdSlice.reducer;
