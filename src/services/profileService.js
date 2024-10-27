import { Http } from "../helpers/Http";
import { HttpRequest } from "../helpers/HttpRequest";

export const profileById = async () => HttpRequest("/Profile", Http.GET);
export const updateProfile = async (params) =>
  HttpRequest("/Profile", Http.PUT, params);
export const updatePassword = async (params) =>
  HttpRequest("/Profile/ChangePassword", Http.PUT, params);
