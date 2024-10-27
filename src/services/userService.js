import { Http } from "../helpers/Http";
import { HttpRequest } from "../helpers/HttpRequest";

export const register = async (params) =>
  await HttpRequest("/Auth/Register", Http.POST, params);

export const registerConfirm = async (email, token) =>
  HttpRequest(`/Auth/RegisterConfirm?email=${email}&token=${token}`, Http.POST);

export const login = async (params) =>
  await HttpRequest("/Auth/Login", Http.POST, params);

export const signOut = async () => await HttpRequest("/Auth/SignOut", Http.GET);

export const forgotPassword = async (emailAddress) =>
  await HttpRequest(
    `/Auth/ForgetPassword?emailAddress=${emailAddress}`,
    Http.POST
  );

export const forgetPasswordConfirm = async (token, params) =>
  await HttpRequest(
    `/Auth/ForgetPasswordConfirm?token=${token}`,
    Http.POST,
    params
  );

export const adminUser = async (params) =>
  await HttpRequest(
    `/User?Search=${params.Search}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`,
    Http.GET
  );

export const userReview = async (userId) =>
  await HttpRequest(`/User/Review?userId=${userId}`, Http.GET);

export const userLock = async (userId) =>
  await HttpRequest(`/User?userId=${userId}`, Http.PUT);
