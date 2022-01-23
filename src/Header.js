import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useHistory } from "react-router-dom";
import { useAuth, logOut } from "./firebase";

function Header() {
  const currentUser = useAuth();
  const history = useHistory();

  async function handleLogOut() {
    try {
      await logOut();
    } catch {
      alert("Error logging out.");
    }
    history.push("/");
  }

  return (
    <div className="header">
      <div className="history">
        <div className="back">
          <ArrowBackIosIcon style={{ width: "20px", height: "20px" }} />
        </div>
        <div className="forward">
          <ArrowForwardIosIcon style={{ width: "20px", height: "20px" }} />
        </div>
      </div>
      <div className="account">
        {currentUser ? (
          <div className="logOut" onClick={handleLogOut}>
            <span>LOG OUT</span>
          </div>
        ) : (
          <React.Fragment>
            <div className="signUp" onClick={() => history.push("/signup")}>
              <span>SIGN UP</span>
            </div>
            <div className="logIn" onClick={() => history.push("/login")}>
              <span>LOG IN</span>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Header;
