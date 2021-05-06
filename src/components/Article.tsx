import React, { FC } from "react";
import styled from "styled-components";
import { ONLINE_BASE } from "../utility/api";
import { ItemTypes } from "../popup";
import { useDrag } from "react-dnd";

type ArticleProps = {
  url: string;
  header: string;
  imageURL: string;
};

const Container = styled.div`
  position: relative;
  text-align: center;
  color: white;
  width: 100%;
  height: 100%;
`;

const ImageText = styled.div`
  width: 90%%;
  position: absolute;
  top: 8px;
  left: 16px;
`;
interface DropResult {
  name: string;
}
const Article: FC<ArticleProps> = ({ url, header, imageURL }: ArticleProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ARTICLE,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        console.log(`You dropped Ariticle into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Container ref={drag}>
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
