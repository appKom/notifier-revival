import { AJAXArguments } from "../types/api";

export const API_BASE = "https://online.ntnu.no/api/v1";
export const ONLINE_BASE = "https://online.ntnu.no";
export const ARTICLE_URL = API_BASE + "/articles/";
export const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/api/token";
export const SPOTIFY_API_BASE = "https://api.spotify.com/v1/";
export const SPOTIFY_SHOW_URL = (id: string) =>
  SPOTIFY_API_BASE + `shows/${id}/episodes?market=NO&limit=10&offset0`;
export const EVENT_URL = API_BASE + "/events/";

export const get = ({ url, body, headers }: AJAXArguments): Promise<Response> =>
  fetch(url, {
    method: "GET",
    body: JSON.stringify(body),
    headers: headers,
  });

export const post = ({
  url,
  body,
  headers,
}: AJAXArguments): Promise<Response> =>
  fetch(url, {
    method: "POST",
    body: typeof body === "string" ? body : JSON.stringify(body),
    headers,
  });
