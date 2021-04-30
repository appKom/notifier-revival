import React, { FC } from "react";
import styled from "styled-components";
import { ONLINE_BASE } from "../utility/api";

type ArticleProps = {
  url: string;
  header: string;
  imageURL: string;
};


const Container = styled.div`
  position: relative;
  text-align: center;
  color: white;
  width: 75%;
`;

const ImageText = styled.div`
  width: 90%%;   
  position: absolute;
  top: 8px;
  left: 16px;
`;
  


const Article: FC<ArticleProps> = ({ url, header, imageURL }: ArticleProps) => {



  return (
    <Container>
      <a target="_blank" href={ONLINE_BASE + url}>
      <img
        src={ONLINE_BASE + imageURL}
        alt="Article Image"
        width="100%"
        height="100%"
      />
      </a>
    
      <ImageText>{header}</ImageText>
    </Container>
  );
};

export default Article;

