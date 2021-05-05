import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Article from "./components/Article";
import SpotifyEmbed from "./components/SpotifyEmbed";
import { loadFromStorage } from "./utility/storage";
import Bike from "./components/Bike";
import Event from "./components/Event";
const Container = styled.div`
  width: 400px;
`;

const Popup: FC = () => {
  const [articleElement, setArticleElement] = useState<JSX.Element>();
  const [bikeElement, setBikeElement] = useState<JSX.Element>();
  const [eventElement, setEventElement] = useState<JSX.Element>();
  const [spoitfyID, setSpotifyID] = useState("");

  loadFromStorage("id").then((resp) => setSpotifyID(() => resp.id));

  if (articleElement == undefined) {
    loadFromStorage("article").then((resp) => {
      const article = JSON.parse(resp.article);

      setArticleElement(() => (
        <Article
          url={article.absolute_url}
          header={article.heading}
          imageURL={article.image.thumb}
        />
      ));
    });
  }

  if (bikeElement == undefined) {
    loadFromStorage("station").then((resp) => {
      const station = JSON.parse(resp.station);
      setBikeElement(() => <Bike obj={station} />);
    });
  }

  if (eventElement == undefined) {
    loadFromStorage("event").then((resp) => {
      const event = JSON.parse(resp.event);
      setEventElement(() => <Event obj={event} />);
    });
  }

  //<SpotifyEmbed id={spoitfyID} />

  return (
    <Container>
      <Header />
      <h2>Siste artikkel fra OW4</h2>
      {articleElement}
      <h2>Bysykkel:</h2>
      {bikeElement}
      <h2>Event:</h2>
      {eventElement}
    </Container>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
