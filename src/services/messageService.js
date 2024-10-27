import { Http } from "../helpers/Http";
import { HttpRequest } from "../helpers/HttpRequest";

export const messages = async (SupportId) =>
  await HttpRequest(`/SupportMessage?SupportId=${SupportId}`, Http.GET);

export const sendMessage = async (params) =>
  await HttpRequest("/SupportMessage", Http.POST, params);
