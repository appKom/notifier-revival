export type ArticleResponseImageType = {
  thumb: string;
  description: string;
};

export type ArticleResponseResultType = {
  heading: string;
  authors: string;
  image: ArticleResponseImageType;
};

export type ArticleResponse = {
  count: number;
  next: string;
  previous: string;
  results: ArticleResponseResultType[];
};
