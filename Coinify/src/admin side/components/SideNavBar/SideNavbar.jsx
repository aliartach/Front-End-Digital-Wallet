import React, { useState } from "react";
import "./SideNavbar.css";
import logo from "../../../../assets/LOGO1.png";
import { GrTransaction } from "react-icons/gr";
import { BiSolidDiscount } from "react-icons/bi";
import { SlLogout } from "react-icons/sl";
import { MdHome } from "react-icons/md";
import { useUser } from "../../../Context/useUser";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";



const SideNavbar = () => {
  const { socket, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Separate component for closed state content
const ClosedSidebar = () => (

  <div className="closed-sidenavbar">
    <div className="interdivClosed">
      <ul className="ulsidenavbar">
        <Link to="/userhomepage">
          {" "}
          <div className="flexflex">
            <li>
              {" "}
              <MdHome className="homelogo" />
            </li>
          </div>
        </Link>
        <div className="gold-line-closed"></div>
        <Link to="/UserTranstionPage">
          {" "}
          <div className="flexflex">
            <li>
              <GrTransaction className="transactionlogo" />
            </li>
          </div>
        </Link>
        <div className="gold-line-closed"></div>
        <Link to="/UserPromotionPage">
          {" "}
          <div className="flexflex">
            <li>
              <BiSolidDiscount className="promotionlogo" />
            </li>
          </div>
        </Link>
        <div className="gold-line-closed"></div>
        <Link
          to="/"
          onClick={() => {
            localStorage.clear();
            socket?.emit("delUser");
          }}
        >
          <div className="flexflex">
            <li>
              <SlLogout className="logoutlogo" />
            </li>
          </div>
        </Link>
      </ul>
    </div>
  </div>
);


  return (
    <div className={`adminsidenavbar ${isOpen ? "open" : ""}`}>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      {isOpen ? (
        <>
          <img className="logosidenavbar" src={logo} alt="Logo" />
          <div className="interdiv">
            <ul className="ulsidenavbar">
              <Link to="/userhomepage">
                {" "}
                <div className="flexflex">
                  <li>
                    {" "}
                    <MdHome className="homelogo" /> Home
                  </li>
                </div>
              </Link>
              <div className="gold-line"></div>
              <Link to="/UserTranstionPage">
                {" "}
                <div className="flexflex">
                  <li>
                    <GrTransaction className="transactionlogo" /> transaction{" "}
                  </li>
                </div>
              </Link>
              <div className="gold-line"></div>
              <Link to="/UserPromotionPage">
                <div className="flexflex">
                  <li>
                    <BiSolidDiscount className="promotionlogo" /> Promotions{" "}
                  </li>
                </div>
              </Link>
              <div className="gold-line"></div>

              <Link
                to="/"
                onClick={() => {
                  localStorage.clear();
                  socket?.emit("delUser");
                }}
              >
                <div className="flexflex">
                  <li>
                    <SlLogout className="logoutlogo" /> Log out
                  </li>
                </div>
              </Link>
            </ul>
          </div>
        </>
      ) : (
        <ClosedSidebar />
      )}
    </div>
  );
};

export default SideNavbar;
