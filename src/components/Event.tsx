import React, { FC } from "react";
import styled from "styled-components";
import { ONLINE_BASE } from "../utility/api";
import { eventResultType } from "../types/event";
import { ItemTypes } from "../popup";
import { useDrag } from "react-dnd";
type EventProps = {
  obj: eventResultType;
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

const Event: FC<EventProps> = ({ obj }: EventProps) => {
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
      <a target="_blank" href={ONLINE_BASE + obj.absolute_url}>
        <img
          src={ONLINE_BASE + obj.image.thumb}
          alt="Article Image"
          width="100%"
          height="100%"
        />
      </a>

      <ImageText>{obj.title}</ImageText>
    </Container>
  );
};

export default Event;
