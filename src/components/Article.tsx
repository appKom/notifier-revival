import React, { FC } from "react";
import styled from "styled-components";
import { ONLINE_BASE } from "../utility/api";

type ArticleProps = {
  url: string;
  header: string;
  imageURL: string;
};

const Article: FC<ArticleProps> = ({ url, header, imageURL }: ArticleProps) => {
  return (
    <Container>
      <img
        src={ONLINE_BASE + imageURL}
        alt="Article Image"
        width="200px"
        height="200px"
      />
    </Container>
  );
};

export default Article;

const Container = styled.div``;
