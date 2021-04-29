import React, { FC } from "react";
import styled from "styled-components";

const Header: FC = () => {
  return (
    <Container>
      <img
        src={chrome.extension.getURL("images/Online.png")}
        alt="Online logo"
      />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 250px;

  img {
    width: 70%;
  }
`;
