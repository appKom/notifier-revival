import { get, ARTICLE_URL, SPOTIFY_AUTH_URL } from "./api";
import { AJAXArguments } from "../types/api";

import { ArticleResponse, ArticleResponseResultType } from "../types/article";

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
