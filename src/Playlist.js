import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAuth,
  getPlaylist,
  usePlaylistLiked,
  likePlaylist,
} from "./firebase";
import TracksTable from "./TracksTable";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";

function Playlist() {
  const playerState = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const { play, pause, changePlaylist } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const { playlistId } = useParams();
  const currentUser = useAuth();
  const playlistLiked = usePlaylistLiked(currentUser?.uid, playlistId);
  const [playlist, setPlaylist] = useState(null);
  const [playlistInPlayer, setPlaylistInPlayer] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const playlist = await getPlaylist(playlistId);
        setPlaylist(playlist);
      } catch (e) {
        alert("Error getting playlist.", e);
      }
    })();
  }, []);

  useEffect(() => {
    if (playerState) {
      setPlaylistInPlayer(playerState.playlist.playlistId === playlistId);
    }
  }, [playerState]);

  async function handleLikePlaylist() {
    try {
      await likePlaylist(currentUser.uid, playlist);
    } catch {
      alert("Error liking playlist.");
    }
  }

  const handlePlayPlaylist = () => {
    if (playlist && playlistInPlayer) {
      play();
    } else {
      changePlaylist(playlist);
    }
  };

  return (
    playlist &&
    playerState && (
      <div className="playlist">
        <div className="playlistBanner">
          <div className="cover">
            <img src={playlist.playlistImageUrl} alt="" />
          </div>
          <div className="information">
            <span className="type">PLAYLIST</span>
            <span className="title">{playlist.playlistName}</span>
            <div className="details">
              <span>{playlist.playlistOwner}</span>
              <span>{playlist.playlistTracks?.length} songs</span>
            </div>
          </div>
        </div>
        <div className="playlistControls">
          {playlistInPlayer && playerState.playing ? (
            <PauseCircleIcon className="playAndPause" onClick={() => pause()} />
          ) : (
            <PlayCircleIcon
              className="playAndPause"
              onClick={handlePlayPlaylist}
            />
          )}
          {playlistLiked ? (
            <FavoriteIcon className="likeButton" onClick={handleLikePlaylist} />
          ) : (
            <FavoriteBorderIcon
              className="likeButton"
              onClick={
                currentUser
                  ? handleLikePlaylist
                  : () =>
                      alert(
                        "Please login to save your liked playlists in Your Library."
                      )
              }
            />
          )}

          <MoreHorizIcon className="moreButton" />
        </div>
        {/* {playlist.playlistTracks && ( */}
        <TracksTable playlistId={playlistId} tracks={playlist.playlistTracks} />
        {/* )} */}
      </div>
    )
  );
}

export default Playlist;
