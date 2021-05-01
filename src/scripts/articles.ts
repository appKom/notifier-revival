import { get, ARTICLE_URL, SPOTIFY_AUTH_URL } from "../utility/api";
import { getLatestEpisodes } from "../utility/spotify";
import { AJAXArguments } from "../types/api";

import {
  ArticleResponse,
  ArticleResponseImageType,
  ArticleResponseResultType,
} from "../types/article";

getLatestEpisodes().then((resp) => console.log(resp));
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
