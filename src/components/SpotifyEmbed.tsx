import React, { FC } from "react";

type SpotifyEmbedProps = {
  id: string;
};

const SpotifyEmbed: FC<SpotifyEmbedProps> = ({ id }: SpotifyEmbedProps) => {
  return (
    <iframe
      src={"https://open.spotify.com/embed-podcast/episode/" + id}
      width="100%"
      height="232"
      allow="encrypted-media"
    ></iframe>
  );
};

export default SpotifyEmbed;
