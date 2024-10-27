import { Http } from "../helpers/Http";
import { HttpRequest, HttpRequestFile } from "../helpers/HttpRequest";

export const productOnLoading = async (params) => {
  if (params == null) {
    return await HttpRequest(`/Product/ProductPagination`);
  } else {
    return await HttpRequest(
      `/Product/ProductPagination?${
        params.Search == "" ? "" : `Search=${params.Search}&`
      }Min=${params.Min}&Max=${params.Max}${
        params.CategoryId == "" ? "" : `&CategoryId=${params.CategoryId}`
      }&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`
    );
  }
};

export const productById = async (productId) =>
  await HttpRequest(`/Product/${productId}`, Http.GET);

export const productCategory = async (productId) =>
  await HttpRequest(
    `/Product/getProductByCategory?ProductId=${productId}`,
    Http.GET
  );

export const adminPagination = async (params) =>
  await HttpRequest(
    `/Product/ProductList?Search=${params.Search}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`,
    Http.GET
  );

export const createProduct = async (params) => {
  return await HttpRequestFile("/Product", Http.POST, params);
};

export const updateProduct = async (params) => {
  return await HttpRequest("/Product", Http.PUT, params);
};

export const getProductAdmin = async (ProductId) => {
  return await HttpRequest(
    `/Product/GetByIdAdmin?ProductId=${ProductId}`,
    Http.GET
  );
};

export const uploadingImage = async (params) => {
  return await HttpRequestFile("/Product/UploadImage", Http.PUT, params);
};

export const productWithReview = async (ProductId) =>
  await HttpRequest(
    `/Product/ProductWithReview?ProductId=${ProductId}`,
    Http.GET
  );

export const OldImage = async (ProductId) =>
  await HttpRequest(`/Product/OldImage?ProductId=${ProductId}`, Http.GET);
