import { createSlice } from "@reduxjs/toolkit";
import {
  addItem,
  deleteItem,
  getAll,
  updateItem,
} from "../actions/shoppingCartAction";
import { addItemByWish } from "../actions/WishAction";


const initialState = {
  loading: false,
  statusCode: 0,
  response: null,
  errors: null,
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: initialState,
  extraReducers: (builder) => {
    // Get ShoppingCart //

    builder.addCase(getAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAll.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.response = payload.response;
    });
    builder.addCase(getAll.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.errors = payload.errors;
    });

    // End Get ShoppingCart //

    // AddItem to ShoppingCart //

    builder.addCase(addItem.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addItem.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.response = payload.response;

    });
    builder.addCase(addItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.errors = payload.errors;
    });

    // End AddItem to ShoppingCart //

    // updateItem to ShoppingCart //

    builder.addCase(updateItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateItem.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.response = payload.response;
    });
    builder.addCase(updateItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.errors = payload.errors;
    });

    // End updateItem to ShoppingCart //

    // deleteItem ShoppingCart //

    builder.addCase(deleteItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteItem.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.response = payload.response;
    });
    builder.addCase(deleteItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.errors = payload.errors;
    });

    // End deleteItem ShoppingCart //


     // AddItem By Wish to ShoppingCart //

     builder.addCase(addItemByWish.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addItemByWish.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.response = payload.response;

    });

    builder.addCase(addItemByWish.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.errors = payload.errors;
    });

    // End AddItem By Wish to ShoppingCart //

  },
});

export const shoppingCartReducer = shoppingCartSlice.reducer;
