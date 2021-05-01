import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Article from "./components/Article";
import { getNewestArticle } from "./scripts/articles";

const Container = styled.div`
  width: 400px;
`;

const Popup = () => {
  const [articleElement, setArticleElements] = useState<JSX.Element[]>([]);

  getNewestArticle().then((articles) => {
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
    <Container>
      <Header />
      <h4>Siste artikkel fra OW4</h4>
      {articleElement}
    </Container>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
