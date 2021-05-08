import React, { FC, useState, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Header from "./components/Header";
import Article from "./components/Article";
import Bike from "./components/Bike";
import Event from "./components/Event";
import WidgetContainer from "./components/WidgetContainer";

const SpotifyEmbed = lazy(() => import("./components/SpotifyEmbed"));

const Container = styled.div`
  width: 400px;
`;

export const ItemTypes = {
  ARTICLE: "article",
};

const Popup: FC = () => {
  const [editState, setEditState] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Header />
        <button onClick={() => setEditState(true)}>Edit!</button>
        <WidgetContainer child={<Article editState={editState} />} />
        <WidgetContainer child={<Bike />} />
        <WidgetContainer child={<Event />} />
        <WidgetContainer
          child={
            <Suspense fallback={<div>Loading...</div>}>
              <SpotifyEmbed />
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
