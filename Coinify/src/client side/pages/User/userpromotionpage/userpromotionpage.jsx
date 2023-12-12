import React from "react";
import "./userpromotionpage.css";
import Sidenavbar from "../../../../admin side/components/SideNavBar/SideNavbar";
import Userheader from "../../../components/home/userheader/userHeader";
import MerchantTable from "../../../components/MerchantTabel/MerchantTabel";
const userpromotionpage = () => {
  return (
    <div className="UserMerchantPage">
      <Sidenavbar />
      <div className="userpromotionpage"></div>
      <div className="userrightside">
        <Userheader />
        <MerchantTable />
      </div>
    </div>
  );
};
export default userpromotionpage;







