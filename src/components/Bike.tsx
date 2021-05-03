import React, { FC } from "react";
import styled from "styled-components";
import { constructedStationType } from "../types/bikes";

type BikeProps = {
  obj: constructedStationType;
};

const Container = styled.div`
  width: 75%;
`;

const Bike: FC<BikeProps> = ({ obj }: BikeProps) => {
  return (
    <Container>
      <h4>{obj.name}</h4>
      <div>
        {obj.num_bikes_available} / {obj.capacity}
      </div>
    </Container>
  );
};

export default Bike;
