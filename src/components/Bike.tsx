import React, { FC } from "react";
import styled from "styled-components";
import { constructedStationType } from "../types/bike";
import { ItemTypes } from "../popup";
import { useDrag } from "react-dnd";

type BikeProps = {
  obj: constructedStationType;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: white;
`;

interface DropResult {
  name: string;
}

const Bike: FC<BikeProps> = ({ obj }: BikeProps) => {
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
      <h4>{obj.name}</h4>
      <div>
        {obj.num_bikes_available} / {obj.capacity}
      </div>
    </Container>
  );
};

export default Bike;
