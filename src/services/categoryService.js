import { Http } from "../helpers/Http";
import { HttpRequest } from "../helpers/HttpRequest";

export const categories = async () => await HttpRequest("/Category", Http.GET);

