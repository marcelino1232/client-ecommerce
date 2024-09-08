export const getShoppingCartId = () => {
  let shoppingCartId = JSON.parse(localStorage.getItem("shoppingCartId"));

  if (shoppingCartId == null || shoppingCartId == "") {
    return "00000000-0000-0000-0000-000000000000";
  }

  return shoppingCartId;
};

export const setShoppingCartId = (shoppingCartId) => {
  localStorage.setItem("shoppingCartId", JSON.stringify(shoppingCartId));
};
