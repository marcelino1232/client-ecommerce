import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpRequest } from "../../helpers/HttpRequest";
import { Http } from "../../helpers/Http";

export const getOrders = createAsyncThunk(
  "getOrders",
  async (ThunkApi) => await HttpRequest("/Order", Http.GET)
);

export const getOrderById = createAsyncThunk(
  "getOrderById",
  async (OrderId, ThunkApi) =>
    await HttpRequest(`/Order/getById?OrderId=${OrderId}`, Http.GET)
);
