import { AJAXArguments } from "../types/api";
const config = require("../../config.json");
const base64 = require("base-64");

export const API_BASE = "https://online.ntnu.no/api/v1";
export const ONLINE_BASE = "https://online.ntnu.no";
export const ARTICLE_URL = API_BASE + "/articles/";
export const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/api/token";
export const SPOTIFY_API_BASE = "https://api.spotify.com/v1/";
export const SPOTIFY_SHOW_URL = (id: string) =>
  SPOTIFY_API_BASE + `shows/${id}/episodes`;

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

export const authorizeToSpotify = ({
  url,
}: AJAXArguments): Promise<Response> => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  return fetch(url, {
    method: "POST",
    body: params,
    headers: {
      Authorization: `Basic ${loadSpotifyToken()}`,
    },
  });
};

export const loadSpotifyToken = () => {
  const clientID = config.CLIENT_ID;
  const clientSecret = config.CLIENT_SECRET;

  const keyString = clientID + ":" + clientSecret;
  const encoded = base64.encode(keyString);
  return encoded;
};
