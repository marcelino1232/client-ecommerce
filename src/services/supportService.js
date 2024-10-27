import { Http } from "../helpers/Http";

import { HttpRequest } from "../helpers/HttpRequest";

export const supports = async (params) => {
  return await HttpRequest(
    `/Support?Search=${params.Search}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`,
    Http.GET
  );
};

export const supportsAdmin = async (params) => {
  return await HttpRequest(
    `/Support/Data?Search=${params.Search}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`,
    Http.GET
  );
};

export const support = async (orderId, productId) => {
  return await HttpRequest(
    `/Support/Status?OrderId=${orderId}&ProductId=${productId}`,
    Http.GET
  );
};

export const supportCreate = async (params) => {
  return await HttpRequest("/Support", Http.POST, params);
};

export const supportUpdate = async (params) => {
  return await HttpRequest("/Support", Http.PUT, params);
};

export const supportDelete = async (SupportId) => {
  return await HttpRequest(`/Support?SupportId=${SupportId}`, Http.DELETE);
};

export const supportChange = async (SupportId) => {
  return await HttpRequest(`/Support/Change?SupportId=${SupportId}`, Http.PUT);
};
