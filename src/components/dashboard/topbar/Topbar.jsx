import React, { useState } from "react";
import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/userRedux";
const Topbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logoutUser() {
    dispatch(logout());
    navigate("/");
  }
  return (
    <div className="top">
      <div className="topLeft">Behpack</div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              Site
            </Link>
          </li>
          {/* {user && <li className="topListItem">LOGOUT</li>} */}
        </ul>
      </div>
      <div className="topRight">
        <button className="logOutBtn" onClick={logoutUser}>
          Log out
        </button>
      </div>
      <div className="app__navbar-smallscreen">
        <MenuIcon
          className="overlay__open"
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay slide-bottom">
            <HighlightOffIcon
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="app__navbar-smallscreen_links">
              <li>
                <Link
                  className="link"
                  to="/dashboard"
                  onClick={() => setToggleMenu(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  to="/aboutEdit"
                  onClick={() => setToggleMenu(false)}
                >
                  About us
                </Link>
              </li>

              <li>
                <Link
                  className="link"
                  to="/newsTable"
                  onClick={() => setToggleMenu(false)}
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  to="/productsTable"
                  onClick={() => setToggleMenu(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  to="/messages"
                  onClick={() => setToggleMenu(false)}
                >
                  Messages
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  to="/slider"
                  onClick={() => setToggleMenu(false)}
                >
                  Slider
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  to="/"
                  onClick={() => setToggleMenu(false)}
                >
                  Site
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  to="/"
                  onClick={() => {
                    setToggleMenu(false);
                    logoutUser();
                  }}
                >
                  Log out
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
