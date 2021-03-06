import React, { FC } from "react";
import styled from "styled-components";
import { ItemTypes } from "../types/drag";
import { useDrop } from "react-dnd";

type WidgetContainerProps = {
  child: JSX.Element | undefined;
  editState: boolean;
};

const WidgetContainer: FC<WidgetContainerProps> = ({
  child,
  editState,
}: WidgetContainerProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.NORMAL,
    drop: () => ({ name: "WidgetContainer" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver && editState;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop && editState) {
    backgroundColor = "darkkhaki";
  }

  return (
    <Container ref={drop} role={"WidgetContainer"} style={{ backgroundColor }}>
      {child}
    </Container>
  );
};

export default WidgetContainer;

const Container = styled.div`
  width: 80%;
  height: 200px;
  border: 1px solid black;
`;
