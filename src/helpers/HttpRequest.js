import { getToken } from "./GetToken";
import { Http } from "./Http";

export const HttpRequestFile = async (url, type, body) => {
  
  let token = getToken();

  try {
    const request = await fetch(`${import.meta.env.VITE_Back_Domain}${url}`, {
      method: type,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
};


export const HttpRequest = async (
  url,
  type = Http.GET,
  body = null,
  contentType = null
) => {
  let token = getToken();

  let option = {
    method: type,
    headers: {
      Accept: contentType == null ? "application/json" : contentType,
      "Content-Type": contentType == null ? "application/json" : contentType,
      Authorization: token == null ? "" : `Bearer ${token}`,
    },
  };

  if (body != null) {
    option = {
      ...option,
      ["body"]: JSON.stringify(body),
    };
  }

  try {
    const request = await fetch(
      `${import.meta.env.VITE_Back_Domain}${url}`,
      option
    );
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
};
