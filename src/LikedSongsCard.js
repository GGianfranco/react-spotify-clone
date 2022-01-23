import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth, useUserLikedTracks } from "./firebase";

function LikedSongsCard() {
  const history = useHistory();
  const currentUser = useAuth();
  const likedTracks = useUserLikedTracks(currentUser?.uid);

  return (
    <div
      className="likedSongsCard"
      onClick={() => history.push(`/collection/tracks`)}
    >
      <div className="artists"></div>
      <div className="information">
        <span>Liked Songs</span>
        <span>{likedTracks?.length || 0} liked songs</span>
      </div>
    </div>
  );
}

export default LikedSongsCard;
