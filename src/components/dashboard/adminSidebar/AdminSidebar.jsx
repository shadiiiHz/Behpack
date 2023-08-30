import React from "react";
import "./adminSidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import MessageIcon from "@mui/icons-material/Message";
import { Link } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import SlideshowIcon from '@mui/icons-material/Slideshow';
const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/dashboard" className="link">
              <li className="sidebarListItem">
                <HomeIcon className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/productsTable" className="link">
          
              <li className="sidebarListItem">
                <PrecisionManufacturingIcon className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/newsTable" className="link">
         
              <li className="sidebarListItem">
                <NewspaperIcon className="sidebarIcon" />
                News
              </li>
            </Link>
            <Link to="/aboutEdit" className="link">
          
              <li className="sidebarListItem">
                <GroupsIcon className="sidebarIcon" />
                About us
              </li>
            </Link>
            <Link to="/messages" className="link">
              <li className="sidebarListItem">
                <MessageIcon className="sidebarIcon" />
                Messages
              </li>
            </Link>
            <Link to="/slider" className="link">
              <li className="sidebarListItem">
                <SlideshowIcon className="sidebarIcon" />
                Slider
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
