import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Logo from "../../../assets/LOGO1.png";
import "../Navbar/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [collapse, setCollapsed] = useState(true);
  const executeScroll = () => {
    setTimeout(() => {
      const element = document.getElementById("Contact");
      element.scrollIntoView({ behavior: "smooth" });
      const element2 = document.getElementById("About");
      element2.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="headerNavbar sticky">
      <img
        className="Logo"
        src={Logo}
        alt=""
        onClick={() => {
          navigate("/", { replace: true });
        }}
      />
      <div className="Navbar">
        <div className="header_Links">
          <Link
            to="/"
            className="N-home"
            onClick={() => {
              scrollToTop;
            }}
          >
            <a>Home</a>
          </Link>

          <Link to="/#About" name={"aboutus"} onClick={executeScroll}>
            <a
              onClick={() => {
                navigate("/", { replace: true });
                executeScroll();
              }}
              className="N-about"
            >
              About
            </a>{" "}
          </Link>
          <Link
            to="/#Contact"
            name={"contactUs"}
            onClick={executeScroll}
            className="N-contact"
          >
            <a
              onClick={() => {
                navigate("/", { replace: true });
                executeScroll();
              }}
              className="N-contact"
            >
              ContactUs
            </a>
          </Link>

          <Link className="N-Register" to="/Registerpage">
            <a>Login</a>
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
            <Link
              to="/#About"
              name={"aboutus"}
              onClick={executeScroll}
              className="N-about"
            >
              <a
                onClick={() => {
                  navigate("/", { replace: true });
                  executeScroll();
                }}
                className="N-about"
              >
                About
              </a>
            </Link>
            <Link
              to="/#Contact"
              name={"contactUs"}
              onClick={executeScroll}
              className="N-contact"
            >
              <a
                onClick={() => {
                  navigate("/", { replace: true });
                  executeScroll();
                }}
                className="N-contact"
              >
                ContactUs
              </a>
            </Link>
            <button
              onClick={() => {
                navigate("/Registerpage", {
                  replace: true,
                  state: { givenClass: true },
                });
              }}
              className="Registerbutton"
            >
              Login
            </button>
          </div>
        </nav>
      ) : null}
    </header>
  );
};

export default Navbar;
