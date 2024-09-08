import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpRequest } from "../../helpers/HttpRequest";
import { Http } from "../../helpers/Http";

export const getAll = createAsyncThunk(
  "shoppingCarts",
  async (ShoppingCartId, ThunkApi) =>
    await HttpRequest(
      `/ShoppingCart?ShoppingCartId=${ShoppingCartId}`,
      Http.GET
    )
);

export const addItem = createAsyncThunk("AddItem", async (params, ThunkApi) => {
  return await HttpRequest(`/ShoppingCart`, Http.POST, params);
});

export const updateItem = createAsyncThunk(
  "UpdateItem",
  async (params, ThunkApi) =>
    await HttpRequest(`/ShoppingCart`, Http.PUT, params)
);

export const deleteItem = createAsyncThunk(
  "DeleteItem",
  async (params, ThunkApi) =>
    await HttpRequest(`/ShoppingCart`, Http.DELETE, params)
);
