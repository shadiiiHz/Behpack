import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import logo from "../../images/Logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const admin = useSelector((state) => state.admin.isAdmin);
  let isAdmin = admin;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logoutUser() {
    dispatch(logout());
    navigate("/");
  }
  return (
    <div className="top">
      <div className="topLeft">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              About us
            </Link>
          </li>

          <li className="topListItem">
            <Link className="link" to="/news">
              News
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/products">
              Products
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/contact">
              Contact us
            </Link>
          </li>
          {isAdmin && (
            <>
              <li className="topListItem">
                <Link className="link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="topListItem">
                <Link
                  className="link homeLogOutBtn"
                  to="/"
                  onClick={logoutUser}
                >
                  Log out
                </Link>
              </li>
            </>
          )}
          {/* {user && <li className="topListItem">LOGOUT</li>} */}
        </ul>
      </div>
      <div className="topRight">
        <FacebookIcon className="topIcon" />
        <TwitterIcon className="topIcon" />
        <LinkedInIcon className="topIcon" />
        <EmailIcon className="topIcon" />
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
                  to="/"
                  onClick={() => setToggleMenu(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  to="/about"
                  onClick={() => setToggleMenu(false)}
                >
                  About us
                </Link>
              </li>

              <li>
                <Link
                  className="link"
                  to="/news"
                  onClick={() => setToggleMenu(false)}
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  to="/products"
                  onClick={() => setToggleMenu(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  to="/contact"
                  onClick={() => setToggleMenu(false)}
                >
                  Contact us
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link
                    className="link"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {isAdmin && (
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
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
