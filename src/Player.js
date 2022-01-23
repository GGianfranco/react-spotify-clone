import React, { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-h5-audio-player";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";
import { ReactComponent as PictureInPicture } from "./picture-in-picture.svg";
import { ReactComponent as Queue } from "./queue.svg";
import { ReactComponent as Loop } from "./loop.svg";
import { ReactComponent as Microphone } from "./microphone.svg";
import { ReactComponent as Devices } from "./devices.svg";
import { ReactComponent as Shuffle } from "./shuffle.svg";
import { ReactComponent as PreviousTrack } from "./previous-track.svg";
import { ReactComponent as NextTrack } from "./next-track.svg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Slider } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { likeTrack, useAuth, useTrackLiked } from "./firebase";

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function Player() {
  const playerState = useSelector((state) => state.player);
  const currentUser = useAuth();
  const trackLiked = useTrackLiked(
    currentUser?.uid,
    playerState?.track.trackId
  );
  const dispatch = useDispatch();
  const {
    play,
    pause,
    nextTrack,
    previousTrack,
    nextTrackShuffled,
    previousTrackShuffled,
  } = bindActionCreators(actionCreators, dispatch);

  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [muted, setMuted] = useState(false);

  const handlePlay = () => {
    audioRef.current.audio.current.play();
  };
  const handlePause = () => {
    audioRef.current.audio.current.pause();
  };

  const handleNextTrack = () => {
    setCurrentTime(0);
    if (shuffle) {
      nextTrackShuffled();
    } else {
      nextTrack();
    }
  };

  const handlePreviousTrack = () => {
    setCurrentTime(0);
    if (shuffle) {
      previousTrackShuffled();
    } else {
      previousTrack();
    }
  };

  const changeDuration = () => {
    setDuration(Math.round(audioRef.current.audio.current.duration * 1000));
  };

  const changeVolume = (_, value) => {
    setMuted(false);
    setVolume(value / 100);
    audioRef.current.audio.current.volume = value / 100;
  };

  const changeCurrentTime = (_, value) => {
    setCurrentTime(value);
    audioRef.current.audio.current.currentTime = Math.round(value / 1000);
  };

  const ended = () => {
    if (loop) {
      setCurrentTime(0);
      play(true);
    } else {
      handleNextTrack();
    }
  };

  useEffect(() => {
    if (playerState) {
      playerState.playing ? handlePlay() : handlePause();
    }
  }, [playerState]);

  async function handleLikeTrack() {
    try {
      await likeTrack(currentUser.uid, playerState.track);
    } catch {
      alert("Error liking track.");
    }
  }

  return (
    playerState && (
      <div className="player">
        <ReactAudioPlayer
          ref={audioRef}
          onListen={() =>
            setCurrentTime(
              Math.round(audioRef?.current?.audio?.current?.currentTime) * 1000
            )
          }
          onEnded={ended}
          src={playerState.track.trackPreviewUrl}
          onCanPlay={changeDuration}
          style={{ display: "none" }}
        />
        <div className="playerInfo">
          <div>
            <div className="title">{playerState.track.trackName}</div>
            <div className="caption">
              {playerState.track.trackArtists.join(", ")}
            </div>
          </div>
          <div className="playerButton">
            {trackLiked ? (
              <FavoriteIcon fontSize="16px" onClick={handleLikeTrack} />
            ) : (
              <FavoriteBorderIcon
                fontSize="16px"
                onClick={
                  currentUser
                    ? handleLikeTrack
                    : () =>
                        alert(
                          "Please log in to save tracks in your liked songs."
                        )
                }
              />
            )}
          </div>
          <div className="playerButton">
            <PictureInPicture />
          </div>
        </div>
        <div className="playerControls1">
          <div className="playbackControls">
            <div className="shuffle" onClick={() => setShuffle(!shuffle)}>
              <Shuffle
                className={
                  shuffle
                    ? "playbackControlsActive"
                    : "playbackControlsInactive"
                }
              />
            </div>
            <div className="previousTrack" onClick={handlePreviousTrack}>
              <PreviousTrack className="playbackControlsInactive" />
            </div>
            <div className="playAndPause">
              {playerState.playing ? (
                <PauseCircleIcon onClick={() => pause()} />
              ) : (
                <PlayCircleIcon onClick={() => play()} />
              )}
            </div>
            <div className="nextTrack" onClick={handleNextTrack}>
              <NextTrack className="playbackControlsInactive" />
            </div>
            <div className="loop" onClick={() => setLoop(!loop)}>
              <Loop
                className={
                  loop ? "playbackControlsActive" : "playbackControlsInactive"
                }
              />
            </div>
          </div>
          <div className="playbackBar">
            <span className="caption">
              {millisToMinutesAndSeconds(currentTime)}
            </span>
            <Slider
              size="small"
              value={currentTime}
              max={duration}
              aria-label="Small"
              onChange={changeCurrentTime}
              style={{
                width: "100%",
                minWidth: "198px",
                height: "4px",
                color: "var(--secondary-font-color)",
              }}
            />
            <span className="caption">
              {millisToMinutesAndSeconds(duration)}
            </span>
          </div>
        </div>
        <div className="playerControls2">
          <div className="playerButton">
            <Microphone />
          </div>
          <div className="playerButton">
            <Queue />
          </div>
          <div className="playerButton">
            <Devices />
          </div>
          <div className="playerButton">
            {volume > 0.5 && !muted && (
              <VolumeUpIcon fontSize="16px" onClick={() => setMuted(true)} />
            )}
            {volume <= 0.5 && volume > 0 && !muted && (
              <VolumeDownIcon fontSize="16px" onClick={() => setMuted(true)} />
            )}
            {volume === 0 && !muted && (
              <VolumeMuteIcon fontSize="16px" onClick={() => setMuted(true)} />
            )}
            {muted && (
              <VolumeOffIcon fontSize="16px" onClick={() => setMuted(false)} />
            )}
          </div>
          <Slider
            size="small"
            value={muted ? 0 : volume * 100}
            aria-label="Small"
            onChange={changeVolume}
            style={{
              width: "93px",
              height: "4px",
              color: "var(--secondary-font-color)",
            }}
          />
        </div>
      </div>
    )
  );
}

export default Player;
