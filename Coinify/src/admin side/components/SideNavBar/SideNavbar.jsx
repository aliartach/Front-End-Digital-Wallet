// import React from 'react'
import "./SideNavbar.css";
import logo from "../../../../assets/LOGO1.png";
import { GrTransaction } from "react-icons/gr";
import { BiSolidDiscount } from "react-icons/bi";
import { SlLogout } from "react-icons/sl";
import { MdHome } from "react-icons/md";
import { useUser } from "../../../Context/useUser";

const SideNavbar = () => {
  const { user, setUser } = useUser();
  return (
    <div className="adminsidenavbar">
      <img className="logosidenavbar" src={logo} />
      <div className="interdiv">
        <ul className="ulsidenavbar">
          <div className="flexflex">
            <li>
              {" "}
              <MdHome className="homelogo" /> Home
            </li>
          </div>
          <div className="gold-line"></div>
          <div className="flexflex">
            <li>
              <GrTransaction className="transactionlogo" /> transaction{" "}
            </li>
          </div>
          <div className="gold-line"></div>
          <div className="flexflex">
            <li>
              <BiSolidDiscount className="promotionlogo" /> Promotions{" "}
            </li>
          </div>
          <div className="gold-line"></div>
          <div className="flexflex">
            <li>
              <SlLogout className="logoutlogo" /> Log out
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;
