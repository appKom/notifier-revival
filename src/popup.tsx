import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Article from "./components/Article";
import SpotifyEmbed from "./components/SpotifyEmbed";
import { loadFromStorage } from "./utility/storage";

const Container = styled.div`
  width: 400px;
`;

const Popup: FC = () => {
  const [articleElement, setArticleElement] = useState<JSX.Element[]>([]);
  const [bikeElements, setBikeElements] = useState<JSX.Element[]>([]);

  const [spoitfyID, setSpotifyID] = useState("");

  loadFromStorage("id").then((resp) => setSpotifyID(() => resp.id));

  loadFromStorage("article").then((resp) => {
    const articles = JSON.parse(resp.article);
    const elements = Object.keys(articles).map((key: string) => (
      <Article
        url={articles[Number(key)].absolute_url}
        header={articles[Number(key)].heading}
        imageURL={articles[Number(key)].image.thumb}
      />
    ));
    setArticleElement(() => elements);
  });

  loadFromStorage("stations").then((resp) => {
    const stations = JSON.parse(resp.stations);

    const elements = Object.keys(stations).map((key: string) => (
      <div>{stations[Number(key)].name}</div>
    ));

    setBikeElements(() => elements);
  });

  //<SpotifyEmbed id={spoitfyID} />

  return (
    <Container>
      <Header />
      <h4>Siste artikkel fra OW4</h4>
      {articleElement}
      {bikeElements}
    </Container>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
