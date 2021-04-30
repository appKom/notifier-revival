export type ArticleResponseImageType = {
  thumb: string;
  description: string;
};

export type ArticleResponseResultType = {
  heading: string;
  authors: string;
  image: ArticleResponseImageType;
  absolute_url: string;
};

export type ArticleResponse = {
  count: number;
  next: string;
  previous: string;
  results: ArticleResponseResultType[];
};
