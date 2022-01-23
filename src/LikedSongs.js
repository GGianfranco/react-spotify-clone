import React from "react";
import { useAuth, useUserLikedTracks } from "./firebase";

import TracksTable from "./TracksTable";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import NoLikesNotice from "./NoLikesNotice";

function LikedSongs() {
  const currentUser = useAuth();
  const likedTracks = useUserLikedTracks(currentUser?.uid);

  return (
    <div className="playlist">
      <div className="playlistBanner">
        <div className="cover">
          <img
            src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
            alt=""
          />
        </div>
        <div className="information">
          <span className="type">PLAYLIST</span>
          <span className="title">Liked Songs</span>
          <div className="details">
            <span>
              {currentUser?.isAnonymous
                ? "Guest Account"
                : currentUser?.email?.split("@")[0]}
            </span>
            <span>{likedTracks?.length || 0} songs</span>
          </div>
        </div>
      </div>
      <div className="playlistControls">
        <PlayCircleIcon className="playAndPause" />
      </div>
      {likedTracks?.length > 0 ? (
        <TracksTable tracks={likedTracks} />
      ) : (
        <NoLikesNotice songsOrPlaylists="songs" />
      )}
    </div>
  );
}

export default LikedSongs;
