import React from "react";
import "./footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
        <div className="footerMenu">
        <ul className="list">
          <li className="listItem">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="listItem">
            <Link className="link" to="/about">
              About us
            </Link>
          </li>

          <li className="listItem">
            <Link className="link" to="/news">
              News
            </Link>
          </li>
          <li className="listItem">
            <Link className="link" to="/products">
              Products
            </Link>
          </li>
          <li className="listItem">
            <Link className="link" to="/contact">
              Contact us
            </Link>
          </li>
        </ul>
      </div>
      <div className="text">©2023 Behpack. All rights reserved.</div>
      <div className="social">
        <div className="socialText">Follow us</div>
        <div className="socialIcon">
          <FacebookIcon className="Icon" />
          <TwitterIcon className="Icon" />
          <LinkedInIcon className="Icon" />
          <EmailIcon className="Icon" />
        </div>
      </div>
      
    </div>
  );
};

export default Footer;
