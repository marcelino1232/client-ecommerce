import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpRequest } from "../../helpers/HttpRequest";
import { Http } from "../../helpers/Http";

export const getReview = createAsyncThunk(
  "getReviews",
  async (ThunkApi) => await HttpRequest("/Review", Http.GET)
);

export const getReviewByProductId = createAsyncThunk(
  "getByProductId",
  async (ProductId, ThunkApi) =>
    await HttpRequest(`/Review/${ProductId}`, Http.GET)
);

export const addToReview = createAsyncThunk(
  "addToReview",
  async (params, ThunkApi) => await HttpRequest("/Review", Http.POST, params)
);

export const updateReview = createAsyncThunk(
  "updateReviews",
  async (params, ThunkApi) => await HttpRequest("/Review", Http.PUT, params)
);

export const removeReview = createAsyncThunk(
  "removeReview",
  async (reviewId, ThunkApi) =>
    await HttpRequest(`/Review?reviewId=${reviewId}`, Http.DELETE)
);
