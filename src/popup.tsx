import React, { FC, useState, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Article from "./components/Article";
import { loadFromStorage } from "./utility/storage";
import Bike from "./components/Bike";
import Event from "./components/Event";
import WidgetContainer from "./components/WidgetContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Container = styled.div`
  width: 400px;
`;
const SpotifyEmbed = lazy(() => import("./components/SpotifyEmbed"));

export const ItemTypes = {
  ARTICLE: "article",
};

const Popup: FC = () => {
  const [articleElement, setArticleElement] = useState<JSX.Element>();
  const [bikeElement, setBikeElement] = useState<JSX.Element>();
  const [eventElement, setEventElement] = useState<JSX.Element>();
  const [spoitfyID, setSpotifyID] = useState("");

  if (spoitfyID == "") {
    loadFromStorage("id").then((resp) => setSpotifyID(() => resp.id));
  }

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

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Header />

        <WidgetContainer child={articleElement} />
        <WidgetContainer child={bikeElement} />

        <WidgetContainer child={eventElement} />
        <WidgetContainer
          child={
            <Suspense fallback={<div>Loading...</div>}>
              <SpotifyEmbed id={spoitfyID} />
            </Suspense>
          }
        />
      </Container>
    </DndProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
