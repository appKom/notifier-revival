import React, { FC, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Article from "./components/Article";
import SpotifyEmbed from "./components/SpotifyEmbed";
import { saveToStorage, loadFromStorage } from "./utility/storage";

const Container = styled.div`
  width: 400px;
`;

const Popup = () => {
  const [articleElement, setArticleElements] = useState<JSX.Element[]>([]);
  const [spoitfyID, setSpotifyID] = useState("");
  const [spotifyEmbed, setSpotifyEmbed] = useState<JSX.Element>();

  loadFromStorage("id").then((resp) => setSpotifyID(() => resp.id));

  loadFromStorage("article").then((resp) => {
    const articles = JSON.parse(resp.article);
    console.log(articles);
    const articleElements = Object.keys(articles).map((key: string) => (
      <Article
        url={articles[Number(key)].absolute_url}
        header={articles[Number(key)].heading}
        imageURL={articles[Number(key)].image.thumb}
      />
    ));

    setArticleElements(() => articleElements);
  });

  useEffect(() => {
    setSpotifyEmbed(<SpotifyEmbed id={spoitfyID} />);
  });

  return (
    <Container>
      <Header />
      <h4>Siste artikkel fra OW4</h4>
      {articleElement}
      {spotifyEmbed}
    </Container>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
