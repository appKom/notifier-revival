import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Counter from "./components/Counter";
const Popup = () => {
  return (
    <div>
      <Header />
      <Counter />
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
