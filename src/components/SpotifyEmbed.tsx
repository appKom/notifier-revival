import React, { FC, memo, useState } from "react";
import { ItemTypes } from "../popup";
import { useDrag } from "react-dnd";
import { loadFromStorage } from "../utility/storage";

interface DropResult {
  name: string;
}

const SpotifyEmbed: FC = () => {
  const [spoitfyID, setSpotifyID] = useState("");

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

  loadFromStorage("id").then((resp) => setSpotifyID(resp.id));

  return (
    <iframe
      ref={drag}
      src={"https://open.spotify.com/embed-podcast/episode/" + spoitfyID}
      width="100%"
      height="232"
      allow="encrypted-media"
    ></iframe>
  );
};

export default memo(SpotifyEmbed);
