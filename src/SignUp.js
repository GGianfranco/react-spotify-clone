import React, { useRef, useState } from "react";
import logo from "./spotify-black.png";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { signUp } from "./firebase";

function SignUp() {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);
    try {
      await signUp(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      alert("Error signing up.");
    }
    setLoading(false);
  }

  return (
    <div className="signUp">
      <div className="signUpHeader">
        <div className="signUpLogo">
          <img src={logo} alt="Spotify" />
        </div>
      </div>
      <div className="signUpContent">
        <div className="signUpToContinue">
          <span>Sign up with your email address</span>
        </div>

        <form className="signUpForm">
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
            onClick={handleSignUp}
          >
            SIGN UP
          </Button>
        </form>
        <div className="divider">
          <hr />
        </div>
        <div className="dontHaveAnAccount">
          <span>Have an account?</span>
          <Button
            variant="outlined"
            color="success"
            fullWidth
            disabled={loading}
            onClick={() => history.push("/login")}
          >
            LOG IN
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
