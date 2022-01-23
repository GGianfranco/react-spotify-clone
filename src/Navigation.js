import React from "react";
import logo from "./spotify.png";
import { ReactComponent as HomeLogo } from "./home.svg";
import { ReactComponent as SearchLogo } from "./search.svg";
import { ReactComponent as YourLibraryLogo } from "./your-library.svg";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth } from "./firebase";

function Navigation() {
  const history = useHistory();
  const currentUser = useAuth();
  const playerState = useSelector((state) => state.player);

  return (
    <div className="navigation">
      <div className="banner">
        <img src={logo} alt="Spotify" />
      </div>
      <ul>
        <Link
          to="/"
          style={{
            color: "var(--secondary-font-color)",
            textDecoration: "none",
          }}
        >
          <li>
            <div className="navButton">
              <div className="navButtonLogo">
                <HomeLogo />
              </div>
              <div className="navButtonLabel">Home</div>
            </div>
          </li>
        </Link>
        <Link
          to="/search"
          style={{
            color: "var(--secondary-font-color)",
            textDecoration: "none",
          }}
        >
          <li>
            <div className="navButton">
              <div className="navButtonLogo">
                <SearchLogo />
              </div>
              <div className="navButtonLabel">Search</div>
            </div>
          </li>
        </Link>
        <li
          onClick={
            currentUser
              ? () => history.push("/collection/playlists")
              : () => alert("Please log in to view your liked playlists.")
          }
        >
          <div className="navButton">
            <div className="navButtonLogo">
              <YourLibraryLogo />
            </div>
            <div className="navButtonLabel">Your Library</div>
          </div>
        </li>
      </ul>
      <ul>
        <li
          onClick={() => alert("Create playlist feature is not available yet.")}
        >
          <div className="navButton">
            <div className="navButtonLogo">
              <YourLibraryLogo />
            </div>
            <div className="navButtonLabel">Create Playlist</div>
          </div>
        </li>
        <li
          onClick={
            currentUser
              ? () => history.push("/collection/tracks")
              : () => alert("Please log in to view your liked songs.")
          }
        >
          <div className="navButton">
            <div className="navButtonLogo">
              <YourLibraryLogo />
            </div>
            <div className="navButtonLabel">Liked Songs</div>
          </div>
        </li>
        <li
          onClick={() => alert("Your Episodes feature is not available yet.")}
        >
          <div className="navButton">
            <div className="navButtonLogo">
              <YourLibraryLogo />
            </div>
            <div className="navButtonLabel">Your Episodes</div>
          </div>
        </li>
      </ul>
      <div className="divider">
        <hr />
      </div>
      <div className="trackCoverImage">
        <img src={playerState?.track?.trackImageUrl} alt="Track Cover" />
      </div>
    </div>
  );
}

export default Navigation;
