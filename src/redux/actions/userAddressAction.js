import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpRequest } from "../../helpers/HttpRequest";
import { Http } from "../../helpers/Http";

export const getAddresses = createAsyncThunk(
  "getAddresses",
  async (ThunkApi) => await HttpRequest("/UserAddress", Http.GET)
);

export const getAddressById = createAsyncThunk(
  "getAddressById",
  async (userAddressId, ThunkApi) =>
    await HttpRequest(
      `/UserAddress/getAddressById?userAddressId=${userAddressId}`,
      Http.GET
    )
);

export const getDefaultAddress = createAsyncThunk(
  "getDefaultAddress",
  async (ThunkApi) =>
    await HttpRequest("/UserAddress/getDefaultAddress", Http.GET)
);

export const createAddress = createAsyncThunk(
  "createAddress",
  async (params, ThunkApi) =>
    await HttpRequest("/UserAddress", Http.POST, params)
);

export const updateAddress = createAsyncThunk(
  "updateAddress",
  async (params, ThunkApi) =>
    await HttpRequest("/UserAddress", Http.PUT, params)
);

export const becomeDefault = createAsyncThunk(
  "becomeDefault",
  async (userAddressId, ThunkApi) =>
    await HttpRequest(
      `/UserAddress/BecomeDefault?userAddressId=${userAddressId}`,
      Http.PUT
    )
);

export const removeAddress = createAsyncThunk(
  "removeAddress",
  async (userAddressId, ThunkApi) =>
    await HttpRequest(
      `/UserAddress?userAddressId=${userAddressId}`,
      Http.DELETE
    )
);
