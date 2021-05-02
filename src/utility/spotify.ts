const config = require("../../config.json");
const base64 = require("base-64");
import { SPOTIFY_AUTH_URL, get, SPOTIFY_SHOW_URL } from "./api";
import { spotifyTokenResponseType, spotifyResponseType } from "../types/api";
import { saveToStorage, loadFromStorage } from "./storage";
const fetchSpotifyToken = (): Promise<Response> => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  return fetch(SPOTIFY_AUTH_URL, {
    method: "POST",
    body: params,
    headers: {
      Authorization: `Basic ${loadSpotifyToken()}`,
    },
  });
};

const loadSpotifyToken = () => {
  const clientID = config.CLIENT_ID;
  const clientSecret = config.CLIENT_SECRET;

  const keyString = clientID + ":" + clientSecret;
  const encoded = base64.encode(keyString);
  return encoded;
};

export const saveToken = async (): Promise<void> => {
  const response = await fetchSpotifyToken();
  const { access_token } = (await response.json()) as spotifyTokenResponseType;
  const key = "token";

  await saveToStorage(key, access_token);
};

export const loadToken = async () => {
  const response = await loadFromStorage("token");
  return response.token;
};

export const fetchEpisodes = async (): Promise<Response> => {
  const showID = "1rFKVS6PmKmRz25s8C35x1";
  return get({
    url: SPOTIFY_SHOW_URL(showID),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${await loadToken()}`,
    },
  });
};

export const getLatestEpisodeID = async (): Promise<string> => {
  await saveToken();
  const response = await fetchEpisodes();
  const json = (await response.json()) as spotifyResponseType;
  return json.items[0].id;
};
