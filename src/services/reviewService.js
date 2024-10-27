import { Http } from "../helpers/Http";
import { HttpRequest } from "../helpers/HttpRequest";

export const getReview = async () => await HttpRequest("/Review", Http.GET);

export const getReviewByProductId = async (ProductId) =>
  await HttpRequest(`/Review/${ProductId}`, Http.GET);

export const reviewPagination = async (params) =>
  await HttpRequest(
    `/Review/Pagination?Search=${params.Search}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`,
    Http.GET
  );

export const addToReview = async (params) =>
  await HttpRequest("/Review", Http.POST, params);

export const updateReview = async (params) =>
  await HttpRequest("/Review", Http.PUT, params);

export const removeReview = async (reviewId) =>
  await HttpRequest(`/Review?reviewId=${reviewId}`, Http.DELETE);

export const adminReview = async (params) =>
  await HttpRequest(
    `/Review/ReviewList?Search=${params.Search}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`,
    Http.GET
  );
