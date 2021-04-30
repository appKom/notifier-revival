import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Counter from "./components/Counter";
import Article from "./components/Article";
import { getNewestArticles } from "./scripts/articles";

const Popup = () => {
  const [articleElement, setArticleElements] = useState<JSX.Element[]>([]);

  getNewestArticles().then((articles) => {
    const articleElements = Object.keys(articles).map((key: string) => (
      <Article
        url={articles[Number(key)].absolute_url}
        header={articles[Number(key)].heading}
        imageURL={articles[Number(key)].image.thumb}
      />
    ));

    setArticleElements(() => articleElements);
  });

  return (
    <div>
      <Header />
      <Counter />
      {articleElement}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);

const Container = styled.div``;
