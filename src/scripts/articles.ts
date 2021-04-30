import { get, ARTICLE_URL } from "../utility/api";
import { AJAXArguments } from "../types/api";

import {
  ArticleResponse,
  ArticleResponseImageType,
  ArticleResponseResultType,
} from "../types/article";

console.log("Articles:");

const getJson = async ({ url }: AJAXArguments): Promise<ArticleResponse> => {
  const response = await get({ url: ARTICLE_URL });
  return (await response.json()) as ArticleResponse;
};

export const getNewestArticles = async (): Promise<
  ArticleResponseResultType[]
> => {
  const json = await getJson({ url: ARTICLE_URL });

  return json.results.slice(0, 5) as ArticleResponseResultType[];
};
