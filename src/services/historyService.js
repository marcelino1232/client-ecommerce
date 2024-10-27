import { Http } from "../helpers/Http";
import { HttpRequest } from "../helpers/HttpRequest";

export const payments = async (params) => {
  return await HttpRequest(
    `/Payment?Search=${params.Search}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`,
    Http.GET
  );
};
