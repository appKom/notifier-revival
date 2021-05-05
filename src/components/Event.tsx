import React, { FC } from "react";
import styled from "styled-components";
import { ONLINE_BASE } from "../utility/api";
import { eventResultType } from "../types/event";

type EventProps = {
  obj: eventResultType;
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

const Event: FC<EventProps> = ({ obj }: EventProps) => {
  return (
    <Container>
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
