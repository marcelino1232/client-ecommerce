import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpRequest } from "../../helpers/HttpRequest";
import { Http } from "../../helpers/Http";

export const register = createAsyncThunk(
  "register",
  async (params, ThunkApi) =>
    await HttpRequest("/Auth/Register", Http.POST, params)
);

export const login = createAsyncThunk(
  "login",
  async (params, ThunkApi) =>
    await HttpRequest("/Auth/Login", Http.POST, params)
);

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (params, ThunkApi) =>
    await HttpRequest("/Auth/ForgotPassword", Http.POST, params)
);
