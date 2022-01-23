export const play = () => {
  return (dispatch) => {
    dispatch({
      type: "play",
    });
  };
};

export const pause = () => {
  return (dispatch) => {
    dispatch({
      type: "pause",
    });
  };
};

export const nextTrack = () => {
  return (dispatch) => {
    dispatch({
      type: "nextTrack",
    });
  };
};

export const previousTrack = () => {
  return (dispatch) => {
    dispatch({
      type: "previousTrack",
    });
  };
};

export const nextTrackShuffled = () => {
  return (dispatch) => {
    dispatch({
      type: "nextTrackShuffled",
    });
  };
};

export const previousTrackShuffled = () => {
  return (dispatch) => {
    dispatch({
      type: "previousTrackShuffled",
    });
  };
};

export const changeTrack = (playlistWithTrackIndex) => {
  return (dispatch) => {
    dispatch({
      payload: playlistWithTrackIndex,
      type: "changeTrack",
    });
  };
};

export const changePlaylist = (playlist) => {
  return (dispatch) => {
    dispatch({
      payload: playlist,
      type: "changePlaylist",
    });
  };
};

export const openLogInModal = () => {
  return (dispatch) => {
    dispatch({
      type: "openLogInModal",
    });
  };
};

export const closeLogInModal = () => {
  return (dispatch) => {
    dispatch({
      type: "closeLogInModal",
    });
  };
};
