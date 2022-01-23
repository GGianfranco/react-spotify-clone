const initialState = null;

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "play":
      if (!state) return state;
      return { ...state, playing: true };
    case "pause":
      if (!state) return state;
      return { ...state, playing: false };
    case "changeTrack":
      return {
        ...state,
        playing: true,
        index: action.payload.trackIndex,
        shuffledOrder: shuffle(
          Array.from(Array(action.payload.playlistTracks.length).keys())
        ),
        playlist: { ...action.payload, trackIndex: undefined },
        track: action.payload.playlistTracks[action.payload.trackIndex],
      };
    case "changePlaylist":
      return {
        ...state,
        playing: true,
        index: 0,
        shuffledOrder: shuffle(
          Array.from(Array(action.payload.playlistTracks.length).keys())
        ),
        playlist: action.payload,
        track: action.payload.playlistTracks[0],
      };
    case "nextTrack":
      if (!state) return state;
      if (state.index + 1 < state.playlist.playlistTracks.length) {
        return {
          ...state,
          index: state.index + 1,
          track: state.playlist.playlistTracks[state.index + 1],
        };
      } else {
        return {
          ...state,
          index: 0,
          track: state.playlist.playlistTracks[0],
        };
      }
    case "previousTrack":
      if (!state) return state;
      if (state.index - 1 >= 0) {
        return {
          ...state,
          index: state.index - 1,
          track: state.playlist.playlistTracks[state.index - 1],
        };
      } else {
        return {
          ...state,
          index: state.playlist.playlistTracks.length - 1,
          track:
            state.playlist.playlistTracks[
              state.playlist.playlistTracks.length - 1
            ],
        };
      }
    case "nextTrackShuffled":
      if (!state) return state;
      if (state.index + 1 < state.playlist.playlistTracks.length) {
        return {
          ...state,
          index: state.index + 1,
          track:
            state.playlist.playlistTracks[state.shuffledOrder[state.index + 1]],
        };
      } else {
        return {
          ...state,
          index: 0,
          track: state.playlist.playlistTracks[state.shuffledOrder[0]],
        };
      }
    case "previousTrackShuffled":
      if (!state) return state;
      if (state.index - 1 >= 0) {
        return {
          ...state,
          index: state.index - 1,
          track:
            state.playlist.playlistTracks[state.shuffledOrder[state.index - 1]],
        };
      } else {
        return {
          ...state,
          index: state.playlist.playlistTracks.length - 1,
          track:
            state.playlist.playlistTracks[
              state.shuffledOrder[state.playlist.playlistTracks.length - 1]
            ],
        };
      }
    default:
      return initialState;
  }
};

export default reducer;
