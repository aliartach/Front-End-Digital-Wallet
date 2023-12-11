import React, { useState, useEffect } from "react";
import "./userpromotionpage.css";
import axios from "axios";
import Sidenavbar from "../../../../admin side/components/SideNavBar/SideNavbar";
import Userheader from "../../../components/home/userheader/userHeader";

const userpromotionpage = () => {
  return (
    <div className="userpromotionpage">
      <Sidenavbar />
      <div className="userrightside">
        <Userheader />
        <div className="userpromotion"></div>
      </div>
    </div>
  );
};

export default userpromotionpage;
