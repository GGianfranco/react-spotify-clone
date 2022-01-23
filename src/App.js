import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth, getPlaylist } from "./firebase";

import Header from "./Header";
import Navigation from "./Navigation";
import Home from "./Home";
import Player from "./Player";
import Search from "./Search";
import Library from "./Library";
import Playlist from "./Playlist";
import LikedSongs from "./LikedSongs";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";

function App() {
  const currentUser = useAuth();
  const dispatch = useDispatch();
  const { changePlaylist, pause } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    (async () => {
      try {
        const playlist = await getPlaylist("37i9dQZF1DWVlLVXKTOAYa");
        changePlaylist({ ...playlist });
        pause();
      } catch {
        alert("App: Error getting playlist.");
      }
    })();
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          {!currentUser && <Route path="/login" exact component={LogIn} />}
          {!currentUser && <Route path="/signup" exact component={SignUp} />}
          <div className="main">
            <Navigation />
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/search" exact component={Search} />
              <Route path="/playlist/:playlistId" component={Playlist} />
              {!!currentUser && (
                <Route path="/collection/playlists" exact component={Library} />
              )}
              {!!currentUser && (
                <Route path="/collection/tracks" exact component={LikedSongs} />
              )}
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
            <Player />
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
