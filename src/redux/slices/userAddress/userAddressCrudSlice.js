import { createSlice } from "@reduxjs/toolkit";
import {
  becomeDefault,
  createAddress,
  removeAddress,
  updateAddress,
} from "../../actions/userAddressAction";

const inicialState = {
  loadingcrudcrud: false,
  statusCode: 0,
  success: false,
  message: "",
  update: false,
};

const userAddressCrudSlice = createSlice({
  name: "userAddressCrud",
  initialState: inicialState,

  extraReducers: (builder) => {
    // start become default Address //

    builder.addCase(becomeDefault.pending, (state) => {
      state.loadingcrud = true;
    });

    builder.addCase(becomeDefault.fulfilled, (state, { payload }) => {
      state.loadingcrud = false;
      state.statusCode = payload.statusCode;
      state.success = payload.success;
      state.message = payload.message;
      state.update = !state.update;
    });

    builder.addCase(becomeDefault.rejected, (state, { payload }) => {
      state.loadingcrud = false;
      state.statusCode = payload.statusCode;
    });

    // end become default Address //

    // start create Address //

    builder.addCase(createAddress.pending, (state) => {
      state.loadingcrud = true;
    });
    builder.addCase(createAddress.fulfilled, (state, { payload }) => {
      state.loadingcrud = false;
      state.statusCode = payload.statusCode;
      state.success = payload.success;
      state.message = payload.message;
      state.update = !state.update;
    });
    builder.addCase(createAddress.rejected, (state, { payload }) => {
      state.loadingcrud = false;
      state.statusCode = payload.statusCode;
    });

    // end create address //

    // start update Address //

    builder.addCase(updateAddress.pending, (state) => {
      state.loadingcrud = true;
    });
    builder.addCase(updateAddress.fulfilled, (state, { payload }) => {
      state.loadingcrud = false;
      state.statusCode = payload.statusCode;
      state.success = payload.success;
      state.message = payload.message;
      state.update = !state.update;
    });
    builder.addCase(updateAddress.rejected, (state, { payload }) => {
      state.loadingcrud = false;
      state.statusCode = payload.statusCode;
    });

    // end update address //

    // start remove Address //

    builder.addCase(removeAddress.pending, (state) => {
      state.loadingcrud = true;
    });
    builder.addCase(removeAddress.fulfilled, (state, { payload }) => {
      state.loadingcrud = false;
      state.statusCode = payload.statusCode;
      state.success = payload.success;
      state.message = payload.message;
      state.update = !state.update;
    });
    builder.addCase(removeAddress.rejected, (state, { payload }) => {
      state.loadingcrud = false;
      state.statusCode = payload.statusCode;
    });

    // end remove address //
  },
});

export const userAddressCrudReducer = userAddressCrudSlice.reducer;
