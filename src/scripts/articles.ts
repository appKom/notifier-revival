import {
  get,
  ARTICLE_URL,
  SPOTIFY_AUTH_URL,
  authorizeToSpotify,
} from "../utility/api";
import { AJAXArguments } from "../types/api";
const config = require("../../config.json");

import {
  ArticleResponse,
  ArticleResponseImageType,
  ArticleResponseResultType,
} from "../types/article";

authorizeToSpotify({ url: SPOTIFY_AUTH_URL })
  .then((resp) => {
    resp
      .json()
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

const getJson = async ({ url }: AJAXArguments): Promise<ArticleResponse> => {
  const response = await get({ url: ARTICLE_URL });
  return (await response.json()) as ArticleResponse;
};

export const getNewestArticle = async (): Promise<
  ArticleResponseResultType[]
> => {
  const json = await getJson({ url: ARTICLE_URL });

  return json.results.slice(0, 1) as ArticleResponseResultType[];
};
