import { createSlice } from "@reduxjs/toolkit";
import { productById } from "../../actions/productAction";

export const initialState = {
  loading: false,
  statusCode: 0,
  response: null,
};

const productByIdSlice = createSlice({
  name: "productById",
  initialState: initialState,
  reducers:{
    productByIdStatusCode:(state)=> {
      state.statusCode = 0;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(productById.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(productById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.response = payload.response;
    });

    builder.addCase(productById.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.response = payload.response;
    });
  },
});


export const { productByIdStatusCode } = productByIdSlice.actions;

export const productByIdReducer = productByIdSlice.reducer;
