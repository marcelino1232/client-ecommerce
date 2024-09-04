import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpRequest } from "../../helpers/HttpRequest";

export const products = createAsyncThunk(
  "products",
  async (ThunkApi) => await HttpRequest("/Product")
);

export const paginationProduct = createAsyncThunk(
  "paginationProduct",
  async (params = null, ThunkApi) => {
    if (params != null) {
      return await HttpRequest(
        `/Product/ProductPagination?${
          params.Search == null ? "" : `Search=${params.Search}&`
        }Min=${params.Min}&Max=${params.Max}${
          params.CategoryId == null ? "" : `&CategoryId=${params.CategoryId}`
        }&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`
      );
    } else {
      return await HttpRequest("/Product/ProductPagination");
    }
  }
);



export const ProductById = createAsyncThunk(
  "ProductById",
  async (ProductId, ThunkApi) => await HttpRequest(`/Product/${ProductId}`)
);
