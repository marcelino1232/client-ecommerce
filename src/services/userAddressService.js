import { Http } from "../helpers/Http";
import { HttpRequest } from "../helpers/HttpRequest";

export const getAddresses = async () =>
  await HttpRequest("/UserAddress", Http.GET);

export const getAddressById = async (userAddressId) =>
  await HttpRequest(
    `/UserAddress/getAddressById?userAddressId=${userAddressId}`,
    Http.GET
  );

export const getDefaultAddress = async () =>
  await HttpRequest("/UserAddress/getDefaultAddress", Http.GET);

export const userAddressPagination = async (params) =>
  await HttpRequest(
    `/UserAddress/Pagination?Search=${params.Search}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`,
    Http.GET
  );

export const createAddress = async (params) =>
  await HttpRequest("/UserAddress", Http.POST, params);

export const updateAddress = async (params) =>
  await HttpRequest("/UserAddress", Http.PUT, params);

export const becomeDefault = async (userAddressId) =>
  await HttpRequest(
    `/UserAddress/BecomeDefault?userAddressId=${userAddressId}`,
    Http.PUT
  );

export const removeAddress = async (userAddressId) =>
  await HttpRequest(`/UserAddress?userAddressId=${userAddressId}`, Http.DELETE);
