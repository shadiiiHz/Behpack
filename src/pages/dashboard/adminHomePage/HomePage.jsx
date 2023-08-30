import React from "react";
import "./homePage.css";
import AdminSidebar from "../../../components/dashboard/adminSidebar/AdminSidebar";
import Topbar from "../../../components/dashboard/topbar/Topbar";
import image from "../../../images/contact.png"
const AdminHomePage = () => {
  return (
    <>
      <Topbar />
      <div className="dashboard">
        <AdminSidebar />
       <div className="dashboardInfo">
        <div className="dashboardInfoTitle">
          Welcome to admin pannel
        </div>
         <div className="dashboardInfoImage"><img src={image} alt="dashboard" /></div>
       </div>
       
      </div>
    </>
  );
};

export default AdminHomePage;
