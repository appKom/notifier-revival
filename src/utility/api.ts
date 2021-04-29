import { AJAXArguments } from "../types/api";
export const get = ({ url, body, headers }: AJAXArguments): Promise<Response> =>
  fetch(url, {
    method: "GET",
    body: JSON.stringify(body),
    headers: headers,
  });

export const API_BASE = "https://online.ntnu.no/api/v1";
export const ONLINE_BASE = "https://online.ntnu.no";
export const ARTICLE_URL = API_BASE + "/articles/";
