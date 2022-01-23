import React, { useRef, useState } from "react";
import logo from "./spotify-black.png";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

import { logIn, logInAsGuest } from "./firebase";

function LogIn() {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);

  async function handleLoginAsGuest() {
    setLoading(true);
    try {
      await logInAsGuest();
      history.push("/");
    } catch {
      alert("Error logging in as guest.");
    }
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await logIn(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      alert("Error logging in.");
    }
    setLoading(false);
  }

  return (
    <div className="logIn">
      <div className="logInHeader">
        <div className="logInLogo">
          <img src={logo} alt="Spotify" />
        </div>
      </div>
      <div className="logInContent">
        <div className="logInToContinue">
          <span>To continue, log in to Spotify.</span>
          <Button
            variant="contained"
            color="info"
            fullWidth
            disabled={loading}
            onClick={handleLoginAsGuest}
          >
            CONTINUE AS GUEST
          </Button>
        </div>
        <div className="divider">
          <span>OR</span>
          <hr />
        </div>
        <form className="logInForm">
          <label>
            Email address
            <input type="text" placeholder="Email address" ref={emailRef} />
          </label>
          <label>
            Password
            <input type="password" placeholder="Password" ref={passwordRef} />
          </label>
          <Button
            variant="contained"
            color="success"
            fullWidth
            disabled={loading}
            onClick={handleLogin}
          >
            LOG IN
          </Button>
        </form>
        <div className="divider">
          <hr />
        </div>
        <div className="dontHaveAnAccount">
          <span>Don't have an account?</span>
          <Button
            variant="outlined"
            color="success"
            fullWidth
            disabled={loading}
            onClick={() => history.push("/signup")}
          >
            SIGN UP FOR SPOTIFY
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
