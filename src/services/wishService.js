import { Http } from "../helpers/Http";
import { HttpRequest } from "../helpers/HttpRequest";

export const wishes = async () => await HttpRequest("/Wish", Http.GET);

export const wishById = async (ProductId) =>
  await HttpRequest(`/Wish/WishStatus?ProductId=${ProductId}`, Http.GET);

export const wishPagination = async (params) =>
  await HttpRequest(
    `/Wish/Pagination?Search=${params.Search}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`,
    Http.GET
  );

export const addToWish = async (params) =>
  await HttpRequest(`/Wish`, Http.POST, params);

export const addItemByWish = async (params) => {
  return await HttpRequest(
    `/Wish/AddItem?ListWishId=${params.ListWishId}`,
    Http.POST,
    params
  );
};

export const removeWish = async (ListWishId) =>
  await HttpRequest(`/Wish?ListWishId=${ListWishId}`, Http.DELETE);

export const adminWish = async (params) =>
  await HttpRequest(
    `/Wish/ListWish?Search=${params.Search}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`,
    Http.GET
  );
