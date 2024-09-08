import { Http } from "./Http";

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

export const HttpRequest = async (
  url,
  type = Http.GET,
  body = null,
  contentType = null
) => {
  const token = getToken();

  let option = {
    method: type,
    headers: {
      Accept: contentType == null ? "application/json" : contentType,
      "Content-Type": contentType == null ? "application/json" : contentType,
      Authorization: token == null ? "" : `${token}`,
    },
  };

  if (body != null) {
    option = { ...option, ["body"]: JSON.stringify(body) };
  }
  try {
    const request = await fetch(
      `${import.meta.env.VITE_Back_Domain}${url}`,
      option
    );
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
