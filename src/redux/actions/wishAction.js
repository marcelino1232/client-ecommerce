import { Http } from "../../helpers/Http";
import { HttpRequest } from "../../helpers/HttpRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getWishes = createAsyncThunk(
  "getWishes",
  async (ThunkApi) => await HttpRequest("/Wish", Http.GET)
);

export const getWishById = createAsyncThunk(
  "getWishById",
  async (ProductId, ThunkApi) =>
    await HttpRequest(`/Wish/WishStatus?ProductId=${ProductId}`, Http.GET)
);

export const addToWish = createAsyncThunk(
  "addToWish",
  async (params, ThunkApi) => await HttpRequest("/Wish", Http.POST, params)
);

export const addItemByWish = createAsyncThunk(
  "addItemByWish",
  async (params, ThunkApi) => {
    return await HttpRequest(
      `/Wish/AddItem?ListWishId=${params.ListWishId}`,
      Http.POST,
      params
    );
  }
);

export const removeWish = createAsyncThunk(
  "removeWish",
  async (ListWishId, ThunkApi) =>
    await HttpRequest(`/Wish?ListWishId=${ListWishId}`, Http.DELETE)
);
