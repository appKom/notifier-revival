export type AJAXArguments = {
  url: string;
  body?: Record<string, unknown> | string;
  headers?: HeadersInit;
};

export type spotifyTokenResponseType = {
  access_token: string;
};

export type spotifyResponseType = {
  items: { id: string }[];
};
