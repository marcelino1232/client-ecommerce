import {
  getShoppingCartId,
  setShoppingCartId,
} from "../helpers/GetShoppingCartStore";
import { Http } from "../helpers/Http";
import { HttpRequest } from "../helpers/HttpRequest";

export const shoppingCarts = async () => {
  if (getShoppingCartId() != "00000000-0000-0000-0000-000000000000") {
    return await HttpRequest(
      `/ShoppingCart?ShoppingCartId=${getShoppingCartId()}`
    );
  }
  return null;
};

export const addToShoppingCart = async (params) => {
  var request = await HttpRequest("/ShoppingCart", Http.POST, params);

  if (getShoppingCartId() == "00000000-0000-0000-0000-000000000000") {
    setShoppingCartId(request.response.shoppingCartId);
  }
  return request;
};

export const updateItemShoppingCart = async (params) =>
  await HttpRequest(`/ShoppingCart`, Http.PUT, params);

export const removeItemShoppingCart = async (params) =>
  await HttpRequest(`/ShoppingCart`, Http.DELETE, params);
