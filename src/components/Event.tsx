import React, { FC, memo, useState } from "react";
import styled from "styled-components";
import { ONLINE_BASE } from "../utility/api";
import { eventResultType } from "../types/event";
import { ItemTypes, DropResult } from "../types/drag";
import { useDrag } from "react-dnd";
import { loadFromStorage } from "../utility/storage";

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

type eventInfoType = {
  absolute_url: string;
  thumb: string;
  title: string;
};

const Event: FC = () => {
  const [eventInfo, setEventInfo] = useState<eventInfoType>();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.NORMAL,
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

  loadFromStorage("event").then((resp) => {
    const event = JSON.parse(resp.event) as eventResultType;
    setEventInfo({
      absolute_url: event.absolute_url,
      thumb: event.image.thumb,
      title: event.title,
    });
  });

  if (eventInfo == undefined) return <div>Loading...</div>;
  return (
    <Container ref={drag}>
      <a target="_blank" href={ONLINE_BASE + eventInfo.absolute_url}>
        <img
          src={ONLINE_BASE + eventInfo.thumb}
          alt="Article Image"
          width="100%"
          height="100%"
        />
      </a>

      <ImageText>{eventInfo.title}</ImageText>
    </Container>
  );
  eventInfo;
};

export default memo(Event);
