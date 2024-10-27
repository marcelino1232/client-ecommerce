import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  if (localStorage.getItem("token") == null) {
    return null;
  } else {
    return JSON.parse(localStorage.getItem("token"));
  }
};

export const setToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
export const getId = () => {
  let token = getToken();

  if (token == null) {
    return null;
  }

  const { Id } = jwtDecode(token);

  return Id;
};

export const LoginName = () => {
  let token = getToken();

  if (token == null) {
    return null;
  }

  const { Names } = jwtDecode(token);

  return Names;
};

export const getRole = () => {
  let token = getToken();

  if (token == null) {
    return null;
  }

  const { Roles } = jwtDecode(token);

  return Roles;
};
