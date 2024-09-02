import { Http } from "./Http";

export const getToken = () => {
    if(localStorage.getItem("token") == null){
        return null;
    }else{
        return JSON.parse(localStorage.getItem("token"));
    }
}

export const setToken = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
}

export const HttpRequest = async (
  url,
  type = Http.GET,
  body = null,
  contentType = "application/json"
) => {

  const option = {
    method: type,
  };

  const token = getToken();

  if (token != null) {
    option = {
      ...option,
      ["headers"]: {
        "Content-Type": contentType,
        Authorization: "" + token,
      },
    };
  }

  if (body != null) {
    option = { ...option, ["body"]: JSON.stringify(body) };
  }

  return await fetch(url, option);
};
