import React from "react";
import "./homepageSidebar.css";
import img from "../../images/hero.png";
import { Link } from "react-router-dom";
const HomepageSidbar = () => {
  return (
    <div className="homeSidebar">
      <div className="sidebarItem">
        <span className="homeSidebarTitle">ABOUT US</span>
        <img src={img} alt="about" />
        <p>
          <strong>BehPack Saz Ltd</strong>. Founded in 1999, started its journey
          focusing on designing and manufacturing shrink wrapping machines
          exclusively. 
        </p>
      </div>
      <div className="sidebarItem">
        <span className="homeSidebarTitle">Let's Keep in Touch</span>
        <Link className="mail" to="mailto:info@behpack.com">
          info@behpack.com
        </Link>
      </div>
    </div>
  );
};

export default HomepageSidbar;
