import React from 'react'
import "./homepageSidebar.css"
import img from "../../images/hero.png"
import { Link } from 'react-router-dom';
const HomepageSidbar = () => {
    return (
        <div className="homeSidebar">
          <div className="sidebarItem">
            <span className="homeSidebarTitle">ABOUT US</span>
            <img src={img} alt="about" />
            <p>
              Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
              amet ex esse.Sunt eu ut nostrud id quis proident.
            </p>
          </div>
          <div className="sidebarItem">
            <span className="homeSidebarTitle">Let's Keep in Touch</span>
            <Link className="mail" to="Info@Behpack.ir">Info@Behpack.ir</Link>
          </div>
        </div>
      );
}

export default HomepageSidbar