const config = require("../../config.json");
const base64 = require("base-64");
import { SPOTIFY_AUTH_URL, get, SPOTIFY_SHOW_URL } from "./api";
import { spotifyTokenResponseType } from "../types/api";

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

type localStorageType = {
  token: string;
};

export const saveToken = async (): Promise<void> => {
  const response = await fetchSpotifyToken();
  const { access_token } = (await response.json()) as spotifyTokenResponseType;
  const key = "token";

  return new Promise((resolve) => {
    chrome.storage.sync.set({ token: access_token }, () => resolve());
  });
};

export const loadToken = (): Promise<Response> => {
  return new Promise((resolve, reject) => {
    return chrome.storage.sync.get(["token"], (result) => {
      if (result.token != undefined) {
        resolve(result.token);
      } else {
        reject();
      }
    });
  });
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

export const getLatestEpisodes = async (): Promise<any> => {
  await saveToken();
  const response = await fetchEpisodes();
  return await response.json();
};
