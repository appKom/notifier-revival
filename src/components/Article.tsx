import React, { FC, memo, useState } from "react";
import styled from "styled-components";
import { ONLINE_BASE } from "../utility/api";
import { ItemTypes } from "../popup";
import { useDrag } from "react-dnd";
import { loadFromStorage } from "../utility/storage";
import { ArticleResponseResultType } from "../types/article";

type ArticleProps = {
  editState: boolean;
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

type imageProps = {
  visible: boolean;
};

const Image = styled.img<imageProps>`
  width: 100%;
  height: 100%;
  opacity: ${(imageProps) => (imageProps.visible ? 0.1 : 1)};
`;

interface DropResult {
  name: string;
}

type articleInfoType = {
  url: string;
  imageURL: string;
  header: string;
};

const Article: FC<ArticleProps> = ({ editState }: ArticleProps) => {
  const [articleInfo, setArticleInfo] = useState<articleInfoType>();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ARTICLE,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        console.log(`You dropped Article into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  loadFromStorage("article").then((resp) => {
    const article = JSON.parse(resp.article) as ArticleResponseResultType;
    setArticleInfo({
      url: article.absolute_url,
      header: article.heading,
      imageURL: article.image.thumb,
    });
  });

  if (articleInfo == undefined) return <div>Loading...</div>;

  return (
    <Container ref={drag}>
      <a target="_blank" href={ONLINE_BASE + articleInfo!.url}>
        <Image
          visible={editState}
          src={ONLINE_BASE + articleInfo!.imageURL}
          alt="Article Image"
        />
      </a>

      <ImageText>{articleInfo!.header}</ImageText>
    </Container>
  );
};

export default memo(Article);
