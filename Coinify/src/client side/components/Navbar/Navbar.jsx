import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Logo from "../../../assets/LOGO1.png";
import "../Navbar/Navbar.css";

const Navbar = () => {
  const [collapse, setCollapsed] = useState(true);
  const executeScroll = () => {
    const element = document.getElementById("Contact");
    element.scrollIntoView({ behavior: "smooth" });
    const element2 = document.getElementById("About");
    element.scrollIntoView({ behavior: "smooth" });
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  };

  return (
    <header className="header sticky">
      <img src={Logo} alt="" className="Logo" />
      <div className="Navbar">
        <div className="header_Links">
          <Link
          to="/"
            className="N-home"
            // onClick= "scrollToTop"
          >
            <a href="#">Home</a>
          </Link>

          <Link
            className="N-about"
            to="#About"
            name={"aboutus"}
            onClick={executeScroll}
          >
            <a href="#">About</a>
          </Link>
          <Link
            to="#Contact"
            name={"contactUs"}
            onClick={executeScroll}
            className="N-contact"
          >
            {" "}
            ContactUs{" "}
          </Link>
          <Link className="N-Register" to="/">
            <a href="#">Register</a>
          </Link>
        </div>
        <FontAwesomeIcon
          icon={collapse ? faBars : faXmark}
          className="header_icon"
          onClick={() => setCollapsed(!collapse)}
        />
      </div>
      {!collapse ? (
        <nav className="header_mobile_nav">
          <div className="header_mobile_ul">
            <Link className="N-home" to="/">
              Home
            </Link>
            <Link className="N-about" to="/">
              About
            </Link>
            <Link
              to="#Contact"
              name={"contactUs"}
              onClick={executeScroll}
              className="N-contact"
            >
              ContactUs
            </Link>
            <Link className="N-Register" to="/RegisterPage">
              Register
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
};

export default Navbar;
