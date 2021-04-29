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

const printArticles = async () => {
  const json = await getJson({ url: ARTICLE_URL });
  console.log(json.results[0].heading);
};
printArticles();
