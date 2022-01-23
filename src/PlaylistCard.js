import React from "react";
import { useHistory } from "react-router-dom";

function PlaylistCard({
  playlistId,
  playlistCover,
  playlistTitle,
  playlistDescription,
}) {
  const history = useHistory();

  return (
    <div
      className="playlistCard"
      onClick={() => history.push(`/playlist/${playlistId}`)}
    >
      <div className="playlistCover">
        <img src={playlistCover} alt="" />
      </div>
      <div className="playlistInfo">
        <div className="playlistTitle">{playlistTitle}</div>
        <div className="playlistDescription">{playlistDescription}</div>
      </div>
    </div>
  );
}

export default PlaylistCard;
