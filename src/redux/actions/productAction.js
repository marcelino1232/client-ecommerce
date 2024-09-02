import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpRequest } from "../../helpers/HttpRequest";

export const products = createAsyncThunk(
  "products",
  async (ThunkApi) => await HttpRequest("cliehdsjkdsj")
);

export const ProductById = createAsyncThunk(
    "ProductById",
    async(ProductId,ThunkApi) => await HttpRequest(`/Product/${ProductId}`)
)
