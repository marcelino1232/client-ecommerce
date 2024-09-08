import { createSlice } from "@reduxjs/toolkit";
import { productById } from "../../actions/productAction";

export const initialState = {
  loading: false,
  error: null,
  productId: 0,
  name: "car",
  brand: "toyota",
  description: "like new ",
  salesPrice: 0,
  categoryId: 0,
  images: [],
  reviews: [],
  results:[]
};

const productByIdSlice = createSlice({
  name: "productById",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(productById.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(productById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.productId = payload.productById;
      state.name = payload.name;
      state.brand = payload.brand;
      state.description = payload.description;
      state.salesPrice = payload.salesPrice;
      state.categoryId = payload.categoryId;
      state.images = payload.images;
      state.reviews = payload.reviews;
      state.results = payload.results;
    });

    builder.addCase(productById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const productByIdReducer = productByIdSlice.reducer;
