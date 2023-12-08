import React, { useState } from "react";
import "../MerchantSideNavbar/MerchantSideNavbar.css";
import logo from "../../../../assets/LOGO1.png";
import { GrTransaction } from "react-icons/gr";
import { BiSolidDiscount } from "react-icons/bi";
import { SlLogout } from "react-icons/sl";
import { MdHome } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

// Separate component for closed state content
const ClosedSidebar = () => (
  <div className="closed-sidenavbar">
    <div className="interdivClosed">
      <ul className="ulsidenavbar">
        <Link to="/merchanthomepage">
          {" "}
          <div className="flexflex">
            <li>
              {" "}
              <MdHome className="homelogo" />
            </li>
          </div>
        </Link>
        <div className="gold-line-closed"></div>
        <Link to="/merchantTransactionPage">
          {" "}
          <div className="flexflex">
            <li>
              <GrTransaction className="transactionlogo" />
            </li>
          </div>
        </Link>
        <div className="gold-line-closed"></div>
        <Link to="/MerchantPromotionPage">
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

const MerchantSideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

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
              <Link to="/merchanthomepage">
                {" "}
                <div className="flexflex">
                  <li>
                    {" "}
                    <MdHome className="homelogo" /> Home
                  </li>
                </div>
              </Link>
              <div className="gold-line"></div>
              <Link to="/merchantTransactionPage">
                {" "}
                <div className="flexflex">
                  <li>
                    <GrTransaction className="transactionlogo" /> transaction{" "}
                  </li>
                </div>
              </Link>
              <div className="gold-line"></div>
              <Link to="/MerchantPromotionPage">
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

export default MerchantSideNavbar;
