import { createSlice } from "@reduxjs/toolkit";
import {
  getAddressById,
  getDefaultAddress,
} from "../../actions/userAddressAction";

const inicialState = {
  loading: false,
  statusCode: 0,
  response: null,
};

const userAddressByIdSlice = createSlice({
  name: "userAddressById",
  initialState: inicialState,
  reducers: {
    cleanAddress: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAddressById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAddressById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.response = payload.response;
    });
    builder.addCase(getAddressById.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
    });

    builder.addCase(getDefaultAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDefaultAddress.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.response = payload.response;
    });
    builder.addCase(getDefaultAddress.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
    });
  },
});

export const { cleanAddress } = userAddressByIdSlice.actions;
export const userAddressByIdReducer = userAddressByIdSlice.reducer;
