import { createSlice } from "@reduxjs/toolkit";
import {
  addItem,
  deleteItem,
  getAll,
  updateItem,
} from "../actions/shoppingCartAction";

const initialState = {
  loading: false,
  error: null,
  shoppingCart: {
    shoppingCartId: "",
    items: [],
    count: 0,
    subTotal: 0,
    tax: 0,
    shopping: 0,
    total: 0,
  },
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
      state.shoppingCart = payload;
    });
    builder.addCase(getAll.rejected, (state, { payload }) => {
      state.loading = false;
      state.shoppingCart = null;
      state.error = payload;
    });

    // End Get ShoppingCart //

    // AddItem to ShoppingCart //

    builder.addCase(addItem.pending, (state) => {
      state.loading = true;
    });
    
    builder.addCase(addItem.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.shoppingCart = payload;
    });
    builder.addCase(addItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.shoppingCart = null;
      state.error = payload;
    });

    // End AddItem to ShoppingCart //

    // updateItem to ShoppingCart //

    builder.addCase(updateItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateItem.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.shoppingCart = payload;
    });
    builder.addCase(updateItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.shoppingCart = null;
      state.error = payload;
    });

    // End updateItem to ShoppingCart //

    // deleteItem ShoppingCart //

    builder.addCase(deleteItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteItem.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.shoppingCart = payload;
    });
    builder.addCase(deleteItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.shoppingCart = null;
      state.error = payload;
    });

    // End deleteItem ShoppingCart //
  },
});

export const shoppingCartReducer = shoppingCartSlice.reducer;
