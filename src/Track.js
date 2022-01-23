import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getPlaylist, likeTrack, useAuth, useTrackLiked } from "./firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";

function polishDateAdded(date) {
  const currentDate = new Date();

  // To calculate the time difference of two dates
  var differenceInTime = currentDate.getTime() - date.getTime();

  // To calculate the no. of days between two dates
  var differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  // If the difference in days is more than 31 days, use a different date format.
  if (differenceInDays > 31) {
    return date.toLocaleString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return `${differenceInDays} days ago`;
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function Track({ playlistId, trackIndex, track }) {
  const [playlistInPlayer, setPlaylistInPlayer] = useState(false);
  const [trackInPlayer, setTrackInPlayer] = useState(false);
  const currentUser = useAuth();
  const trackLiked = useTrackLiked(currentUser?.uid, track.trackId);
  const playerState = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const { play, pause, changeTrack } = bindActionCreators(
    actionCreators,
    dispatch
  );

  async function handleGetPlaylist() {
    let playlist;
    try {
      playlist = await getPlaylist(playlistId);
    } catch {
      alert("Error logging getting playlist.");
    }
    return playlist;
  }

  async function handleLikeTrack() {
    try {
      await likeTrack(currentUser.uid, track);
    } catch {
      alert("Error liking track.");
    }
  }

  async function handlePlayTrack() {
    if (playlistInPlayer && track.trackId === playerState.track.trackId) {
      play();
    } else {
      const playlist = await handleGetPlaylist();
      changeTrack({ ...playlist, trackIndex: Number(trackIndex) - 1 });
    }
  }

  useEffect(() => {
    if (playerState) {
      setPlaylistInPlayer(playerState.playlist.playlistId === playlistId);
      setTrackInPlayer(playerState.track.trackId === track.trackId);
    }
  }, [playerState]);

  return (
    <div class="track">
      <div class="index">
        {playlistInPlayer && trackInPlayer && playerState.playing ? (
          <PauseIcon className="pauseButton" onClick={() => pause()} />
        ) : (
          <React.Fragment>
            <span className="trackNumber">{trackIndex}</span>
            <PlayArrowIcon className="playButton" onClick={handlePlayTrack} />
          </React.Fragment>
        )}
      </div>
      <div className="cover">
        <img src={track.trackImageUrl} alt="" />
        <div class="title">
          <span className="name">{track.trackName}</span>
          <span className="artists">{track.trackArtists.join(", ")}</span>
        </div>
      </div>

      <div class="album">
        <span>{track.trackAlbumName}</span>
      </div>
      <div class="dateAdded">
        <span>
          {polishDateAdded(new Date(track.trackAddedAt.split("T")[0]))}
        </span>
      </div>
      <div class="duration">
        {trackLiked ? (
          <FavoriteIcon
            fontSize="small"
            className="likeButton"
            onClick={handleLikeTrack}
          />
        ) : (
          <FavoriteBorderIcon
            fontSize="small"
            className="likeButton"
            onClick={
              currentUser
                ? handleLikeTrack
                : () =>
                    alert("Please log in to save tracks in your liked songs.")
            }
          />
        )}
        <span>{millisToMinutesAndSeconds(track.trackDuration)}</span>
      </div>
    </div>
  );
}

export default Track;
