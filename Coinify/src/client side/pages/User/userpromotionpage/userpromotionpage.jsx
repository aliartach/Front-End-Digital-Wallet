import React from "react";
import "./userpromotionpage.css";
import Sidenavbar from "../../../../admin side/components/SideNavBar/SideNavbar";
import Userheader from "../../../components/home/userheader/userHeader";
const userpromotionpage = () => {
  return (
    <div className="UserMerchantPage">
      <Sidenavbar />
      <div className="userpromotionpage"></div>
      <div className="userrightside">
        <Userheader />
  
      </div>
    </div>
  );
};
export default userpromotionpage;







