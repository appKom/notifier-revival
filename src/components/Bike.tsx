import React, { FC, memo, useState } from "react";
import styled from "styled-components";
import { constructedStationType } from "../types/bike";
import { ItemTypes } from "../popup";
import { useDrag } from "react-dnd";
import { loadFromStorage } from "../utility/storage";

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: white;
`;

interface DropResult {
  name: string;
}

type bikeInfoType = {
  num_bikes_available: number;
  capacity: number;
  name: string;
};

const Bike: FC = () => {
  const [bikeInfo, setBikeInfo] = useState<bikeInfoType>();

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

  loadFromStorage("station").then((resp) => {
    const station = JSON.parse(resp.station) as constructedStationType;
    setBikeInfo({
      name: station.name,
      capacity: station.capacity,
      num_bikes_available: station.num_bikes_available,
    });
  });

  if (bikeInfo == undefined) return <div>Loading...</div>;
  return (
    <Container ref={drag}>
      <h4>{bikeInfo.name}</h4>
      <div>
        {bikeInfo.num_bikes_available} / {bikeInfo.capacity}
      </div>
    </Container>
  );
};

export default memo(Bike);
