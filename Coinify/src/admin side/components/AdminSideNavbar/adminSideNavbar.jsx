// import React from 'react'
import "./adminSideNavbar.css";
import logo from "../../../../assets/LOGO1.png";
import { GrTransaction } from "react-icons/gr";
import { BiSolidDiscount } from "react-icons/bi";
import { SlLogout } from "react-icons/sl";
import { MdHome } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useUser } from "../../../Context/useUser.jsx";

const AdminSideNavbar = () => {
  const { user, setUser } = useUser();

  return (
    <div className="adminSideNavbar">
      <img className="logosidenavbar" src={logo} />
      <div className="interdiv">
        <ul className="ulsidenavbar">
          <Link to={`/adminHomepage/`}>
            <div className="flexflex">
              <li>
                {" "}
                <MdHome className="homelogo" /> Home
              </li>
            </div>
          </Link>
          <div className="gold-line"></div>
          <Link to="/adminUserspage">
            <div className="flexflex">
              <li>
                <RiUserSettingsFill className="userslogo" /> Users{" "}
              </li>
            </div>
          </Link>
          <div className="gold-line"></div>
          <Link to="/adminTransactionspage">
            {" "}
            <div className="flexflex">
              <li>
                <GrTransaction className="transactionlogo" /> transactions{" "}
              </li>
            </div>
          </Link>
          <div className="gold-line"></div>
          <Link to="/adminPromotionspage">
            {" "}
            <div className="flexflex">
              <li>
                <BiSolidDiscount className="promotionlogo" /> Promotions{" "}
              </li>
            </div>
          </Link>
          <div className="gold-line"></div>
          <Link
            onClick={() => {
              localStorage.clear();
            }}
            to="/"
          >
            <div className="flexflex">
              <li>
                <SlLogout className="logoutlogo" /> Log out
              </li>
            </div>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default AdminSideNavbar;
