import React, { FC } from "react";
import { ItemTypes } from "../popup";
import { useDrag } from "react-dnd";

type SpotifyEmbedProps = {
  id: string;
};

interface DropResult {
  name: string;
}

const SpotifyEmbed: FC<SpotifyEmbedProps> = ({ id }: SpotifyEmbedProps) => {
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
    <iframe
      ref={drag}
      src={"https://open.spotify.com/embed-podcast/episode/" + id}
      width="100%"
      height="232"
      allow="encrypted-media"
    ></iframe>
  );
};

export default SpotifyEmbed;
