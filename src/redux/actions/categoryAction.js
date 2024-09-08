import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpRequest } from "../../helpers/HttpRequest";

export const categories = createAsyncThunk(
  "categories",
  async (thunkApi) => await HttpRequest("/Category")
);

