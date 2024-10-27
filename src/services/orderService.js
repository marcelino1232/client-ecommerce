import { Http } from "../helpers/Http";
import { HttpRequest } from "../helpers/HttpRequest";

export const getOrders = async () => await HttpRequest("/Order", Http.GET);

export const getOrderById = async (OrderId) =>
  await HttpRequest(`/Order/getById?OrderId=${OrderId}`, Http.GET);

export const orderPagination = async (params) =>
  await HttpRequest(
    `/Order/Pagination?Search=${params.Search}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`,
    Http.GET
  );

export const invoice = async (OrderId) =>
  await HttpRequest(`/Order/Invoice?OrderId=${OrderId}`);

export const orderList = async (params) =>
  await HttpRequest(
    `/Order/OrderList?Search=${params.Search}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`,
    Http.GET
  );
