import { createSlice } from "@reduxjs/toolkit";
import { getAddresses } from "../../actions/userAddressAction";

const inicialState = {
  loading: false,
  statusCode: 0,
  data: null,
};

const userAddressSlice = createSlice({
  name: "getAddresses",
  initialState: inicialState,
  extraReducers: (builder) => {

    builder.addCase(getAddresses.pending, (state) => {
        state.loading = true;
    });

    builder.addCase(getAddresses.fulfilled, (state , {payload}) => {
        state.loading = false;
        state.statusCode = payload.statusCode;
        state.data = payload.data;
    });

    builder.addCase(getAddresses.rejected, (state, {payload}) => {
        state.loading = false;
        state.statusCode = payload.statusCode;
    });
  },
});



export const  userAddressReducer = userAddressSlice.reducer;